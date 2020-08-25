import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import FilterPage from '../Prefab/FilterPage';
import { createStackNavigator } from '@react-navigation/stack';

import FacilityContent from './FacilityContent';

const Stack = createStackNavigator();

FacilityList=[{'name':'Bidda Ground','location':'Al Bidda Park','games':['FootBall','Cricket','Hockey','HandBall']},
{'name':'Wakra Port Ground','location':'Al Wakra Port','games':['FootBall','Hockey','HandBall']}];

export default class FacilityScreen extends Component {
    render() {
        return (
            <>
            <Stack.Navigator initialRouteName="FaciltyContent"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="FaciltyContent" component={FacilityContent} />
            <Stack.Screen name="Filter" component={FilterPage} />
            </Stack.Navigator>
           
            </>
            );
        }
    }
    