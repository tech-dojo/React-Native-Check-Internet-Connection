/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StackNav from './src/Navigation'
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => StackNav);
