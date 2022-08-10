import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import React from 'react';


export default function App() {


  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
