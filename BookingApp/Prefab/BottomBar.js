import React, { Component } from 'react'
import { NavigationContainer,DefaultTheme,
    DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import FacilityScreen from '../Screen/FacilityScreen';
import EventScreen from '../Screen/EventScreen';
import OfferScreen from '../Screen/OfferScreen';
import { Dimensions, StyleSheet,useColorScheme,Appearance, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appTheme, colors } from '../constants/AppColors';
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
            // <NavigationContainer theme={ colorScheme=='dark'?appDarkTheme:appLightTheme} style={styles.NavigationBar}>
            <NavigationContainer>

            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused? 'home':'home';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Facilty') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }else if (route.name === 'Favourites') {
                        iconName = focused ? 'star' : 'star-border';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }else if (route.name === 'My Account') {
                        iconName = focused ? 'person' : 'person-outline';
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
                activeBackgroundColor:colors.sportColor,
                inactiveBackgroundColor:colors.sportColor,
                backgroundColor:colors.sportColor,
                activeTintColor: colors.yellowColor,
                inactiveTintColor: appTheme.colors.border,
                labelStyle: {
                    fontSize: 12,
                    margin:10,paddingBottom:5,
                },
                  style: {paddingTop:10,
                    height: 50,
                    backgroundColor: colors.sportColor,
                  },
                
            }}
            >

            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Facilty" component={FacilityScreen}/>
            {/* <Tab.Screen name="Events" component={EventScreen}/> */}
            <Tab.Screen name="Favourites" component={HomeScreen}/>
            <Tab.Screen name="My Account" component={OfferScreen}/>
            
            </Tab.Navigator> 
            </NavigationContainer>
            // </AppearanceProvider>
            )
        // }
    }
    const styles = StyleSheet.create({
        NavigationBar:{
            // backgroundColor:'red',
            // color:colors.sportColor,
            // tintColor:colors.sportColor,
            // backgroundColor:colors.sportColor,
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 10,
            // elevation: 5,
        },
    })
    