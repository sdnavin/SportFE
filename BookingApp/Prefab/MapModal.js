import React, { Component } from 'react';
import {Image, View,Modal,StyleSheet,Dimensions,Text,Platform,Alert,TouchableOpacity} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as Auth from '../Prefab/Authentication'
import getAppTheme, { colors, appTheme } from '../constants/AppColors';
import { color } from 'react-native-reanimated';
import AppColors from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements'
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Api from '../constants/ApiLink';

export default class MapModal extends Component {
    
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.state={
            val:'',
            pages:0,
            showError:false,
            visible:true,
            region: {
                latitude:25.287761,
                longitude: 51.518809,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            location: {
                "coords": 
                {
                    "accuracy": 20, "altitude": 5, "heading": 0, "latitude": 25.287761, "longitude":  51.518809, "speed": 0}
                    , "mocked": false, "timestamp": 1598873885000
                },
                shortAddress:''
            }
            this.getAddressFromCoordinates=this.getAddressFromCoordinates.bind(this);
            this.onRegionChange=this.onRegionChange.bind(this);
            this.onMarkerChange=this.onMarkerChange.bind(this);
            this.signMeUp=this.signMeUp.bind(this);
        }
        getAddressFromCoordinates( latitude, longitude ) {
            return new Promise((resolve) => {
              const url =Api.reverseCode.replace("LATLONG",latitude+","+longitude)+Api.googleApiKey;
              console.log(url)

              fetch(url)
                .then(res => res.json())
                .then((resJson) => {
                    console.log(resJson.results[0].formatted_address);
                    this.setState({shortAddress:resJson.results[0].formatted_address});
                    global.shortAddress=resJson.results[0].formatted_address;

                })
                .catch((e) => {
                  console.log('Error in getAddressFromCoordinates', e)
                  resolve()
                })
            })
          }
        
        findCoordinates = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // const location = JSON.stringify(position);
                    console.log(position);
                    this.setState({ location:(position) });
                    this.getAddressFromCoordinates(this.state.location.coords.latitude,this.state.location.coords.longitude);
                    global.location=position;
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            };
            componentDidMount(){
                this.findCoordinates();
            }
            
            signMeUp(){
                console.log("clcil")
                this.setState({pages:1});
            }
            onRegionChange(region) {

                this.setState({ region });
              }
              onMarkerChange(marker){

                console.log(marker.nativeEvent.coordinate);
                console.log(marker.nativeEvent.position);

                this.getAddressFromCoordinates(marker.nativeEvent.coordinate.latitude,marker.nativeEvent.coordinate.longitude);
                this.setState({ location: {
                    "coords": 
                    {
                        "accuracy": 20, "altitude": 5,
                         "heading": 0,
                          "latitude": marker.nativeEvent.coordinate.latitude,
                           "longitude": marker.nativeEvent.coordinate.longitude
                        , "speed": 0
                    }
                        , "mocked": false, "timestamp": 1598873885000
                    },
                });

              }
            
            render() {
                return (
                    <Modal  transparent = {false} visible={this.state.visible}>
                    <AppColors/>
                    
                    {/* <MapView
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    >
                    {this.state.markers.map(marker => (
                        <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        />
                        ))}
                        </MapView> */}
                        <MapView
                        style={{width:'100%',height:'100%'}}
                        // showsUserLocation //to show user current location when given access
                        loadingEnabled //to show loading while map loading
                        initialRegion={this.state.region}
                        onRegionChange={this.onRegionChange}
                        >
                        <Marker
                        draggable
                        onDragEnd={this.onMarkerChange}
                        coordinate={{latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,}}
                            title={"Home"}
                            pinColor={Colors.sportColor}
                            />
                            
                            
                            </MapView>
                            
                            {/* <View style={{backgroundColor: colors.sportColor,height:'100%',width:'100%',}}> */}
                            <View style={styles.bottomMenu}>
                            {UIElements.drawGapV(20)}
                            <View style={{flex:1,flexDirection:'row'}}>
                            <Ionicons name={(Platform.OS === "ios" ? "ios" : "md")+"-locate"} size={30} />
                            {UIElements.drawGapH(10)}
                            
                            <View>
                            <Text style={{color:appTheme.colors.text,fontSize:14}} >Set your House Location</Text>
                            {UIElements.drawGapV(20)}
                            <Text style={{color:appTheme.colors.text,width:200,fontSize:13}}>{this.state.shortAddress==''?'Location':this.state.shortAddress}</Text>
                            {UIElements.drawGapV(10)}
                            <TouchableOpacity onPress={()=>this.OnSubmit()} >
                            <Image style={{width:45,height:45}}  source={require('../assets/Asset3.png')}></Image></TouchableOpacity>
                            {UIElements.drawGapV(10)}
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
                    