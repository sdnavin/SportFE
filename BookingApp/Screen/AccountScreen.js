import { useTheme } from '@react-navigation/native';
import React, { Component } from 'react'
import {ScrollView } from 'react-native'
import { Text } from 'react-native-elements';
import HeaderTitle from './HeaderTitle'

// Wrap and export
export default function AccountScreen(props) {
    const theme = useTheme();
    return <AccountScreenf {...props} theme={theme} />;
}

class AccountScreenf extends Component {

    constructor(props){
        super(props);
        
    }
    render() {
        const { theme,User} = this.props;

        return (
            <>
               <HeaderTitle User={User}/>
                <ScrollView style={{backgroundColor:theme.colors.background,padding:10}}>
                <Text style={{color:theme.colors.text}}> Name</Text>
                <Text style={{color:theme.colors.text,fontWeight:'bold',fontSize:20}}>{User.fullName}</Text>

                <Text style={{color:theme.colors.text}}> Email</Text>
                <Text style={{color:theme.colors.text,fontWeight:'bold',fontSize:20}}>{User.email}</Text>

                <Text style={{color:theme.colors.text}}> Phone Number</Text>
                <Text style={{color:theme.colors.text,fontWeight:'bold',fontSize:20}}>{User.mobile}</Text>


               </ScrollView>

            </>
        )
    }
}
