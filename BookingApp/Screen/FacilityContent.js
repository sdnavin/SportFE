import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import { FlatGrid } from 'react-native-super-grid';
import { View,Text,Dimensions, ActivityIndicator,StyleSheet } from 'react-native';
import { Image, Card, Button } from 'react-native-elements';
import FacilityList from '../constants/FacilityData'
import { appTheme, colors } from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FacilityContent extends Component {
    constructor(props){
        super(props);
        this.state={
            facilityData:FacilityList,
        }
    }
    render() {
        return (
            <>
            <FilterBar  navigation={this.props.navigation}/>
            <View style={{backgroundColor:appTheme.colors.background}} >
            <FlatGrid
            itemDimension={(screenWidth)}
            data={this.state.facilityData}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("Reserve",{facilityInfo:item});
                }} ><>
                <Card containerStyle={{backgroundColor:appTheme.colors.background,borderWidth:0,padding:0,margin:0, width:'100%',marginTop:10,shadowOpacity: 0,elevation:0}}>
                <View style={{flex:1,width:'100%'}}>
                <View style={{flexDirection:'row'}}>
                <Image
                source={{ uri:item.images[0]}}
                style={{ width: 120 , height: 80,borderRadius:10 }}
                PlaceholderContent={<ActivityIndicator/>}
                />
                {UIElements.drawGapH(10)}
                <View style={{width:185}}>
                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                <Text style={styles.locateTxt}>{item.location}</Text>
                <Text style={styles.locateTxt}>{item.type}</Text>
                {UIElements.drawGapV(10)}
                <Button buttonStyle={{backgroundColor:colors.yellowColor,height:20,width:80}} title='Book Now' titleStyle={{alignSelf:'center',fontSize:12}}/>
                </View>
                <View>
                <View style={{flexDirection:'row'}}>
                <MaterialIcons name='location-on' size={20} color={appTheme.colors.text}/>
                <Text style={{fontSize:12}} >{'10km'}</Text>
                </View>
                {UIElements.drawGapV(10)}
                <View style={{flexDirection:'row'}}>
                <MaterialIcons name='star-border' size={20} color={appTheme.colors.text}/>
                <Text style={{fontSize:12,alignSelf:'center'}} >{item.rating}</Text></View>
                </View>
                </View>
                </View>
                </Card></></TouchableOpacity>)
            }/>
            </View>
            </>
            )
        }
    }
    const styles = StyleSheet.create({
        locateTxt:{
            fontSize:10
        }
    });
    