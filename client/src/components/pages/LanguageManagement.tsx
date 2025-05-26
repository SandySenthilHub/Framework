import React from 'react';
import { Card } from '@/components/ui/card';
import { Languages, Globe, Users, CheckCircle, AlertTriangle, Settings } from 'lucide-react';

const LanguageManagement: React.FC = () => {
  const supportedLanguages = [
    { code: 'en-US', name: 'English (US)', nativeName: 'English', coverage: '100%', agents: 89, status: 'active' },
    { code: 'es-ES', name: 'Spanish', nativeName: 'Español', coverage: '95%', agents: 34, status: 'active' },
    { code: 'fr-FR', name: 'French', nativeName: 'Français', coverage: '90%', agents: 23, status: 'active' },
    { code: 'de-DE', name: 'German', nativeName: 'Deutsch', coverage: '85%', agents: 18, status: 'active' },
    { code: 'it-IT', name: 'Italian', nativeName: 'Italiano', coverage: '80%', agents: 12, status: 'active' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português', coverage: '88%', agents: 15, status: 'active' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', coverage: '70%', agents: 8, status: 'beta' },
    { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', coverage: '65%', agents: 6, status: 'beta' },
  ];

  const languageStats = [
    { label: 'Supported Languages', value: '8', icon: Languages },
    { label: 'Multilingual Agents', value: '205', icon: Users },
    { label: 'Avg Coverage', value: '84%', icon: Globe },
    { label: 'Translation Updates', value: '24', icon: Settings },
  ];

  const translationStatus = [
    { module: 'User Interface', progress: 100, languages: 8, status: 'complete' },
    { module: 'Help Documentation', progress: 95, languages: 7, status: 'active' },
    { module: 'Error Messages', progress: 88, languages: 6, status: 'active' },
    { module: 'Email Templates', progress: 92, languages: 7, status: 'active' },
    { module: 'Legal Documents', progress: 75, languages: 5, status: 'pending' },
    { module: 'Training Materials', progress: 68, languages: 4, status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'beta': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 95) return 'bg-green-500';
    if (progress >= 80) return 'bg-blue-500';
    if (progress >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Languages</h1>
        <div className="text-sm text-muted-foreground">Multilingual support management</div>
      </div>

      {/* Language Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {languageStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* Supported Languages */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Supported Languages</h2>
        <div className="space-y-3">
          {supportedLanguages.map((language, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Languages className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{language.name}</h3>
                  <p className="text-sm text-muted-foreground">{language.nativeName} ({language.code})</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{language.coverage}</p>
                  <p className="text-muted-foreground">Coverage</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{language.agents}</p>
                  <p className="text-muted-foreground">Agents</p>
                </div>
                <div className="text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(language.status)}`}>
                    {language.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Translation Progress */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Translation Progress</h2>
        <div className="space-y-4">
          {translationStatus.map((module, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground">{module.module}</h3>
                  <p className="text-sm text-muted-foreground">{module.languages} languages covered</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(module.status)}`}>
                  {module.status}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(module.progress)}`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{module.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Localization Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Localization Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Regional Preferences</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date Format:</span>
                <span className="text-foreground">Locale-specific</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number Format:</span>
                <span className="text-foreground">Regional standards</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency Display:</span>
                <span className="text-foreground">Local currency</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Text Direction</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">LTR Languages:</span>
                <span className="text-foreground">6 supported</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RTL Languages:</span>
                <span className="text-foreground">2 planned</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vertical Text:</span>
                <span className="text-foreground">Not supported</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Language Quality */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quality Assurance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-900 dark:text-green-100">High Quality</h3>
            <p className="text-sm text-green-700 dark:text-green-300">English, Spanish, French meet 95%+ accuracy</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Cultural Adaptation</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Localized content for regional preferences</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-orange-900 dark:text-orange-100">Needs Review</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Asian languages require native speaker review</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LanguageManagement;