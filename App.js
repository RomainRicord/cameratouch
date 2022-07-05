/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Navigation from './src/navigator/Navigation';
import { PictureProvider } from './src/components/PictureProvider';

const App = () => {

  const [picture, setPicture] = React.useState(null);

  return (
    <PictureProvider.Provider value={{picture,setPicture}} >
      <Navigation />
    </PictureProvider.Provider>
  );
}

export default App