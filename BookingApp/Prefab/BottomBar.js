import React, { Component, useState } from 'react'
import { NavigationContainer,DefaultTheme,
    DarkTheme, } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import HomeScreen from '../Screen/HomeScreen';
    import FacilityScreen from '../Screen/FacilityScreen';
    import EventScreen from '../Screen/EventScreen';
    import AccountScreen from '../Screen/AccountScreen';
    import { Dimensions, StyleSheet,Appearance, View} from 'react-native'
    // import Ionicons from 'react-native-vector-icons/Ionicons';
    // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
    import AppColors from '../constants/AppColors';
    // import { AppearanceProvider, useColorScheme as appcolorScheme } from 'react-native-appearance';
    import { useTheme } from '@react-navigation/native';
import PopupModal from './PopupModal';
    
    export default function BottomBar(props) {
        // const { colors } = useTheme();
        const Tab = createBottomTabNavigator();
        
        // const colorScheme = appcolorScheme();
        
        const appDarkTheme = {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                sportColor:'#00bb68',text:'#ebebeb',border:'white',background:'#323840',yellowColor:'#fbbc04',
                blackTransparent:'rgba(0,0,0,0.2)',
            },
        };
        
        const appLightTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,sportColor:'#00bb68',text:'#323840',border:'black',background:'#ebebeb',yellowColor:'#fbbc04',
                blackTransparent:'rgba(0,0,0,0.2)',
                
            },
        };

        let theme={}
        const [getStarted, setstarted] = useState(true);

        const [userProfile, setUser] = useState({});

        const getTheme=()=>{
            theme=(colorScheme=='dark'?appDarkTheme:appLightTheme);
            return theme;
        }
        const OnDone=(user)=>{
            setUser(user);
            setstarted(false);
        }
        // global.appThemebgcolor=(colorScheme=='dark')?appDarkTheme.colors.background:appLightTheme.colors.background;
        // console.log(global.appThemebgcolor);
        // global.appTheme=(colorScheme=='dark')?appDarkTheme:appLightTheme;
        return (
            // <AppearanceProvider>
            <NavigationContainer theme={getTheme()} style={styles.NavigationBar}>
            {/* // <NavigationContainer theme={AppColors()}> */}
            {getStarted&&(<PopupModal title="Start" onDone={OnDone.bind(this)}/>)}
            
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                // tabBarIcon: ({ focused, color, size }) => {
                //     let iconName;
                //     if (route.name === 'Home') {
                //         iconName = focused? 'home':'home';
                //         return <MaterialIcons name={iconName} size={size} color={color} />;
                //     } else if (route.name === 'Facilty') {
                //         iconName = focused ? 'ios-list-box' : 'ios-list';
                //         return <Ionicons name={iconName} size={size} color={color} />;
                //     }else if (route.name === 'Favourites') {
                //         iconName = focused ? 'star' : 'star-border';
                //         return <MaterialIcons name={iconName} size={size} color={color} />;
                //     }else if (route.name === 'My Account') {
                //         iconName = focused ? 'person' : 'person-outline';
                //         return <MaterialIcons name={iconName} size={size} color={color} />;
                //     }
                //     else if (route.name === 'Messages') {
                //         iconName = focused ? 'message' : 'message';
                //         return <MaterialIcons name={iconName} size={size} color={color} />;
                //     }
                //     // You can return any component that you like here!
                //     //   return <Ionicons name={iconName} size={size} color={color} />;
                // },
            })}
            tabBarOptions={{
                activeBackgroundColor:theme.colors.sportColor,
                inactiveBackgroundColor:theme.colors.sportColor,
                backgroundColor:theme.colors.sportColor,
                activeTintColor: theme.colors.yellowColor,
                inactiveTintColor: theme.colors.background,
                labelStyle: {
                    fontSize: 12,
                    margin:10,paddingBottom:5,
                },
                style: {paddingTop:10,
                    height: 50,
                    backgroundColor: theme.colors.sportColor,
                },
                
            }}
            >
            
            <Tab.Screen name="Home" children={()=><HomeScreen User={userProfile} />}/>
            <Tab.Screen name="Facilty" children={()=><FacilityScreen User={userProfile} />}/>
            {/* <Tab.Screen name="Events" component={EventScreen}/> */}
            <Tab.Screen name="Favourites" children={()=><HomeScreen User={userProfile} />}/>
            <Tab.Screen name="My Account" children={()=><AccountScreen User={userProfile} />}/>
            
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
        