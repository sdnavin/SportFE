import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import { FlatGrid } from 'react-native-super-grid';
import { View,Text,Dimensions, ActivityIndicator,StyleSheet, FlatList } from 'react-native';
import { Image, Card, Button } from 'react-native-elements';
import FacilityList from '../constants/FacilityData'
import { appTheme, colors } from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Api from '../constants/ApiLink';
import gamesIn from '../constants/sportDetails'
import HeaderTitle from './HeaderTitle';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FacilityContent extends Component {
    constructor(props){
        super(props);
        this.state={
            facilityData:[],filters:[]
        }
        this.applyFilter=this.applyFilter.bind(this);
    }
    getFacilityFromApiAsync = async (facilityURL) => {
        try {
            
            let response = await fetch(facilityURL);
            let jsonObj = await response.text();
            console.log(jsonObj);
            global.Facilities=(JSON.parse(jsonObj));
            this.setState({facilityData:JSON.parse(jsonObj)})
            //   return json.movies;
        } catch (error) {
            console.error(error);
        }
    };
    
    componentDidMount(){
        var faciltyurl=Api.getFacilities.replace('pageno',1).replace('pagesize',15);
        this.getFacilityFromApiAsync(faciltyurl);
    }
    getImage(item){
        // console.log(item);
        var imagesource=gamesIn.filter(dataIn=>(
            item.toLowerCase().includes(dataIn.name.toLowerCase())
            ));

            if(imagesource.length>0){
                return imagesource[0];
            }
            return '';
        }
        getallIcon(item)
        {
            return(
                <FlatGrid 
                style={{left:-10}}
                fixed
                itemDimension={(15)}
                data={item.sports}
                renderItem={({item,index})=>{
                    var imagesc=this.getImage(item);
                    return(<View key={"V"+index}>
                    {imagesc.image!=undefined&&
                        <Image key={"image"+index} style={{ tintColor:'white', height:15,width:15}} source={imagesc.image} PlaceholderContent={<ActivityIndicator/>}/>
                    }
                    </View>)
                }}
                // numColumns={4}
                />
               );
            }

            applyFilter(dataIn){
                this.setState({filters:dataIn});
                var faciltyurl=Api.getFacilities.replace('pageno',1).replace('pagesize',15);
                this.getFacilityFromApiAsync(faciltyurl);
            }
            render() {
                return (
                    <>
                    <HeaderTitle/>
                    <FilterBar navigation={this.props.navigation} filtering={this.applyFilter}/>
                    <ScrollView style={{backgroundColor:appTheme.colors.background}} >
                    <FlatGrid
                    itemDimension={(screenWidth)}
                    data={this.state.facilityData}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("Reserve",{facilityInfo:item});
                        }} ><>
                        <Card containerStyle={{backgroundColor:appTheme.colors.background,borderWidth:0,padding:0,margin:0, width:'100%',marginTop:10}}>
                        <View style={{flex:1,width:'100%',height:150}}>
                        <Image
                        source={{ uri:item.images[0]}}
                        style={{ width: '100%' , height: '100%',borderRadius:10 }}
                        PlaceholderContent={<ActivityIndicator/>}
                        />
                        <View style={{position:'absolute',width: '100%' ,}}>
                        <Button buttonStyle={{backgroundColor:colors.yellowColor,width:100,alignSelf:'flex-end',height:20}} title='BOOK NOW' titleStyle={{alignSelf:'center',fontSize:12}}/>
                        {UIElements.drawGapV(55)}
                        <View style={{flexDirection:'row'}}>
                        {UIElements.drawGapH(10)}
                        <View style={{width:'80%'}}>
                        <Text style={{fontWeight:'bold',color:'white'}}>{item.name}</Text>
                        <Text style={[styles.locateTxt,{color:'white'}]}>{item.city}</Text>
                        {this.getallIcon(item)}
                        </View>
                        <View>
                        {/* <View style={{flexDirection:'row'}}>
                        <MaterialIcons name='location-on' size={20} color='white'/>
                        <Text style={{fontSize:12,color:'white'}} >{'10km'}</Text>
                        </View> */}
                        {UIElements.drawGapV(2)}
                        <View style={{flexDirection:'row'}}>
                        <MaterialIcons name='star-border' size={18} color='white'/>
                        <Text style={{fontSize:12,alignSelf:'center',color:'white'}} >{item.rating}</Text></View>
                        </View>
                        </View>
                        </View>
                        </View>
                        </Card></></TouchableOpacity>)
                    }/>
                    </ScrollView>
                    </>
                    )
                }
            }
            const styles = StyleSheet.create({
                locateTxt:{
                    fontSize:10
                }
            });
            