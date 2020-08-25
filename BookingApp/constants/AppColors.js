import React, { Component } from 'react'
import { DefaultTheme,
  DarkTheme, } from '@react-navigation/native';
import { useColorScheme,div} from 'react-native';

export var appTheme= DarkTheme;

export default function AppColors() {
  
  const appScheme = useColorScheme();
  
  const appDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      sportColor:'#16e267',
    },
  };
  
  const appLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,sportColor:'#16e267',
      
    },
  };

  appTheme=(appScheme=='dark')?appDarkTheme:appLightTheme
  console.log(appTheme);

  
  return(<div theme={appTheme}>
  </div>);
  // sportColor:'#16e267',
  // blackTransparent:'rgba(0,0,0,0.2)',
  // // bgcolor:global.appTheme.colors.background
  // bgColor:global.appThemebgcolor
  
}

export const colors={
  sportColor:'#16e267',
  blackTransparent:'rgba(0,0,0,0.2)',
  // bgcolor:global.appTheme.colors.background
  bgColor:global.appThemebgcolor
}

