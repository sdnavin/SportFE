import React, { Component, useState,useCallback,useMemo } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,TextInput,TouchableOpacity,FlatList,Alert, Button} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Authentication, * as Auth from '../Prefab/Authentication'
import * as UIElements from '../Tools/UIElements'
// import MapModal from './MapModal';
import games from '../constants/sportDetails'
import { ScrollView } from 'react-native-gesture-handler';

import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
import Api from '../constants/ApiLink';
import { Buffer } from 'buffer';
import { useTheme } from '@react-navigation/native';

const { colors } = useTheme();

const configs = {
    identityserver: {
        // issuer: 'https://demo.account.sportfe.com/',
        // clientId: 'QA.Sport.AdminPanel',
        // clientSecret : '#QA.Sport.FA.AdminPanel#',
        // redirectUrl: 'https://demo.facadmin.sportfe.qa/signin-oidcr',
        // scopes: ['openid','profile','roles','email','facilityid','QA.Sport.Admin.Api']
        
        issuer: 'https://demo.account.sportfe.com',
        clientId: 'QA.SportFE.Adroid',
        clientSecret: 'qa#sportfe#android',
        redirectUrl: 'io.identityserver.demo:/oauthredirect',
        scopes: ['openid', 'profile', 'roles', 'offline_access'],
        clientAuthMethod: 'post',
        additionalParameters: {
            // prompt: 'login'
        },
        
        // issuer: 'https://demo.identityserver.io',
        // clientId: 'interactive.public',
        // redirectUrl: 'io.identityserver.demo:/oauthredirect',
        // additionalParameters: {},
        // scopes: ['openid', 'profile', 'email', 'offline_access'],
        
        // serviceConfiguration: {
        //   authorizationEndpoint: 'https://demo.account.sportfe.com/',
        //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
        //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
        // }
    },
    auth0: {
        // From https://openidconnect.net/
        issuer: 'https://samples.auth0.com',
        clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
        redirectUrl: 'https://openidconnect.net/callback',
        additionalParameters: {
            // prompt: 'login'
        },
        scopes: ['openid', 'profile', 'email', 'phone', 'address'],
        
        serviceConfiguration: {
            authorizationEndpoint: 'https://samples.auth0.com/authorize',
            tokenEndpoint: 'https://samples.auth0.com/oauth/token',
            revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
        }
    }
};

const defaultAuthState = {
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',idToken:'',idTokenJSON:''
};

