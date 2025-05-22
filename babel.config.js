module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'transform-inline-environment-variables',
        {
          include: [
            'EXPO_NO_DEV_MENU',
            'EXPO_NO_DEBUG_MENU',
            'EXPO_DISABLE_INSPECTOR'
          ]
        }
      ],
      [
        'module:react-native-dotenv', 
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          verbose: false
        }
      ]
    ]
  };
}; 