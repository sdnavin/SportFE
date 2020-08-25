import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as Auth from '../Prefab/Authentication'
import getAppTheme, { colors, appTheme } from '../constants/AppColors';
import { color } from 'react-native-reanimated';
import AppColors from '../constants/AppColors';
export default class PopUpModal extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            showError:false,
            visible:true
        }
    }
    changeHappened(){
        
    }
    
    componentDidMount(){
    }
    
    render() {
        return (
            <Modal  transparent = {false} visible={this.state.visible}>
                <AppColors/>
            <View style={{backgroundColor: colors.appcolor,height:'100%',width:'100%',}}>
            <View style={styles.bottomMenu} >
                <Text style={styles.heading}> Start Booking the Facilties and Events</Text>
            <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text>Get Started</Text></TouchableOpacity>
            {/* <TouchableOpacity style={styles.startBut} onPress={Auth.handleAuthorize}><Text>Sign In</Text></TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text>Sign Up</Text></TouchableOpacity> */}

            </View>
            </View></Modal>
            )
        }
        
        OnSubmit(){
            var isdone=this.props.onDone;
            isdone();
            this.setState({visible:false});
        }
    }
    
    const styles = StyleSheet.create({
        heading:{
            fontSize:30,
            fontWeight:'bold',
            padding:20
        },
        bottomMenu:
        {position:'absolute', transform:[{translateX:0},{translateY:height-300}],backgroundColor:appTheme.colors.background,borderRadius:30,width:'100%',height:'100%',shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,},
        startBut:{
            backgroundColor:colors.appcolor,
            borderRadius:10,
            padding:15,
            position:'absolute', transform:[{translateX:width/1.5},{translateY:150}]
        }
        
    });
    