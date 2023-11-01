import * as React from 'react';
import MainNavigator from './src/navigations/AppNavigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import storages from './src/storages/store';

const { store, persistor } = storages();
export default function App() {
 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
