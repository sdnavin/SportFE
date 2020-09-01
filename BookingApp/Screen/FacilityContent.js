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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FacilityContent extends Component {
    constructor(props){
        super(props);
        this.state={
            facilityData:[],
        }
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
        console.log(item);
        var imagesource=gamesIn.filter(dataIn=>(
            item.toLowerCase().includes(dataIn.name.toLowerCase())
            ));

            if(imagesource.length>0){
                console.log(imagesource[0].image);
                return imagesource[0].image;
            }
            return '';
        }
        getallIcon(item)
        {
            return(item.sports.map((data,index)=>{
                var imagesc=this.getImage(data);
                return(
                    <>
                    {imagesc.length>0&&
                        <Image key={"image"+index} style={{height:20,width:20}} source={imagesc}/>
                    }
                    </>
                    );
                }
                )
                );
            }
            render() {
                return (
                    <>
                    <FilterBar navigation={this.props.navigation}/>
                    <ScrollView style={{backgroundColor:appTheme.colors.background}} >
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
                        <Text style={styles.locateTxt}>{item.city}</Text>
                        
                        {this.getallIcon(item)}
                        {UIElements.drawGapV(10)}
                        <Button buttonStyle={{backgroundColor:colors.yellowColor,height:20}} title='BOOK NOW' titleStyle={{alignSelf:'center',fontSize:12}}/>
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
            