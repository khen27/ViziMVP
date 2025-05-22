// Get the existing app.json configuration
const config = require('./app.json');

// Add additional development client configuration
if (config.expo.developmentClient) {
  config.expo.developmentClient.silentLaunch = true;
} else {
  config.expo.developmentClient = { silentLaunch: true };
}

// Disable the React DevTools Inspector
process.env.EXPO_INSPECTOR_DEVICE = 'false';
process.env.EXPO_INSPECTOR_DISABLED = 'true';

module.exports = {
  name: "Vizi",
  slug: "vizi",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/vizi-logo.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/vizi-logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.vizi",
    config: {
      googleSignIn: {
        reservedClientId: "201475157735-oerh1aujmolg0ckmsas2sc0740i25b2a.apps.googleusercontent.com"
      }
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/vizi-logo.png",
      backgroundColor: "#ffffff"
    },
    package: "com.anonymous.vizi"
  },
  web: {
    favicon: "./assets/vizi-logo.png"
  },
  plugins: ["expo-font"],
  scheme: "vizi",
  extra: {
    eas: {
      projectId: "vizi-app"
    },
    // Runtime environment variables to disable dev tools
    EXPO_DISABLE_DEVELOPER_TOOLS: true,
    EXPO_DISABLE_INSPECTOR: true,
    EXPO_NO_DEV_MENU: true,
    EXPO_NO_DEBUG_MENU: true,
    devMode: process.env.NODE_ENV !== 'production'
  },
  developmentClient: {
    silentLaunch: true,
    disableInspector: true
  },
  experiments: {
    tsconfigPaths: true,
    noInspector: true
  },
  packagerOpts: {
    sourceExts: ["js", "jsx", "ts", "tsx", "json"],
    config: "metro.config.js"
  }
}; 