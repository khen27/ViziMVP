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
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#836CE8"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.vizi",
    config: {
      googleSignIn: {
        reservedClientId: "201475157735-oerh1aujmolg0ckmsas2sc0740i25b2a.apps.googleusercontent.com"
      }
    },
    icon: "./assets/ios/icon-1024.png",
    icons: {
      "20": "./assets/ios/icon-20.png",
      "29": "./assets/ios/icon-29.png",
      "40": "./assets/ios/icon-40.png",
      "58": "./assets/ios/icon-58.png",
      "60": "./assets/ios/icon-60.png",
      "76": "./assets/ios/icon-76.png",
      "80": "./assets/ios/icon-80.png",
      "87": "./assets/ios/icon-87.png",
      "120": "./assets/ios/icon-120.png",
      "152": "./assets/ios/icon-152.png",
      "167": "./assets/ios/icon-167.png",
      "180": "./assets/ios/icon-180.png",
      "1024": "./assets/ios/icon-1024.png"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#836CE8"
    },
    package: "com.anonymous.vizi",
    icons: [
      {
        "size": 36,
        "path": "./assets/android/icon-36.png",
        "density": "ldpi"
      },
      {
        "size": 48,
        "path": "./assets/android/icon-48.png",
        "density": "mdpi"
      },
      {
        "size": 72,
        "path": "./assets/android/icon-72.png",
        "density": "hdpi"
      },
      {
        "size": 96,
        "path": "./assets/android/icon-96.png",
        "density": "xhdpi"
      },
      {
        "size": 144,
        "path": "./assets/android/icon-144.png",
        "density": "xxhdpi"
      },
      {
        "size": 192,
        "path": "./assets/android/icon-192.png",
        "density": "xxxhdpi"
      }
    ]
  },
  web: {
    favicon: "./assets/icon.png"
  },
  plugins: [
    "expo-font",
    [
      "expo-build-properties",
      {
        "ios": {
          "deploymentTarget": "15.1",
          "useFrameworks": "static"
        }
      }
    ]
  ],
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
    sourceExts: ["js", "jsx", "ts", "tsx", "json", "svg"],
    config: "metro.config.js"
  }
}; 