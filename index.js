/**
 * @format
 */

import MapboxGL from '@rnmapbox/maps';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

MapboxGL.setAccessToken('pk.eyJ1IjoidnBldHJ1c2hrYSIsImEiOiJjbWNycDdkYzkwOTM3MmlzZnc5dzU0cG9zIn0.RTvMMfbGEewl5M_onhWwCg');

AppRegistry.registerComponent(appName, () => App);
