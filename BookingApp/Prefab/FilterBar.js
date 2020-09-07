import React, { Component } from 'react'
import { Alert,View,Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as UIElements from '../Tools/UIElements';
import AppColors, { colors, appTheme } from '../constants/AppColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {TouchableOpacity} from 'react-native-gesture-handler'


export default class FilterBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: global.location,
            shortAddress:global.shortAddress,
            showOption:0,searchtext:'',
            suggestions:[],allData:[]
        };
        this.suggestedOption=this.suggestedOption.bind(this);
    }
    dataM=[];
    componentDidMount(){
        let t=0;
        console.log(global.locations.length);
        for(t=0;t<global.locations.length;t++){
            var obj={name:global.locations[t].name,id:global.locations[t].id,selected:false}
            this.dataM.push(obj);
        }
        for(t=0;t<global.sports.length;t++){
            var obj={name:global.sports[t].name,id:global.sports[t].id,selected:false}
            this.dataM.push(obj);
        }
        this.setState({allData:this.dataM});
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
                    filterItem(indexIn){
                        const { allData } = this.state;
                        allData[indexIn].selected=!allData[indexIn].selected;
                        
                        // update state
                        this.setState({
                            allData,
                        });
                        var filterIt=this.props.filtering;
                        filterIt(allData);
                    }
                    render() {
                        return (<>
                            <AppColors/>
                            <SafeAreaView style={styles.header} >
                            <View style={{flexDirection:'row',flex:1}} >
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Filter')} style={{padding:5, flexDirection:'row',borderWidth:1,borderColor:appTheme.colors.border,borderRadius:5,justifyContent:'center'}} >
                            <Text style={{alignSelf:'center',color:appTheme.colors.text }}>Filters </Text>
                            <IonIcon name="ios-options" style={{color:appTheme.colors.text}} size={20} color='black'/>
                            </TouchableOpacity>
                            <ScrollView style={{marginLeft:5,marginRight:10}} horizontal showsHorizontalScrollIndicator={false} >
                            {this.state.allData.map((item,index)=>{
                                var cItem=item;
                                return( <TouchableOpacity onPress={()=>{this.filterItem(index)}} key={'FTo'+index} style={{marginLeft:5, padding:5, flexDirection:'row',borderWidth:1,borderColor:item.selected?colors.sportColor: appTheme.colors.border,borderRadius:5,justifyContent:'center'}} >
                                <Text  key={'FT'+index} style={{alignSelf:'center',color:item.selected?colors.sportColor:appTheme.colors.text }}>{item.name}</Text>
                                </TouchableOpacity>)
                            })}
                            </ScrollView>
                            <MaterialIcons style={{marginLeft:-10,marginRight:-10}} name="keyboard-arrow-right" size={30} />
                            
                            </View>
                            </SafeAreaView></>
                            )
                        }
                    }
                    const styles=StyleSheet.create({
                        header:{
                            margin:10,paddingTop:5,
                            height:45,justifyContent:'center'
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
                    
                    