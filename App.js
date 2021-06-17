import React from 'react';
import { StatusBar } from 'react-native';

import Count from './src/components/Count';

export default function App() {
  return (
    <>
      <Count />
      <StatusBar barStyle="light-content" backgroundColor="#000" />
    </>
  );
}