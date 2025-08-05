export const APP_ENV = import.meta.env.VITE_APP_ENV;

export const config = {
  isDevelopment: APP_ENV === 'development',
  isStaging: APP_ENV === 'staging', 
  isProduction: APP_ENV === 'production',
  
  // Environment-specific features
  enableDebugMode: APP_ENV !== 'production',
  enableAnalytics: APP_ENV === 'production',
  apiTimeout: APP_ENV === 'production' ? 10000 : 30000,
};