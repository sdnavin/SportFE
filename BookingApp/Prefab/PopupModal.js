import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity,FlatList} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as Auth from '../Prefab/Authentication'
import getAppTheme, { colors, appTheme } from '../constants/AppColors';
import { color } from 'react-native-reanimated';
import AppColors from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements'
import MapModal from './MapModal';
import games from '../constants/sportDetails'
export default class PopUpModal extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            pages:0,
            showError:false,
            gamesIn:games,
            visible:true,showMap:false,
        }
        this.signMeUp=this.signMeUp.bind(this);
        this.updateSelection=this.updateSelection.bind(this);
    }
    changeHappened(){
    }
    
    componentDidMount(){
    }
    
    signMeUp(){
        console.log("clcil")
        this.setState({pages:1});
    }
    
    GetPage(){
        if(this.state.pages==0){
            return(
                <>
                {UIElements.drawGapV(20)}
                {/* <Text style={styles.heading}>Start Booking the Facilties and Events</Text> */}
                <TextInput style={styles.inputBox} placeholder="Name" placeholderTextColor={appTheme.colors.text} ></TextInput>
                {UIElements.drawGapV(20)}
                
                <TextInput style={styles.inputBox} placeholder="Email" placeholderTextColor={appTheme.colors.text} ></TextInput>
                {UIElements.drawGapV(10)}
                <Text >OR</Text>
                {UIElements.drawGapV(10)}
                
                <TextInput style={styles.inputBox} placeholder="Phone" placeholderTextColor={appTheme.colors.text} ></TextInput>
                {UIElements.drawGapV(20)}
                <TouchableOpacity onPress={()=>{this.signMeUp()}} >
                <Image style={{width:40,height:40}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                {UIElements.drawGapV(20)}
                
                <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{color:appTheme.colors.text}}>Already have an Account? </Text>
                <Text style={{color:colors.sportColor,textDecorationLine:'underline'}} onPress={()=>{}} >Login</Text>
                </View> 
                {UIElements.drawGapV(5)}
                </>
                );
            }
            else if(this.state.pages==1){
                return(
                    <View style={{alignContent:'center',margin:20}}>
                    {UIElements.drawGapV(20)}
                    
                    <Text>We have send you, 6 digit verification code (OTP) to your email and Phone number</Text>
                    {UIElements.drawGapV(20)}
                    
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}} >
                    <TextInput textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0, width:45,height:45}]} ></TextInput>
                    <TextInput textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                    <TextInput  textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                    <TextInput textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                    <TextInput textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                    <TextInput textAlign={'center'}  style={[styles.inputBox,{fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                    </View>
                    {UIElements.drawGapV(20)}
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}} >
                    
                    <TouchableOpacity onPress={()=>{this.signMeUp}} >
                    <Image style={{width:45,height:45}}  source={require('../assets/Asset5.png')}></Image></TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{this.setState({pages:2})}} >
                    <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                    
                    </View>
                    {UIElements.drawGapV(20)}
                    <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                    <Text style={{color:appTheme.colors.text}}>Didn't received the OTP? </Text>
                    <Text style={{color:colors.sportColor}} onPress={()=>{}} >Resend Code</Text>
                    </View> 
                    </View>
                    );
                }else if(this.state.pages==2){
                    return(
                        <MapModal onDone={this.OnDone.bind(this)}/>
                        );
                    }else if(this.state.pages==3){
                        return(
                            <View style={{alignContent:'center',margin:20}}>
                            {UIElements.drawGapV(10)}
                            
                            <Text style={{alignSelf:'center',color:appTheme.colors.text}} >Choose your Favourite Sports</Text>
                            {UIElements.drawGapV(20)}
                                
                                <View style={styles.MainContainer}>
                                <FlatList
                                data={this.state.gamesIn}
                                renderItem={({ item,index}) => (
                                    <TouchableOpacity onPress={()=>{this.updateSelection(index)}}
                                     style={{ flexDirection: 'column', borderColor:(item.selected?colors.sportColor: appTheme.colors.text), margin: 5,borderWidth:1,borderRadius:10,width:70,height:70,justifyContent:'center' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 40 , height: 40,tintColor:(item.selected?colors.sportColor: appTheme.colors.text),alignSelf:'center' }}
                                    />
                                    <Text style={{alignSelf:'center',fontSize:10,color:(item.selected?colors.sportColor: appTheme.colors.text)}}>{item.name}</Text>
                                    </TouchableOpacity>
                                    )
                                }
                                    numRows={4}
                                    //Setting the number of column
                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                    />
                                    </View>
                                    
                                    {UIElements.drawGapV(20)}
                                    
                                    <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.OnSubmit()}} >
                                    <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                                    </View>
                                    );
                                }
                            }
                            OnDone(){
                                this.setState({pages:3});
                            }
                            
                            render() {
                                return (
                                    <Modal  transparent = {false} visible={this.state.visible}>
                                    <AppColors/>
                                    <View style={{backgroundColor: colors.sportColor,height:'100%',width:'100%',}}>
                                    <Image style={{alignSelf:'center',top:50,width:(564*0.4),height:(264*0.4)}}  source={require('../assets/Asset1.png')}></Image>
                                    <View style={styles.bottomMenu}>
                                    {this.GetPage()}
                                    {/* <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text style={{fontWeight:'800'}} >Get Started</Text></TouchableOpacity> */}
                                    {/* <TouchableOpacity style={styles.startBut} onPress={Auth.handleAuthorize}><Text>Sign In</Text></TouchableOpacity> */}
                                    {/* <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text>Sign Up</Text></TouchableOpacity> */}
                                    
                                    </View>
                                    </View>
                                    </Modal>
                                    )
                                }
                                updateSelection(index){
                                    const { gamesIn } = this.state;
                                    gamesIn[index].selected =!gamesIn[index].selected;
                                
                                    // update state
                                    this.setState({
                                        gamesIn,
                                    });
                                 
                                }
                                OnSubmit(){
                                    var isdone=this.props.onDone;
                                    isdone();
                                    this.setState({visible:false});
                                }
                            }
                            
                            const styles = StyleSheet.create({
                                MainContainer:{
                                    flex:1,
                                    width:'90%',
                                    alignSelf:'center'
                                },
                                inputBox:{
                                    justifyContent:'center',
                                    color:appTheme.colors.text,borderColor:colors.sportColor,
                                    padding:10,borderWidth:1,borderRadius:10, backgroundColor:appTheme.colors.background,
                                    width:'85%'},
                                    heading:{
                                        fontSize:30,
                                        fontWeight:'bold',
                                        padding:20
                                    },
                                    bottomMenu:{
                                        position:'absolute',
                                        transform:[{translateX:0},{translateY:height/3}],
                                        backgroundColor:appTheme.colors.background,
                                        width:'100%',shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 10,
                                        elevation: 5,justifyContent:'center',alignItems:'center'
                                    },
                                    startBut:{
                                        backgroundColor:colors.sportColor,
                                        borderRadius:10,
                                        padding:15,
                                        position:'absolute',
                                        transform:[{translateX:width/1.5},{translateY:150}]
                                    }
                                    
                                });
                                