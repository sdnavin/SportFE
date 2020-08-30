import React, { Component } from 'react'
import { Alert,View,Text, StyleSheet, SafeAreaView,TouchableOpacity, TextInput } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as UIElements from '../Tools/UIElements';
import { colors } from '../constants/AppColors';



  
export default class FilterBar extends Component {
    state = {
        location: global.location,
        shortAddress:global.shortAddress,
        showOption:0,
    };
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };
        onChangeText(text){
            console.log(text);
        }
        render() {
            return (
                <SafeAreaView  style={styles.header} >
                {this.state.showOption===0 &&
                    
                    <View style={styles.safearea}>
                    <View style={styles.detectlocation}>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.setState({showOption:1})}>
                    <Text>{this.state.location==undefined?"Detect my Location":this.state.shortAddress}</Text>
                    {UIElements.drawGapH(10)}
                    <IonIcon style={{marginTop:5}} name="ios-arrow-down" size={18} color='black'/>
                    </TouchableOpacity>
                   
                    </View>
                    {UIElements.drawGapH('42%')}
                    
                    {/* <TouchableOpacity onPress={()=>this.setState({showOption:1})}>
                    <View style={styles.searchIcon}>
                    <IonIcon name="ios-search" size={18} color='black'/>
                    </View></TouchableOpacity> */}
                    
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Filter')}>
                    <View style={styles.filterIcon}>
                    <IonIcon name="ios-options" size={20} color='black'/>
                    </View></TouchableOpacity>
                    </View>
                }
                {this.state.showOption===1 &&
                    
                    <View style={styles.safearea}>
                    <View style={styles.searchIcon}>
                    <IonIcon name="ios-search" size={20} color='black'/>
                    </View>
                    <TextInput
                    style={{ margin:5,borderColor: 'gray', borderWidth: 0.5,borderRadius:10,flex:1 }} 
                    editable
                    onChangeText={text => this.onChangeText(text)}
                    />
                    <TouchableOpacity onPress={()=>this.setState({showOption:0})}>
                    <View style={styles.filterIcon}>
                    <IonIcon name="ios-close-circle-outline" size={22} color='black'/>
                    </View></TouchableOpacity>
                    </View>
                }
                </SafeAreaView>
                )
            }
        }
        const styles=StyleSheet.create({
            header:{
                height:50,backgroundColor:colors.sportColor,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                // borderWidth:2,
                elevation: 5,
            },
            safearea:{
                flex:1,flexDirection:'row',alignContent:'center',
                height:50,width:'100%',
            },
            detectlocation:{
                flexDirection:'row',
                alignSelf:'center',justifyContent:'center',
                padding:10,marginLeft:10,
               flex:1,
            },
            searchIcon:{
                padding:10,
                // marginRight:'3%',
                // marginEnd:"3%",
            },
            filterIcon:{
                flexDirection:'row-reverse',
                padding:10,
                
            }
        })
        