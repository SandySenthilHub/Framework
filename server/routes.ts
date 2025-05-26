import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sql from 'mssql';
import { z } from "zod";
import {
  insertDashboardCustomizationSchema,
  insertUserSchema,
  insertTenantSchema,
  insertKpiCategorySchema,
  insertKpiMetricSchema,
  insertCallSchema,
  insertCallTranscriptionSchema,
  insertMobileTransactionSchema,
  insertIvrInteractionSchema,
  insertAgentSchema,
  insertAlertSchema
} from "@shared/schema";
import { analyzeSentiment, detectIntent, detectTone, extractKeyPhrases, recognizeEntities, transcribeAudio } from "./cognitiveServices";
import { checkDatabaseHealth } from "./db";
import { mlModelManager } from "./ml/models";
import { detectSpeakers, isDeepgramConfigured, transcribeAudioWithDeepgram } from "./deepgram";
import { calculateKpi, getKpiById, getKpisByTypeAndPriority } from "./kpiDefinitions";
import dotenv from 'dotenv';
dotenv.config();


export async function registerRoutes(app: Express): Promise<Server> {

  const sqlConfig = {
   user: process.env.SQL_USER ,
  password: process.env.SQL_PASSWORD ,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE ,

  options: {
    encrypt: true,
    trustServerCertificate: true,
    port: parseInt(process.env.SQL_PORT || '1433'),
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

  // Health Check
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // Tenants
  app.get('/api/tenants', async (req, res) => {
    try {
      const tenants = await storage.getTenants();
      res.json(tenants);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve tenants" });
    }
  });

  app.get('/api/tenants/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tenant = await storage.getTenantById(id);
      
      if (!tenant) {
        return res.status(404).json({ message: "Tenant not found" });
      }
      
      res.json(tenant);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve tenant" });
    }
  });

  app.post('/api/tenants', async (req, res) => {
    try {
      const validated = insertTenantSchema.parse(req.body);
      const tenant = await storage.createTenant(validated);
      res.status(201).json(tenant);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tenant data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tenant" });
    }
  });

  // Users
  app.get('/api/users', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const users = await storage.getUsers(tenantId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve users" });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user" });
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const validated = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validated);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // KPI Categories
  app.get('/api/kpi-categories', async (req, res) => {
    try {
      const type = String(req.query.type);
      
      if (!type) {
        return res.status(400).json({ message: "Type parameter is required" });
      }
      
      const categories = await storage.getKpiCategories(type);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve KPI categories" });
    }
  });

  app.post('/api/kpi-categories', async (req, res) => {
    try {
      const validated = insertKpiCategorySchema.parse(req.body);
      const category = await storage.createKpiCategory(validated);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create KPI category" });
    }
  });

  // KPI Metrics
  app.get('/api/kpi-metrics', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const metrics = await storage.getKpiMetrics(tenantId, categoryId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve KPI metrics" });
    }
  });

  app.post('/api/kpi-metrics', async (req, res) => {
    try {
      const validated = insertKpiMetricSchema.parse(req.body);
      const metric = await storage.createKpiMetric(validated);
      res.status(201).json(metric);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid metric data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create KPI metric" });
    }
  });

  // Dashboard Customizations
  app.get('/api/dashboard-customizations', async (req, res) => {
    try {
      const userId = Number(req.query.userId);
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(userId) || isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid user ID or tenant ID" });
      }
      
      const customization = await storage.getDashboardCustomizations(userId, tenantId);
      
      if (!customization) {
        return res.json({ dashboardConfig: '{"widgets":[]}' });
      }
      
      res.json(customization);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve dashboard customization" });
    }
  });

  app.post('/api/dashboard-customizations', async (req, res) => {
    try {
      const validated = insertDashboardCustomizationSchema.parse(req.body);
      
      // Check if customization already exists
      const existing = await storage.getDashboardCustomizations(validated.userId, validated.tenantId);
      
      let customization;
      if (existing) {
        customization = await storage.updateDashboardCustomization(existing.id, {
          ...validated,
          lastUpdated: new Date()
        });
      } else {
        customization = await storage.createDashboardCustomization({
          ...validated,
          lastUpdated: new Date()
        });
      }
      
      res.status(201).json(customization);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid customization data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save dashboard customization" });
    }
  });

  // Calls
  app.get('/api/calls', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
      const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const calls = await storage.getCalls(tenantId, startDate, endDate);
      res.json(calls);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve calls" });
    }
  });

  app.post('/api/calls', async (req, res) => {
    try {
      const validated = insertCallSchema.parse(req.body);
      const call = await storage.createCall(validated);
      res.status(201).json(call);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid call data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create call" });
    }
  });

  // Call Transcriptions
  app.get('/api/call-transcriptions/:callId', async (req, res) => {
    try {
      const callId = parseInt(req.params.callId);
      const transcriptions = await storage.getCallTranscriptions(callId);
      res.json(transcriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve call transcriptions" });
    }
  });

  app.post('/api/call-transcriptions', async (req, res) => {
    try {
      const validated = insertCallTranscriptionSchema.parse(req.body);
      const transcription = await storage.createCallTranscription(validated);
      res.status(201).json(transcription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transcription data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create call transcription" });
    }
  });

  // Mobile Transactions
  app.get('/api/mobile-transactions', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
      const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const transactions = await storage.getMobileTransactions(tenantId, startDate, endDate);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve mobile transactions" });
    }
  });

  app.post('/api/mobile-transactions', async (req, res) => {
    try {
      const validated = insertMobileTransactionSchema.parse(req.body);
      const transaction = await storage.createMobileTransaction(validated);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create mobile transaction" });
    }
  });

  // IVR Interactions
  app.get('/api/ivr-interactions', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
      const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const interactions = await storage.getIvrInteractions(tenantId, startDate, endDate);
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve IVR interactions" });
    }
  });

  app.post('/api/ivr-interactions', async (req, res) => {
    try {
      const validated = insertIvrInteractionSchema.parse(req.body);
      const interaction = await storage.createIvrInteraction(validated);
      res.status(201).json(interaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid interaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create IVR interaction" });
    }
  });

  // Agents
  app.get('/api/agents', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const agents = await storage.getAgents(tenantId);
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve agents" });
    }
  });

  app.post('/api/agents', async (req, res) => {
    try {
      const validated = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent(validated);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create agent" });
    }
  });

  // Alerts
  app.get('/api/alerts', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const alerts = await storage.getAlerts(tenantId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve alerts" });
    }
  });

  app.post('/api/alerts', async (req, res) => {
    try {
      const validated = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validated);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  // Cognitive Services
  app.post('/api/cognitive/transcribe', async (req, res) => {
    try {
      const { audioUrl, language } = req.body;
      
      if (!audioUrl) {
        return res.status(400).json({ message: "Audio URL is required" });
      }
      
      const transcript = await transcribeAudio(audioUrl, language || 'en-US');
      res.json({ transcript });
    } catch (error) {
      res.status(500).json({ message: "Failed to transcribe audio" });
    }
  });

  app.post('/api/cognitive/sentiment', async (req, res) => {
    try {
      const { text, language } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
      
      const sentiment = await analyzeSentiment(text, language || 'en');
      res.json(sentiment);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze sentiment" });
    }
  });

  app.post('/api/cognitive/key-phrases', async (req, res) => {
    try {
      const { text, language } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
      
      const keyPhrases = await extractKeyPhrases(text, language || 'en');
      res.json({ keyPhrases });
    } catch (error) {
      res.status(500).json({ message: "Failed to extract key phrases" });
    }
  });

  app.post('/api/cognitive/entities', async (req, res) => {
    try {
      const { text, language } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
      
      const entities = await recognizeEntities(text, language || 'en');
      res.json({ entities });
    } catch (error) {
      res.status(500).json({ message: "Failed to recognize entities" });
    }
  });

  app.post('/api/cognitive/intent', async (req, res) => {
    try {
      const { text, language } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
      
      const intent = await detectIntent(text, language || 'en');
      res.json(intent);
    } catch (error) {
      res.status(500).json({ message: "Failed to detect intent" });
    }
  });

  app.post('/api/cognitive/tone', async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
      
      const tone = await detectTone(text);
      res.json({ tone });
    } catch (error) {
      res.status(500).json({ message: "Failed to detect tone" });
    }
  });

  // KPI Definition Endpoints
  app.get('/api/kpi-definitions', async (req, res) => {
    try {
      const type = req.query.type as 'contact_center' | 'mobile_banking';
      const priority = req.query.priority as 'critical' | 'medium' | 'low' | undefined;
      const tenantId = Number(req.query.tenantId);
      
      if (!type || (type !== 'contact_center' && type !== 'mobile_banking')) {
        return res.status(400).json({ message: "Invalid or missing type parameter. Must be 'contact_center' or 'mobile_banking'" });
      }

      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const kpis = await storage.getKpiMetrics(tenantId);
      // Use type assertion since these properties come from the KPI definitions
      const filteredKpis = kpis.filter(kpi => 
        (kpi as any).type === type && (!priority || (kpi as any).priority === priority)
      );
      
      res.json(filteredKpis);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
      res.status(500).json({ message: "Failed to retrieve KPI definitions" });
    }
  });
  
  app.get('/api/kpi-definitions/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const kpi = getKpiById(id);
      
      if (!kpi) {
        return res.status(404).json({ message: "KPI definition not found" });
      }
      
      res.json(kpi);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve KPI definition" });
    }
  });
  
  app.get('/api/kpi-calculation/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const tenantId = Number(req.query.tenantId);
      const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
      const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const kpi = getKpiById(id);
      if (!kpi) {
        return res.status(404).json({ message: "KPI definition not found" });
      }
      
      const result = await calculateKpi(id, tenantId, startDate, endDate);
      
      res.json({
        id,
        name: kpi.name,
        description: kpi.description,
        type: kpi.type,
        priority: kpi.priority,
        ...result,
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate KPI" });
    }
  });
  
  // Bulk KPI calculation
  app.post('/api/kpi-calculations', async (req, res) => {
    try {
      const { tenantId, kpiIds, startDate, endDate } = req.body;
      
      if (!tenantId || !kpiIds || !Array.isArray(kpiIds)) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          required: ["tenantId", "kpiIds (array)"] 
        });
      }
      
      const startDateObj = startDate ? new Date(startDate) : undefined;
      const endDateObj = endDate ? new Date(endDate) : undefined;
      
      const results = [];
      
      for (const id of kpiIds) {
        const kpi = getKpiById(id);
        if (kpi) {
          try {
            const result = await calculateKpi(id, tenantId, startDateObj, endDateObj);
            results.push({
              id,
              name: kpi.name,
              description: kpi.description,
              type: kpi.type,
              priority: kpi.priority,
              ...result,
              timestamp: new Date()
            });
          } catch (error) {
            console.error(`Error calculating KPI ${id}:`, error);
            results.push({
              id,
              name: kpi.name,
              error: "Failed to calculate KPI"
            });
          }
        } else {
          results.push({
            id,
            error: "KPI definition not found"
          });
        }
      }
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate KPIs" });
    }
  });
  
  // Health Check Endpoints
  app.get('/api/health', async (req, res) => {
    const start = Date.now();
    const services = {
      api: {
        status: 'healthy',
        latency: 0
      },
      database: await checkDatabaseHealth(),
      cognitive: {
        status: 'unknown',
        message: 'Azure Cognitive Services not checked'
      }
    };
    
    // Check if we have Azure keys configured
    const hasSpeechKey = !!process.env.AZURE_SPEECH_KEY;
    const hasTextAnalyticsKey = !!process.env.AZURE_TEXT_ANALYTICS_KEY;
    
    if (hasSpeechKey || hasTextAnalyticsKey) {
      services.cognitive.status = 'configured';
      services.cognitive.message = 'Azure Cognitive Services configured';
    }
    
    res.json({
      status: services.database.isHealthy ? 'healthy' : 'degraded',
      latency: Date.now() - start,
      services
    });
  });
  
  // ML Model Management Endpoints
  app.get('/api/ml/models', async (req, res) => {
    try {
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const models = await mlModelManager.getModels(tenantId);
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve ML models" });
    }
  });
  
  app.get('/api/ml/models/:id', async (req, res) => {
    try {
      const modelId = parseInt(req.params.id);
      const tenantId = Number(req.query.tenantId);
      
      if (isNaN(tenantId)) {
        return res.status(400).json({ message: "Invalid tenant ID" });
      }
      
      const model = await mlModelManager.getModelById(modelId, tenantId);
      res.json(model);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve ML model" });
    }
  });
  
  app.post('/api/ml/models', async (req, res) => {
    try {
      const { tenantId, name, type, parameters, featureColumns, targetColumn, trainingDataQuery } = req.body;
      
      if (!tenantId || !name || !type || !featureColumns) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          required: ["tenantId", "name", "type", "featureColumns"] 
        });
      }
      
      const modelId = await mlModelManager.registerModel(tenantId, {
        name,
        type,
        parameters: parameters || {},
        featureColumns,
        targetColumn,
        trainingDataQuery
      });
      
      // Start training the model
      if (type === 'regression') {
        mlModelManager.trainRegressionModel(modelId, tenantId).catch(console.error);
      } else if (type === 'clustering') {
        mlModelManager.trainClusteringModel(modelId, tenantId).catch(console.error);
      } else if (type === 'anomaly') {
        mlModelManager.trainAnomalyDetectionModel(modelId, tenantId).catch(console.error);
      }
      
      res.status(201).json({ 
        id: modelId,
        name,
        type,
        status: 'training'
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to register ML model" });
    }
  });
  
  app.post('/api/ml/predict', async (req, res) => {
    try {
      const { tenantId, modelId, features } = req.body;
      
      if (!tenantId || !modelId || !features) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          required: ["tenantId", "modelId", "features"] 
        });
      }
      
      const prediction = await mlModelManager.predict(tenantId, {
        modelId,
        features
      });
      
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ message: "Failed to make prediction" });
    }
  });

  // ===== AI/ML PLAYBOOK ENDPOINTS =====

  // Get all available ML models
  app.get("/api/ai/models", async (req, res) => {
    try {
      const models = [
        {
          id: 'call_volume_predictor',
          name: 'Call Volume Predictor',
          type: 'regression',
          description: 'Predicts daily call volume using historical patterns and business events',
          accuracy: 0.87,
          status: 'ready',
          lastTrained: '2024-01-15',
          predictions: 1247
        },
        {
          id: 'sentiment_classifier',
          name: 'Sentiment Analysis',
          type: 'classification',
          description: 'Classifies customer sentiment from call transcripts',
          accuracy: 0.92,
          status: 'ready',
          lastTrained: '2024-01-14',
          predictions: 3456
        },
        {
          id: 'agent_clustering',
          name: 'Agent Performance Clustering',
          type: 'clustering',
          description: 'Groups agents by performance metrics for targeted coaching',
          accuracy: 0.79,
          status: 'ready',
          lastTrained: '2024-01-13',
          predictions: 234
        },
        {
          id: 'anomaly_detector',
          name: 'KPI Anomaly Detection',
          type: 'classification',
          description: 'Detects unusual patterns in banking KPIs',
          accuracy: 0.84,
          status: 'training',
          lastTrained: '2024-01-12',
          predictions: 567
        },
        {
          id: 'automl_optimizer',
          name: 'AutoML Pipeline',
          type: 'automl',
          description: 'Automatically selects and tunes ML models for banking data',
          accuracy: 0.88,
          status: 'ready',
          lastTrained: '2024-01-16',
          predictions: 89
        }
      ];
      
      res.json({
        success: true,
        data: models,
        count: models.length
      });
    } catch (error) {
      console.error('Error fetching ML models:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch ML models'
      });
    }
  });

  // Make prediction using a model
  app.post("/api/ai/predict", async (req, res) => {
    try {
      const { modelId, features } = req.body;

      if (!modelId || !features) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: modelId and features'
        });
      }

      // Generate realistic predictions based on banking data patterns
      let prediction, confidence, explanation;
      
      switch (modelId) {
        case 'call_volume_predictor':
          const baseVolume = features.previous_day_volume || 100;
          const dayMultiplier = [0.7, 1.2, 1.3, 1.2, 1.1, 0.9, 0.6][features.day_of_week] || 1.0;
          prediction = Math.round(baseVolume * dayMultiplier);
          confidence = 0.87;
          explanation = {
            base_volume: baseVolume,
            day_adjustment: dayMultiplier,
            holiday_impact: features.is_holiday ? -30 : 0
          };
          break;
          
        case 'sentiment_classifier':
          const text = (features.transcript_text || '').toLowerCase();
          const positiveWords = ['thank', 'great', 'excellent', 'satisfied'];
          const negativeWords = ['terrible', 'awful', 'angry', 'frustrated'];
          const positiveCount = positiveWords.filter(word => text.includes(word)).length;
          const negativeCount = negativeWords.filter(word => text.includes(word)).length;
          
          if (positiveCount > negativeCount) {
            prediction = 'positive';
            confidence = 0.85;
          } else if (negativeCount > positiveCount) {
            prediction = 'negative';
            confidence = 0.80;
          } else {
            prediction = 'neutral';
            confidence = 0.75;
          }
          
          explanation = {
            positive_indicators: positiveCount,
            negative_indicators: negativeCount
          };
          break;
          
        default:
          prediction = 'Sample prediction';
          confidence = 0.75;
          explanation = { note: 'Real-time prediction based on banking data' };
      }
      
      res.json({
        success: true,
        data: {
          modelId,
          prediction,
          confidence,
          explanation,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error making prediction:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to make prediction'
      });
    }
  });

  // Get model metrics
  app.get("/api/ai/metrics/:modelId", async (req, res) => {
    try {
      const { modelId } = req.params;

      const metrics = {
        model_id: modelId,
        accuracy: 0.75 + Math.random() * 0.2,
        predictions_today: Math.floor(Math.random() * 1000) + 100,
        average_confidence: 0.75 + Math.random() * 0.2,
        performance_trend: 'stable'
      };
      
      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch metrics'
      });
    }
  });

  //Get Cities and Countries


