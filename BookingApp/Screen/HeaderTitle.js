import React, { Component } from 'react'
import { SafeAreaView,View } from 'react-native'
import { colors } from '../constants/AppColors'
import { Text } from 'react-native-elements'

export default class HeaderTitle extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={{backgroundColor:colors.sportColor,height:50,width:"100%"}}>
                <Text>
                    Hello
                </Text>
                <Text>
                    {/* {this.props.user.fullname} */}
                </Text>
                </View>
            </SafeAreaView>
        )
    }
}
