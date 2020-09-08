import React, { Component } from 'react'
import { SafeAreaView,View } from 'react-native'
import { colors } from '../constants/AppColors'
import { Text } from 'react-native-elements'

export default class HeaderTitle extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={{backgroundColor:colors.sportColor,height:60,width:"100%"}}>
                <Text style={{alignSelf:'flex-end',color:'white',fontWeight:'bold',fontSize:18,marginRight:10}}>
                    Hello!
                </Text>
                <Text>
                    {/* {this.props.user.fullname} */}
                </Text>
                </View>
            </SafeAreaView>
        )
    }
}
