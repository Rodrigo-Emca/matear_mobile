import React from 'react';
import BottomTabsNavigation from './src/Navigations/BottomTabsNavigation';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigation/>
    </NavigationContainer>
  );
}

export default App;
