import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import FilterPage from '../Prefab/FilterPage';
import { createStackNavigator } from '@react-navigation/stack';

import FacilityContent from './FacilityContent';
import Reservation from './Reservation';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();



export default class FacilityScreen extends Component {
    render() {
        return (
            <>
            <Stack.Navigator initialRouteName="FaciltyContent"
            // screenOptions={{
            //     headerShown: false,
            // }}
            >
            <Stack.Screen name="FaciltyContent" component={FacilityContent} options={{
                headerMode:'none',headerShown: false,
            }} />
            <Stack.Screen name="Filter" component={FilterPage} options={{
                headerMode:'none',headerShown: false,
            }}  />
            <Stack.Screen name="Reserve" component={Reservation}
            options={({ route }) => ({ title: route.params.facilityInfo.name })} />

            </Stack.Navigator>
           
            </>
            );
        }
    }
    