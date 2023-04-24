import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { store } from './src/App/store';
import { Provider } from 'react-redux'

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )

AppRegistry.registerComponent(appName, () => Root);
