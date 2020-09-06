import React, { Component } from 'react'
import { DefaultTheme,
  DarkTheme, } from '@react-navigation/native';
import { useColorScheme,View} from 'react-native';

export var appTheme= DarkTheme;

export default function AppColors() {
  
  const appScheme = useColorScheme();
  
  const appDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      sportColor:'#00bb68',text:'#4e5258',border:'white'
    },
  };
  
  const appLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,sportColor:'#00bb68',text:'#4e5258',border:'black'
      
    },
  };

  appTheme=(appScheme=='dark')?appDarkTheme:appLightTheme
  // console.log(appTheme);

  
  return(
  <View theme={appTheme}/>);
}

export const colors={
  yellowColor:'#fbbc04',
  sportColor:'#00bb68',
  blackTransparent:'rgba(0,0,0,0.2)',
  // bgcolor:global.appTheme.colors.background
  bgColor:global.appThemebgcolor,
}

