import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import colors from '../constants/AppColors'
import * as UIElements from '../Tools/UIElements'
export default class StartBanner extends Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        return (
            <>
            <View style={{backgroundColor:colors.sportColor,borderRadius:20,height:150,overflow:'hidden'}} >
            <Text style={{padding:20,fontSize:20,fontWeight:'500'}}>Havnt got your ground yet?</Text>
            {UIElements.drawGapV(35)}
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Facilty')}}
            style={{alignContent:'flex-end',width:'100%',height:50,backgroundColor:colors.blackTransparent}}>
                <Text
                style={{alignSelf:'flex-end',padding:15,fontSize:16,color:'white',fontWeight:'bold'}}>Book here</Text>
            </TouchableOpacity>
            </View>
            </>
        )
    }
}
