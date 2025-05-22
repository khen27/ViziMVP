import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

// Disable DevTools globally
if (global.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
}

// Ignore annoying warnings
LogBox.ignoreLogs([
  'Constants.installationId has been deprecated',
  'Constants.deviceId has been deprecated',
  'Component auth has not been registered yet',
  'TouchableOpacity has been extracted'
]);

// Import app
import App from './app/_layout';

// Register the app
registerRootComponent(App); 