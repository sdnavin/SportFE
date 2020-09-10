import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import HeaderTitle from './HeaderTitle'
import { colors } from '../constants/AppColors'

export default class AccountScreen extends Component {
    render() {
        return (
            <>
               <HeaderTitle/>
                <ScrollView style={{backgroundColor:colors.bgColor}}>

               </ScrollView>

            </>
        )
    }
}