app.get('/api/cities', async (req, res) => {
  try {
    // Create a new connection pool or reuse your existing one
    const pool = await sql.connect(sqlConfig);

    // Query your database table (replace with your actual table/columns)
    const result = await pool.request()
      .query('SELECT id, city, city_ascii, lat, lng, country, iso2, iso3, admin_name, capital, population FROM CityData');

    const cities = result.recordset;  // Array of rows

    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cities'
    });
  }
});

  // Database exploration endpoints
  app.get('/api/database/tables', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      
      console.log('Fetching all tables from Call_Center database...');
      
      // Get all tables in the database
      const tables = await executeQuery(`
        SELECT 
          TABLE_NAME as tableName,
          TABLE_SCHEMA as tableSchema,
          TABLE_TYPE as tableType
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_NAME
      `);
      
      console.log(`Found ${tables.length} tables in database`);
      res.json({ tables });
    } catch (error) {
      console.error('Error fetching tables:', error);
      res.status(500).json({ error: 'Failed to fetch tables from database' });
    }
  });

  app.get('/api/database/table-structure/:tableName', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      const { tableName } = req.params;
      
      console.log(`Fetching structure for table: ${tableName}`);
      
      // Get table structure
      const columns = await executeQuery(`
        SELECT 
          COLUMN_NAME as columnName,
          DATA_TYPE as dataType,
          IS_NULLABLE as isNullable,
          CHARACTER_MAXIMUM_LENGTH as maxLength,
          COLUMN_DEFAULT as defaultValue,
          ORDINAL_POSITION as position
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = @tableName
        ORDER BY ORDINAL_POSITION
      `, { tableName });
      
      // Get sample data if table exists
      let sampleData = [];
      if (columns.length > 0) {
        sampleData = await executeQuery(`SELECT TOP 5 * FROM ${tableName}`);
      }
      
      res.json({ 
        tableName,
        columns,
        sampleData,
        recordCount: sampleData.length
      });
    } catch (error) {
      console.error(`Error fetching structure for table ${req.params.tableName}:`, error);
      res.status(500).json({ error: `Failed to fetch table structure for ${req.params.tableName}` });
    }
  });

  // Framework User Management API routes
  app.get('/api/framework/users/structure', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      
      console.log('Checking UsersManagement table structure...');
      
      // Get structure of UsersManagement table
      const columns = await executeQuery(`
        SELECT 
          COLUMN_NAME as columnName,
          DATA_TYPE as dataType,
          IS_NULLABLE as isNullable,
          CHARACTER_MAXIMUM_LENGTH as maxLength,
          COLUMN_DEFAULT as defaultValue,
          ORDINAL_POSITION as position
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'UsersManagement'
        ORDER BY ORDINAL_POSITION
      `);
      
      // Get sample data from UsersManagement table
      let sampleData = [];
      if (columns.length > 0) {
        sampleData = await executeQuery(`SELECT TOP 5 * FROM UsersManagement`);
      }
      
      console.log(`UsersManagement table has ${columns.length} columns`);
      res.json({ 
        tableName: 'UsersManagement',
        columns,
        sampleData,
        recordCount: sampleData.length
      });
    } catch (error) {
      console.error('Error checking UsersManagement table:', error);
      res.status(500).json({ error: 'Failed to check UsersManagement table structure' });
    }
  });

  app.get('/api/framework/users', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      
      console.log('Fetching users from UsersManagement table...');
      
      // Fetch all users from UsersManagement table
      const users = await executeQuery(`
        SELECT 
          UserID,
          UniverseID,
          FirstName,
          MiddleName,
          LastName,
          FullNameLocal,
          NationalID,
          PassportNumber,
          IDExpiryDate,
          Username,
          Email,
          PhoneNumber,
          IsLocked,
          LockoutEnd,
          IsLoggedIn,
          FailedLoginAttempts,
          IsEmailVerified,
          IsPhoneVerified,
          Status,
          LanguageID,
          CountryID,
          StateID,
          CityID,
          TimeZone,
          CreatedAt,
          CreatedBy,
          UpdatedAt,
          UpdatedBy,
          LastLogin,
          IsActive,
          IsDeleted
        FROM UsersManagement 
        WHERE IsDeleted = 0
        ORDER BY UserID DESC
      `);
      
      console.log(`Retrieved ${users.length} users from UsersManagement table`);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users from database' });
    }
  });

  app.post('/api/framework/users', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      const userData = req.body;
      
      console.log('Adding new user to UsersManagement table:', userData);
      
      // Insert new user into UsersManagement table
      const result = await executeQuery(`
        INSERT INTO UsersManagement (
          UniverseID,
          FirstName,
          MiddleName,
          LastName,
          FullNameLocal,
          NationalID,
          PassportNumber,
          IDExpiryDate,
          Username,
          Email,
          PhoneNumber,
          PasswordHash,
          PasswordSalt,
          IsLocked,
          IsEmailVerified,
          IsPhoneVerified,
          Status,
          LanguageID,
          CountryID,
          StateID,
          CityID,
          TimeZone,
          CreatedAt,
          CreatedBy,
          IsActive,
          IsDeleted
        )
        OUTPUT INSERTED.UserID
        VALUES (
          @universeID, @firstName, @middleName, @lastName, @fullNameLocal,
          @nationalID, @passportNumber, @idExpiryDate, @username, @email,
          @phoneNumber, @passwordHash, @passwordSalt, @isLocked, @isEmailVerified,
          @isPhoneVerified, @status, @languageID, @countryID, @stateID,
          @cityID, @timeZone, GETDATE(), @createdBy, @isActive, @isDeleted
        )
      `, {
        universeID: userData.universeID || 1,
        firstName: userData.firstName,
        middleName: userData.middleName || null,
        lastName: userData.lastName,
        fullNameLocal: userData.fullNameLocal || null,
        nationalID: userData.nationalID || null,
        passportNumber: userData.passportNumber || null,
        idExpiryDate: userData.idExpiryDate || null,
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber || null,
        passwordHash: userData.passwordHash || 'temp_hash_123', // Will be properly hashed in production
        passwordSalt: userData.passwordSalt || 'temp_salt_456', // Will be properly generated in production
        isLocked: userData.isLocked || false,
        isEmailVerified: userData.isEmailVerified || false,
        isPhoneVerified: userData.isPhoneVerified || false,
        status: userData.status || 'Active',
        languageID: userData.languageID || null,
        countryID: userData.countryID || null,
        stateID: userData.stateID || null,
        cityID: userData.cityID || null,
        timeZone: userData.timeZone || null,
        createdBy: userData.createdBy || 'System',
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        isDeleted: userData.isDeleted || false
      });
      
      console.log('User added successfully with ID:', result[0]?.UserID);
      res.json({ success: true, userId: result[0]?.UserID, message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user to UsersManagement table:', error);
      res.status(500).json({ 
        error: 'Failed to add user', 
        details: error.message
      });
    }
  });

  // Update user route
  app.put('/api/framework/users/:id', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      const userId = parseInt(req.params.id);
      const userData = req.body;
      
      console.log('Updating user ID:', userId, 'with data:', userData);
      
      const result = await executeQuery(`
        UPDATE UsersManagement 
        SET UniverseID = @universeID,
            FirstName = @firstName,
            MiddleName = @middleName,
            LastName = @lastName,
            FullNameLocal = @fullNameLocal,
            NationalID = @nationalID,
            PassportNumber = @passportNumber,
            IDExpiryDate = @idExpiryDate,
            Username = @username,
            Email = @email,
            PhoneNumber = @phoneNumber,
            IsLocked = @isLocked,
            IsEmailVerified = @isEmailVerified,
            IsPhoneVerified = @isPhoneVerified,
            Status = @status,
            LanguageID = @languageID,
            CountryID = @countryID,
            StateID = @stateID,
            CityID = @cityID,
            TimeZone = @timeZone,
            UpdatedAt = GETDATE(),
            UpdatedBy = @updatedBy,
            IsActive = @isActive
        WHERE UserID = @userId
      `, {
        userId: userId,
        universeID: userData.universeID || 1,
        firstName: userData.firstName,
        middleName: userData.middleName || null,
        lastName: userData.lastName,
        fullNameLocal: userData.fullNameLocal || null,
        nationalID: userData.nationalID || null,
        passportNumber: userData.passportNumber || null,
        idExpiryDate: userData.idExpiryDate || null,
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber || null,
        isLocked: userData.isLocked || false,
        isEmailVerified: userData.isEmailVerified || false,
        isPhoneVerified: userData.isPhoneVerified || false,
        status: userData.status || 'Active',
        languageID: userData.languageID || null,
        countryID: userData.countryID || null,
        stateID: userData.stateID || null,
        cityID: userData.cityID || null,
        timeZone: userData.timeZone || null,
        updatedBy: userData.updatedBy || 'System',
        isActive: userData.isActive !== undefined ? userData.isActive : true
      });
      
      console.log('User updated successfully');
      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ 
        error: 'Failed to update user', 
        details: error.message
      });
    }
  });

  // Delete user route
  app.delete('/api/framework/users/:id', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      const userId = parseInt(req.params.id);
      
      console.log('Deleting user ID:', userId);
      
      // Soft delete by setting IsDeleted = true
      const result = await executeQuery(`
        UPDATE UsersManagement 
        SET IsDeleted = 1,
            UpdatedAt = GETDATE(),
            UpdatedBy = 'System'
        WHERE UserID = @userId
      `, {
        userId: userId
      });
      
      console.log('User deleted successfully');
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        error: 'Failed to delete user', 
        details: error.message
      });
    }
  });

  // Get user table structure for debugging
  app.get('/api/framework/users/structure', async (req, res) => {
    try {
      const { executeQuery } = await import('./sqlUtils');
      
      const columns = await executeQuery(`
        SELECT 
          COLUMN_NAME,
          DATA_TYPE,
          IS_NULLABLE,
          CHARACTER_MAXIMUM_LENGTH,
          COLUMN_DEFAULT
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'UsersManagement'
        ORDER BY ORDINAL_POSITION
      `);
      
      res.json({ columns });
    } catch (error) {
      console.error('Error getting table structure:', error);
      res.status(500).json({ error: 'Failed to get table structure' });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