const PopupModal=(props) =>{
    
    //Authendication
    
    
    const [authState, setAuthState] = useState(defaultAuthState);
    React.useEffect(() => {
        prefetchConfiguration({
            warmAndPrefetchChrome: true,
            ...configs.identityserver
        });
    }, []);
    
    const handleAuthorize = useCallback(
        async provider => {
            try {
                const config = configs[provider];
                
                const newAuthState = await authorize(config);
                
                setAuthState({
                    hasLoggedInOnce: true,
                    provider: provider,
                    ...newAuthState
                });
            } catch (error) {
                Alert.alert('Failed to log in', error.message);
            }
        },
        [authState]
        );
        
        const handleRefresh = useCallback(async () => {
            try {
                const config = configs[authState.provider];
                const newAuthState = await refresh(config, {
                    refreshToken: authState.refreshToken
                });
                
                setAuthState(current => ({
                    ...current,
                    ...newAuthState,
                    refreshToken: newAuthState.refreshToken || current.refreshToken
                }))
                
            } catch (error) {
                Alert.alert('Failed to refresh token', error.message);
            }
        }, [authState]);
        
        const handleRevoke = useCallback(async () => {
            try {
                const config = configs[authState.provider];
                await revoke(config, {
                    tokenToRevoke: authState.accessToken,
                    sendClientId: false
                });
                
                setAuthState({
                    provider: '',
                    accessToken: '',
                    accessTokenExpirationDate: '',
                    refreshToken: ''
                });
            } catch (error) {
                Alert.alert('Failed to revoke token', error.message);
            }
        }, [authState]);
        
        const showRevoke = useMemo(() => {
            if (authState.accessToken) {
                const config = configs[authState.provider];
                if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
                    return true;
                }
            }
            return false;
        }, [authState]);
        
        
        ///
        
        // constructor(props){
        //     super(props);
        // this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            pages:0,
            showError:false,
            gamesIn:games,
            visible:true,showMap:false,
            
            hasLoggedInOnce: false,
            provider: "",
            accessToken: "",
            accessTokenExpirationDate: "",
            refreshToken: ""
            
        }
        //     this.signMeUp=this.signMeUp.bind(this);
        //     this.updateSelection=this.updateSelection.bind(this);
        // }
        
        
        
        //
        const changeHappened =()=>{
        }
        
        const componentDidMount=()=>{
        }
        
        const [pages, setPage] = useState(0);
        const [visible, setVisible] = useState(true);
        
        const signMeUp=()=>{
            setPage(1);
        }
        const login=()=>{
            handleAuthorize('identityserver');
        }
        const [gamesIn, setGames] = useState(games);
        
        const GetPage=()=>{
            if(pages==0){
                return(
                    <>
                    {UIElements.drawGapV(20)}
                    {/* <Text style={styles.heading}>Start Booking the Facilties and Events</Text> */}
                    <TextInput style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor}]} placeholder="Name" placeholderTextColor={colors.text} ></TextInput>
                    {UIElements.drawGapV(20)}
                    
                    <TextInput style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor}]} placeholder="Email" placeholderTextColor={colors.text} ></TextInput>
                    {UIElements.drawGapV(10)}
                    <Text >OR</Text>
                    {UIElements.drawGapV(10)}
                    
                    <TextInput style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor}]} placeholder="Phone" placeholderTextColor={colors.text} ></TextInput>
                    {UIElements.drawGapV(20)}
                    <TouchableOpacity onPress={()=>{signMeUp()}} >
                    <Image style={{width:40,height:40}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                    {UIElements.drawGapV(20)}
                    
                    <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{color:colors.text}}>Already have an Account? </Text>
                    <Text style={{color:colors.sportColor,textDecorationLine:'underline'}} onPress={()=>{login()}} >Login</Text>
                    </View> 
                    {UIElements.drawGapV(5)}
                    </>
                    );
                }
                else if(pages==1){
                    return(
                        <View style={{alignContent:'center',margin:20}}>
                        {UIElements.drawGapV(20)}
                        
                        <Text>We have send you, 6 digit verification code (OTP) to your email and Phone number</Text>
                        {UIElements.drawGapV(20)}
                        
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}} >
                        <TextInput textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0, width:45,height:45}]} ></TextInput>
                        <TextInput textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                        <TextInput  textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                        <TextInput textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                        <TextInput textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                        <TextInput textAlign={'center'}  style={[styles.inputBox,{color:colors.text,borderColor:colors.sportColor,fontSize:25,padding:0,width:45,height:45}]} ></TextInput>
                        </View>
                        {UIElements.drawGapV(20)}
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}} >
                        
                        <TouchableOpacity onPress={()=>{setPage(0)}} >
                        <Image style={{width:45,height:45}}  source={require('../assets/Asset5.png')}></Image></TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{setPage(2)}} >
                        <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                        
                        </View>
                        {UIElements.drawGapV(20)}
                        <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                        <Text style={{color:colors.text}}>Didn't received the OTP? </Text>
                        <Text style={{color:colors.sportColor}} onPress={()=>{}} >Resend Code</Text>
                        </View> 
                        </View>
                        );
                    }else if(pages==2){
                        return(<View></View>
                            // <MapModal onDone={OnDone.bind(this)}/>
                            );
                        }else if(pages==3){
                            return(
                                <View style={{alignContent:'center',margin:20}}>
                                {UIElements.drawGapV(10)}
                                
                                <Text style={{alignSelf:'center',color:colors.text}} >Choose your Favourite Sports</Text>
                                {UIElements.drawGapV(20)}
                                
                                <ScrollView  horizontal
                                >
                                <FlatList
                                data={gamesIn}
                                renderItem={({ item,index}) => (
                                    <TouchableOpacity onPress={()=>{updateSelection(index)}}
                                    style={{ flexDirection: 'column', borderColor:(item.selected?colors.sportColor: colors.text), margin: 5,borderWidth:1,borderRadius:10,width:70,height:70,justifyContent:'center' }}>
                                    <Image
                                    source={item.image}
                                    style={{ width: 40 , height: 40,tintColor:(item.selected?colors.sportColor: colors.text),alignSelf:'center' }}
                                    />
                                    <Text style={{alignSelf:'center',fontSize:10,color:(item.selected?colors.sportColor: colors.text)}}>{item.name}</Text>
                                    </TouchableOpacity>
                                    )
                                }
                                //Setting the number of column
                                numColumns={5}
                                keyExtractor={(item, index) => index.toString()}
                                />
                                </ScrollView>
                                
                                {UIElements.drawGapV(20)}
                                
                                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{OnSubmit()}} >
                                <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                                </View>
                                );
                            }
                        }
                        const OnDone=()=>{
                            setPage(3);
                        }
                        
                        const updateSelection=(index)=>{
                            // const { gamesIn } = this.state;
                            gamesIn[index].selected =!gamesIn[index].selected;
                            
                            setGames(gamesIn);
                            
                        }
                        const OnSubmit=()=>{
                            var isdone=props.onDone;
                            isdone();
                            // this.setState({visible:false});
                            setVisible(false);
                        }
                        const getToken=()=>{
                            jwtBody = authState.idToken.split('.')[1];
                            base64 = jwtBody.replace('-', '+').replace('_', '/');
                            decodedJwt = Buffer.from(base64, 'base64');
                            authState.idTokenJSON = JSON.parse(decodedJwt);
                            return(
                                <Text>{JSON.stringify(authState.idTokenJSON)}</Text>
                                )
                            }
                            
                            // render() {
                            return (
                                <Modal transparent = {false} visible={visible}>
                                <>
                                {!!authState.accessToken ? (
                                    <>
                                    <Text>accessToken</Text>
                                    <Text>{authState.accessToken}</Text>
                                    <Text>idToken</Text>
                                    <Text>{getToken()}</Text>
                                    <Text>accessTokenExpirationDate</Text>
                                    <Text>{authState.accessTokenExpirationDate}</Text>
                                    <Text>refreshToken</Text>
                                    {<Text>{authState.refreshToken}</Text>}
                                    <Text>scopes</Text>
                                    <Text>{authState.scopes.join(', ')}</Text>
                                    </>
                                    ) : (
                                        <Text>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello stranger'}</Text>
                                        )}
                                        
                                        <>
                                        {!authState.accessToken ? (
                                            <>
                                            <Button
                                            onPress={() => handleAuthorize('identityserver')}
                                            title="Authorize IdentityServer"
                                            color="#DA2536"
                                            />
                                            <Button
                                            onPress={() => handleAuthorize('auth0')}
                                            title="Authorize Auth0"
                                            color="#DA2536"
                                            />
                                            </>
                                            ) : null}
                                            {!!authState.refreshToken ? (
                                                <Button onPress={handleRefresh} title="Refresh" color="#24C2CB" />
                                                ) : null}
                                                {showRevoke ? (
                                                    <Button onPress={handleRevoke} title="Revoke" color="#EF525B" />
                                                    ) : null}
                                                    </>
                                                    </>
                                                    
                                                    
                                                    {/* <AppColors/> */}
                                                    <View style={{backgroundColor: colors.sportColor,height:'100%',width:'100%',}}>
                                                    <Image style={{alignSelf:'center',top:50,width:(564*0.4),height:(264*0.4)}}  source={require('../assets/Asset1.png')}></Image>
                                                    <View style={{position:'absolute',transform:[{translateY:height/3.05}],right:0,height:5,width:'60%',backgroundColor:colors.yellowColor}}></View>
                                                    <View style={[styles.bottomMenu,{backgroundColor:colors.background}]}>
                                                    {GetPage()}
                                                    {/* <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text style={{fontWeight:'800'}} >Get Started</Text></TouchableOpacity> */}
                                                    {/* <TouchableOpacity style={styles.startBut} onPress={Auth.handleAuthorize}><Text>Sign In</Text></TouchableOpacity> */}
                                                    {/* <TouchableOpacity style={styles.startBut} onPress={this.OnSubmit}><Text>Sign Up</Text></TouchableOpacity> */}
                                                    
                                                    </View>
                                                    <View style={{left:0,position:'absolute',transform:[{translateY:height/1.275}],height:5,width:'60%',backgroundColor:colors.yellowColor}}></View>
                                                    </View>
                                                    </Modal>
                                                    )
                                                    // }
                                                    
                                                }
                                                export default PopupModal;
                                                const styles = StyleSheet.create({
                                                    MainContainer:{
                                                        flex:1,
                                                        width:'100%',
                                                        alignSelf:'center'
                                                    },
                                                    inputBox:{
                                                        justifyContent:'center',
                                                        // color:colors.text,
                                                        // borderColor:colors.sportColor,
                                                        padding:10,borderWidth:1,borderRadius:10, backgroundColor:colors.background,
                                                        width:'85%'},
                                                        heading:{
                                                            fontSize:30,
                                                            fontWeight:'bold',
                                                            padding:20
                                                        },
                                                        bottomMenu:{
                                                            position:'absolute',
                                                            transform:[{translateX:0},{translateY:height/3}],
                                                            width:'100%',shadowColor: "#000",
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 2,
                                                            },
                                                            shadowOpacity: 0.25,
                                                            shadowRadius: 10,
                                                            elevation: 5,justifyContent:'center',alignItems:'center',height:height/2.22
                                                        },
                                                       
                                                        
                                                    });
                                                    