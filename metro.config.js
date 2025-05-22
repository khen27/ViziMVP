// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom configurations
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Additional settings to disable inspector
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Block requests to dev menu and inspector
      if (req.url.includes('/inspector') || req.url.includes('/debugger-ui')) {
        res.statusCode = 404;
        res.end();
        return;
      }
      return middleware(req, res, next);
    };
  }
};

module.exports = config; 