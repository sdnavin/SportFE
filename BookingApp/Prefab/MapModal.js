import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as Auth from '../Prefab/Authentication'
import getAppTheme, { colors, appTheme } from '../constants/AppColors';
import { color } from 'react-native-reanimated';
import AppColors from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements'
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class MapModal extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            pages:0,
            showError:false,
            visible:true
        }
        this.signMeUp=this.signMeUp.bind(this);
    }
    changeHappened(){
        
    }
    
    componentDidMount(){
    }
    
    signMeUp(){
        console.log("clcil")
        this.setState({pages:1});
    }
    
    
    render() {
        return (
            <Modal  transparent = {false} visible={this.state.visible}>
            <AppColors/>
            <MapView style={{width:'100%',height:'100%'}}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            />
            {/* <View style={{backgroundColor: colors.sportColor,height:'100%',width:'100%',}}> */}
            <View style={styles.bottomMenu}>
            {UIElements.drawGapV(20)}
                <View style={{flex:1,flexDirection:'row'}}>
                <Ionicons name={(Platform.OS === "ios" ? "ios" : "md")+"-locate"} size={30} />
                {UIElements.drawGapH(20)}

                <View>
                <Text style={{color:appTheme.colors.text,fontSize:16}} >Set your House Location</Text>
                {UIElements.drawGapV(20)}
                <Text style={{color:appTheme.colors.text}} >Location</Text>
                {UIElements.drawGapV(20)}
                <TouchableOpacity onPress={()=>this.OnSubmit()} >
                    <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                {UIElements.drawGapV(20)}
                    <Text style={{color:appTheme.colors.sportColor}} onPress={()=>this.OnSubmit()} >Skip this Step </Text>
                {UIElements.drawGapV(20)}

                </View>
                {/* </View> */}
            </View>
            </View>
            </Modal>
            )
        }
        
        OnSubmit(){
            var isdone=this.props.onDone;
            isdone();
            this.setState({visible:false});
        }
    }
    
    const styles = StyleSheet.create({
        
        
        bottomMenu:{
            position:'absolute',right:0,
            transform:[{translateX:0},{translateY:height/1.75}],
            backgroundColor:appTheme.colors.background,
            width:'65%',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,justifyContent:'center',alignItems:'center',zIndex:100
        },
        startBut:{
            backgroundColor:colors.sportColor,
            borderRadius:10,
            padding:15,
            position:'absolute',
            transform:[{translateX:width/1.5},{translateY:150}]
        }
        
    });
    