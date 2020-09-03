import React, { Component } from 'react'
import { Alert,View,Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as UIElements from '../Tools/UIElements';
import { colors } from '../constants/AppColors';

import {TouchableOpacity} from 'react-native-gesture-handler'


export default class FilterBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: global.location,
            shortAddress:global.shortAddress,
            showOption:0,searchtext:'',
            suggestions:[],
        };
        this.suggestedOption=this.suggestedOption.bind(this);
    }
    allData=[]
    componentDidMount(){
        let t=0;
        console.log(global.locations.length);
        for(t=0;t<global.locations.length;t++){
            var obj={name:global.locations[t].name,id:global.locations[t].id}
            this.allData.push(obj);
        }
        for(t=0;t<global.sports.length;t++){
            var obj={name:global.sports[t].name,id:global.sports[t].id}
            this.allData.push(obj);
        }
        // this.allData.push(global.locations);
        // this.allData.push(global.sports);
    }
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
            this.setState({searchtext:text});

            if(text.length<=0){
                this.setState({suggestions:[]});
                return;
            }
            console.log(this.allData);
            var currentData=this.allData.filter(data=>
                data.name.toLowerCase().includes(text.toLowerCase())
                )
                this.setState({suggestions:currentData});
            }
            
            suggestedOption(text){
                console.log(text);
                this.setState({suggestions:[]});
                this.setState({searchtext:text});
            }
            getSuggestions(){
                return(this.state.suggestions.map((data,indeX)=>{
                    let dataIn=data;
                    return(
                    <TouchableOpacity onPressIn={()=>{this.suggestedOption(dataIn.name)}}  style={{elevation:5,zIndex:100000,borderBottomWidth:0.5 ,backgroundColor:'white'}} key={"TO"+indeX} >
                    <Text style={{padding:5,fontSize:18}} key={"Tx"+indeX}>
                    {data.name}
                    </Text>
                    </TouchableOpacity>
                    )}))
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
                    <View style={{flex:1}} >
                    <TextInput
                    autoFocus
                    value={this.state.searchtext}
                    style={{ margin:5,borderColor: 'gray', borderWidth: 1,borderRadius:10,flex:1 }} 
                    editable
                    onChangeText={text => this.onChangeText(text)}
                    />
                    <View style={{position:'absolute',elevation:5,top:50,zIndex:10,width:'100%'}}>
                    {this.getSuggestions()}
                        </View>
                        </View>
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
                    elevation: 5,zIndex:1000
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
            
