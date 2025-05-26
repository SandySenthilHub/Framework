import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Serve static files
app.use('/client', express.static(path.join(__dirname, 'client')));

// Simple HTML preview with Metronic theme
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banking Call Center - Metronic Theme</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --primary: 207 90% 54%;
            --primary-foreground: 211 100% 99%;
        }
        .bg-primary { background: hsl(var(--primary)); }
        .text-primary { color: hsl(var(--primary)); }
        .text-primary-foreground { color: hsl(var(--primary-foreground)); }
        .border-l-3 { border-left-width: 3px; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div class="px-4 py-3 flex items-center justify-between">
            <div class="flex items-center">
                <i class="bi bi-headphones text-blue-500 text-xl mr-2"></i>
                <span class="text-gray-800 font-semibold text-xl">Banking Call Center Intelligence</span>
            </div>
            <div class="flex items-center space-x-4">
                <button class="relative p-2 text-gray-600 hover:text-gray-800">
                    <i class="bi bi-bell text-lg"></i>
                    <span class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
                <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                         alt="User" class="w-8 h-8 rounded-full mr-2">
                    <span class="text-gray-700">Admin User</span>
                    <i class="bi bi-chevron-down ml-1"></i>
                </div>
            </div>
        </div>
    </header>

    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md fixed h-full top-16 left-0 overflow-y-auto">
        <div class="py-4">
            <ul class="mt-2">
                <li class="px-4 py-2 text-sm font-medium text-gray-600">MAIN</li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 bg-blue-50 text-blue-600 border-l-3 border-blue-500">
                        <i class="bi bi-bar-chart mr-3 text-blue-600"></i>
                        Dashboard Overview
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-grid mr-3 text-gray-600"></i>
                        KPI Dashboard
                    </a>
                </li>
                
                <li class="px-4 py-2 text-sm font-medium text-gray-600 mt-4">CONTACT CENTER</li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-telephone mr-3 text-gray-600"></i>
                        Call Analytics
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-people mr-3 text-gray-600"></i>
                        Agent Performance
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-shield-check mr-3 text-gray-600"></i>
                        Quality Management
                    </a>
                </li>
                
                <li class="px-4 py-2 text-sm font-medium text-gray-600 mt-4">MOBILE BANKING</li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-phone mr-3 text-gray-600"></i>
                        Mobile Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-credit-card mr-3 text-gray-600"></i>
                        Transaction Analytics
                    </a>
                </li>
                
                <li class="px-4 py-2 text-sm font-medium text-gray-600 mt-4">IVR ANALYTICS</li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-diagram-3 mr-3 text-gray-600"></i>
                        Call Flow Analytics
                    </a>
                </li>
                
                <li class="px-4 py-2 text-sm font-medium text-gray-600 mt-4">SETTINGS</li>
                <li>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100">
                        <i class="bi bi-gear mr-3 text-gray-600"></i>
                        Configuration
                    </a>
                </li>
            </ul>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 pt-16 p-6">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
            
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 bg-blue-100 rounded-lg">
                            <i class="bi bi-telephone text-blue-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">Total Calls</p>
                            <p class="text-2xl font-semibold text-gray-900">12,345</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 bg-green-100 rounded-lg">
                            <i class="bi bi-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">Answered Calls</p>
                            <p class="text-2xl font-semibold text-gray-900">11,890</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 bg-yellow-100 rounded-lg">
                            <i class="bi bi-clock text-yellow-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">Avg Wait Time</p>
                            <p class="text-2xl font-semibold text-gray-900">2.3m</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 bg-purple-100 rounded-lg">
                            <i class="bi bi-people text-purple-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">Active Agents</p>
                            <p class="text-2xl font-semibold text-gray-900">147</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Call Volume Trends</h2>
                    <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <span class="text-gray-500">Chart Area - Call Volume Analytics</span>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h2>
                    <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <span class="text-gray-500">Chart Area - Agent Performance Metrics</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Metronic Theme Preview Server running at http://localhost:${port}`);
  console.log(`📱 Your Banking Call Center with beautiful Metronic design is ready!`);
});