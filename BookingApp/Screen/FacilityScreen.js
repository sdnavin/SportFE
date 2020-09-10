import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import FilterPage from '../Prefab/FilterPage';
import { createStackNavigator } from '@react-navigation/stack';

import FacilityContent from './FacilityContent';
import Reservation from './Reservation';
import { Header } from 'react-native/Libraries/NewAppScreen';
import AppColors, { colors, appTheme } from '../constants/AppColors';
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();
// Wrap and export
export default function(props) {
    const theme = useTheme();
    return <FacilityScreen {...props} theme={theme} />;
}


class FacilityScreen extends Component {
    render() {
        const { colors } = this.props;
        return (
            <>
            <Stack.Navigator initialRouteName="FaciltyContent"
            // screenOptions={{
            //     headerShown: false,
            // }}
            >
            <Stack.Screen name="FaciltyContent" component={FacilityContent} options={{
                headerMode:'none',headerShown: false,cardStyle: { backgroundColor:colors.background},
            }} />
            <Stack.Screen name="Filter" component={FilterPage} options={{
                headerMode:'none',headerShown: false,cardStyle: { backgroundColor:colors.background},
            }}  />
            <Stack.Screen name="Reserve" component={Reservation}
            options={({ route }) => ({ title: route.params.facilityInfo.name,headerStyle: {
                backgroundColor: colors.sportColor,
              },cardStyle: { backgroundColor:colors.background}, })} />

            </Stack.Navigator>
           
            </>
            );
        }
    }
    