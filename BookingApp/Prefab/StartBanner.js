import { useNavigation, useTheme } from '@react-navigation/native';
import { constants } from 'buffer';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {colors,appTheme } from '../constants/AppColors'
import * as UIElements from '../Tools/UIElements'

export default function StartBanner(props){
    const theme = useTheme();
    const navigation = useNavigation();

    return <StartBannerF {...props} theme={theme} navigation={navigation}/>;
}

class StartBannerF extends Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        const {theme} =this.props;
        return (
            <>
            <View style={{backgroundColor:colors.sportColor,borderRadius:20,height:150,overflow:'hidden',margin:10}} >
            <Text style={{padding:20,fontSize:20,fontWeight:'500',color:theme.colors.text}}>Havnt got your ground yet?</Text>
            {UIElements.drawGapV(35)}
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Facilty')}}
            style={{alignContent:'flex-end',width:'100%',height:50,backgroundColor:colors.blackTransparent}}>
                <Text
                style={{alignSelf:'flex-end',padding:15,fontSize:16,fontWeight:'bold',color:theme.colors.text}}>Book here</Text>
            </TouchableOpacity>
            </View>
            </>
        )
    }
}
