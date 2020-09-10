import React, { Component } from 'react'
import { DefaultTheme,
  DarkTheme, } from '@react-navigation/native';
import { useColorScheme,View} from 'react-native';

var appTheme= DefaultTheme;

export default function AppColors() {
  
  const appScheme = useColorScheme();
  
  const appDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      sportColor:'#00bb68',text:'#4e5258',border:'white',background:'#323840'
    },
  };
  
  const appLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,sportColor:'#00bb68',text:'#4e5258',border:'black',background:'gray'
      
    },
  };

  appTheme=(appScheme=='dark')?appDarkTheme:appLightTheme
  console.log(appTheme);

  
  return(appTheme);
}

export const colors={
  yellowColor:'#fbbc04',
  sportColor:'#00bb68',
  blackTransparent:'rgba(0,0,0,0.2)',
  // bgcolor:global.appTheme.colors.background
  bgColor:global.appThemebgcolor,
}

