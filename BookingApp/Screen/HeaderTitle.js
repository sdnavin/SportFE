import React, { Component } from 'react'
import { SafeAreaView,View } from 'react-native'
import { colors } from '../constants/AppColors'
import { Text } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';


// Wrap and export
export default function HeaderTitle(props) {
    const theme = useTheme();
    return <HeaderTitlef {...props} theme={theme} />;
}

class HeaderTitlef extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { theme,User } = this.props;
        return (
            <SafeAreaView>
                <View style={{backgroundColor:theme.colors.sportColor,height:60,width:"100%"}}>
                <Text style={{alignSelf:'flex-end',color:'white',fontWeight:'bold',fontSize:18,marginTop:5,marginRight:10}}>
                    Hello!
                </Text>
                {(User!=null)&&<Text style={{alignSelf:'flex-end',color:'white',fontWeight:'bold',fontSize:18,marginTop:5,marginRight:10}}>
                    {User.fullName}
                </Text>}
                <Text>
                    {/* {this.props.user.fullname} */}
                </Text>
                </View>
            </SafeAreaView>
        )
    }
}
