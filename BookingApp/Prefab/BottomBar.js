import React, { Component } from 'react'
import { NavigationContainer,DefaultTheme,
    DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import FacilityScreen from '../Screen/FacilityScreen';
import EventScreen from '../Screen/EventScreen';
import OfferScreen from '../Screen/OfferScreen';
import { Dimensions, StyleSheet,useColorScheme,Appearance} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AppearanceProvider, useColorScheme as appcolorScheme } from 'react-native-appearance';

export default function BottomBar() {
    
    // render() {
        const Tab = createBottomTabNavigator();

        const colorScheme = useColorScheme();

        const appDarkTheme = {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
            },
          };

          const appLightTheme = {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: 'rgb(255, 45, 85)',
            },
          };
        // global.appThemebgcolor=(colorScheme=='dark')?appDarkTheme.colors.background:appLightTheme.colors.background;
        // console.log(global.appThemebgcolor);
        // global.appTheme=(colorScheme=='dark')?appDarkTheme:appLightTheme;
        return (
            // <AppearanceProvider>
            <NavigationContainer theme={ colorScheme=='dark'?appDarkTheme:appLightTheme} style={styles.NavigationBar}>
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    
                    if (route.name === 'Home') {
                        iconName = focused
                        ? 'ios-home'
                        : 'ios-home';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Facilty') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }else if (route.name === 'Events') {
                        iconName = focused ? 'event' : 'event';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }else if (route.name === 'Offers') {
                        iconName = focused ? 'local-offer' : 'local-offer';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Messages') {
                        iconName = focused ? 'message' : 'message';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                    //   return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#16e267',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 12,
                },
                
            }}
            >
            <Tab.Screen name="Facilty" component={FacilityScreen}/>
            <Tab.Screen name="Events" component={EventScreen}/>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Messages" component={HomeScreen}/>
            <Tab.Screen name="Offers" component={OfferScreen}/>
            
            </Tab.Navigator> 
            </NavigationContainer>
            // </AppearanceProvider>
            )
        // }
    }
    const styles = StyleSheet.create({
        NavigationBar:{
            backgroundColor:'red',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
        },
    })
    