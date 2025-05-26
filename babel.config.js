module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: { '@': './' },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js']
      }],
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
          moduleName: '@env',
          path: '.env',
        },
      ],
    ]
  };
}; 