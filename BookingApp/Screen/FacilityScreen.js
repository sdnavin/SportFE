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
export default function FacilityScreen(props) {
    const theme = useTheme();
    return <FacilityScreenf {...props} theme={theme} />;
}


class FacilityScreenf extends Component {
    render() {
        const { theme } = this.props;
        return (
            <>
            <Stack.Navigator initialRouteName="FaciltyContent"
            // screenOptions={{
            //     headerShown: false,
            // }}
            >
            <Stack.Screen name="FaciltyContent" children={()=><FacilityContent User={this.props.User} />} options={{
                headerMode:'none',headerShown: false,cardStyle: { backgroundColor:theme.colors.background},
            }} />
            <Stack.Screen name="Filter" children={()=><FilterPage User={this.props.User}/>} options={{
                headerMode:'none',headerShown: false,cardStyle: { backgroundColor:theme.colors.background},
            }}  />
            <Stack.Screen name="Reserve" children={({route})=><Reservation {...this.props} facilityInfo={route.params.facilityInfo} User={this.props.User}/>}
            options={({ route }) => ({ title: route.params.facilityInfo.name,headerStyle: {
                backgroundColor: theme.colors.sportColor,
              },cardStyle: { backgroundColor:theme.colors.background}, })} />

            </Stack.Navigator>
           
            </>
            );
        }
    }
    