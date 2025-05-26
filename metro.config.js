// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// Add custom configurations
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
  extraNodeModules: {
    '@': path.resolve(__dirname),
  },
  // Add aliases for common directories
  alias: {
    '@/components': path.resolve(__dirname, 'components'),
    '@/utils': path.resolve(__dirname, 'utils'),
    '@/context': path.resolve(__dirname, 'context'),
    '@/theme': path.resolve(__dirname, 'theme'),
    '@/assets': path.resolve(__dirname, 'assets'),
  },
};

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