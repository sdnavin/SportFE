import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import { FlatGrid } from 'react-native-super-grid';
import { View,Text,Dimensions, ActivityIndicator,StyleSheet, FlatList,TouchableOpacity, ScrollView } from 'react-native';
import { Image, Card, Button, Overlay, Input, CheckBox } from 'react-native-elements';
import FacilityList from '../constants/FacilityData'
import AppColors, { appTheme, colors } from '../constants/AppColors';
import * as UIElements from '../Tools/UIElements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Api from '../constants/ApiLink';
import gamesIn from '../constants/sportDetails'
import HeaderTitle from './HeaderTitle';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// Wrap and export
export default function(props) {
    const theme = useTheme();
    return <FacilityContent {...props} theme={theme} />;
}

class FacilityContent extends Component {
    constructor(props){
        super(props);
        this.state={
            loaded:0,reload:0,facilityData:[],filters:[],gamesList:global.sports,locationsList:global.locations,visibleFilter:false,allData:[],venuetext:'',onlinebook:false
        }
        this.applyFilter=this.applyFilter.bind(this);
        this.toggleFilter=this.toggleFilter.bind(this);
        this.clearAllFilter=this.clearAllFilter.bind(this);
    }
    
    
    
    getFacilityFromApiAsync = async (facilityURL,postdata) => {
        try {
            
            let response = await fetch(facilityURL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body:JSON.stringify(postdata)
            });
            let jsonObj = await response.text();
            console.log(jsonObj);
            global.Facilities=(JSON.parse(jsonObj));
            var filterData=global.Facilities.filter(data=>data.bookingType.toLowerCase().includes('online'));
            this.setState({facilityData:this.state.onlinebook?filterData:JSON.parse(jsonObj),loaded:1,reload:1})
            //   return json.movies;
        } catch (error) {
            console.error(error);
        }
    };
    dataM=[];
    componentDidMount(){
        let t=0;
        console.log(global.locations.length);
        for(t=0;t<global.locations.length;t++){
            var obj={name:global.locations[t].name,id:global.locations[t].id,selected:false,type:1}
            this.dataM.push(obj);
        }
        for(t=0;t<global.sports.length;t++){
            var obj={name:global.sports[t].name,id:global.sports[t].id,selected:false,type:2}
            this.dataM.push(obj);
        }
        this.setState({allData:this.dataM});
        
        var faciltyurl=Api.getFacilities;
        var details = {
            'name': "",
            'locations': [],
            'sports': [],
            'page':1,
            'pageSize':15
        };
        this.getFacilityFromApiAsync(faciltyurl,details);
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
                console.log(dataIn);
                
                this.setState({filters:dataIn,loaded:0});
                var faciltyurl=Api.getFacilities;
                var locations=dataIn.filter(data=>data.type==1&&data.selected);
                
                var LocationIDs=[];
                locations.map((data,index)=>{
                    LocationIDs.push(data.id);
                })
                var sports=dataIn.filter(data=>data.type==2&&data.selected);
                var SportIDs=[];
                sports.map((data,index)=>{
                    SportIDs.push(data.id);
                })
                
                var details = {
                    'name': this.state.venuetext,
                    'locations': LocationIDs,
                    'sports': SportIDs,
                    'page':1,
                    'pageSize':15
                };
                console.log(details);
                this.getFacilityFromApiAsync(faciltyurl,details);
            }
            toggleFilter(){
                this.setState({visibleFilter:!this.state.visibleFilter,venuetext:''})
            }
            clearAllFilter(){
                const{allData}=this.state;
                allData.map((item,index)=>{
                        allData[index].selected=false;
                })
                this.setState({allData,venuetext:'',onlinebook:false});
            }
            filterItem(citem){
                const { allData } = this.state;
                console.log(citem);        

                allData.map((item,index)=>{
                    if(allData[index].id===citem.id){
                        allData[index].selected=!allData[index].selected;
                    }
                })
                // update state
                this.setState({
                    allData,
                });
            }
            render() {
                const { colors } = this.props;
                if(this.state.loaded==0){
                    return (
                        <>
                        <HeaderTitle/>
                        {this.state.reload==1&&
                            <FilterBar navigation={this.props.navigation} AllData={this.state.allData} openFilterPage={this.toggleFilter} filtering={this.applyFilter}/>
                        }
                        <ActivityIndicator/>
                        </>
                        )
                    }else{
                        return (
                            <>
                            <HeaderTitle/>
                            <FilterBar navigation={this.props.navigation} AllData={this.state.allData} openFilterPage={this.toggleFilter} filtering={this.applyFilter}/>
                            <FlatGrid
                            itemDimension={(screenWidth)}
                            data={this.state.facilityData}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate("Reserve",{facilityInfo:item});
                                }} ><>
                                <Card containerStyle={{backgroundColor:colors.background,borderWidth:0,padding:0,margin:0, width:'100%',marginTop:10}}>
                                <View style={{flex:1,width:'100%',height:150}}>
                                <Image
                                source={{ uri:item.images[0]}}
                                style={{ width: '100%' , height: '100%',borderRadius:10 }}
                                PlaceholderContent={<ActivityIndicator/>}
                                />
                                <View style={{position:'absolute',width: '100%' ,}}>
                                <Button disabled={!item.bookingType.toLowerCase().includes('online')} buttonStyle={{backgroundColor:colors.yellowColor,width:100,alignSelf:'flex-end',height:20}} title='BOOK NOW' titleStyle={{alignSelf:'center',fontSize:12}}/>
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
                        <Overlay overlayStyle={{width:'90%',height:'55%'}} backdropStyle={{color:colors.blackTransparent}} isVisible={this.state.visibleFilter} onBackdropPress={()=>this.toggleFilter()}>
                        <View style={{width:'100%',height:'100%'}}>
                        <View style={{padding:5, flexDirection:'row',borderWidth:1,borderColor:colors.border,borderRadius:5,justifyContent:'center'}} >
                        <Text style={{alignSelf:'center',color:colors.text }}>Filters </Text>
                        <IonIcon name="ios-options" style={{color:colors.text}} size={20} color='black'/></View>
                        {UIElements.drawGapV(15)}
                        <Text style={styles.title}>Sports</Text>
                        <View style={{height:30,marginBottom:20}}>
                        <ScrollView style={{marginRight:0}} horizontal showsHorizontalScrollIndicator={false} >
                        {this.state.allData.filter(data=>data.type==2).map(( item,index ) => 
                             {
                                 let cItem=item;
                                 return(
                            <TouchableOpacity onPress={()=>{this.filterItem(cItem)}} key={'FTo'+index} style={{ marginLeft:5, padding:5,borderWidth:1,borderColor:item.selected?colors.sportColor: colors.border,borderRadius:5,justifyContent:'center'}} >
                            <Text  key={'FT'+index} style={{alignSelf:'center',color:item.selected?colors.sportColor:colors.text }}>{item.name}</Text>
                            </TouchableOpacity>
                            
                        )})
                        }</ScrollView></View>
                        <Text style={styles.title}>Locations</Text>
                        <View style={{height:30,marginBottom:20}}>
                        
                        <ScrollView style={{marginRight:0}} horizontal showsHorizontalScrollIndicator={false} >
                        {this.state.allData.filter(data=>data.type==1).map(( item,index ) => 
                            {
                                let cItem=item;
                                return(
                            <TouchableOpacity onPress={()=>{this.filterItem(cItem)}} key={'FTo'+index} style={{ marginLeft:5, padding:5,borderWidth:1,borderColor:item.selected?colors.sportColor: colors.border,borderRadius:5,justifyContent:'center'}} >
                            <Text  key={'FT'+index} style={{alignSelf:'center',color:item.selected?colors.sportColor:colors.text }}>{item.name}</Text>
                            </TouchableOpacity>)}
                            )
                        }</ScrollView></View>
                        <View style={{height:50}}>
                        <Input
                        placeholder='Name of the Venue'
                        onChangeText={(text)=>{this.setState({venuetext:text})}}
                        />
                        </View>
                        {UIElements.drawGapV(15)}
                        <CheckBox
                        title='Online Booking'
                        checkedColor={colors.sportColor}
                        onPress={() => this.setState({onlinebook: !this.state.onlinebook})}
                        checked={this.state.onlinebook}
                        />
                        {UIElements.drawGapV(15)}
                        <View style={styles.header} >
                        <TouchableOpacity style={styles.button} onPress={this.clearAllFilter}>
                        <Text >CLEAR ALL</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{backgroundColor:'#fbbc04'}]} onPress={()=>{
                this.applyFilter(this.state.allData);
                this.toggleFilter();
                }}>
                        <Text >APPLY</Text></TouchableOpacity>
                        </View>
                        </View>
                        </Overlay>
                        </>
                        )
                    }
                }
            }
            const styles = StyleSheet.create({
                locateTxt:{
                    fontSize:10
                },
                header:{
                    width:'100%',
                    bottom:0,
                    flexDirection:'row',
                },title:{
                    // padding:15,
                    fontSize:12,
                    fontWeight:'bold',marginBottom:10
                    // color:'gray'
                }
                ,button:{
                    width:screenWidth/2.35,
                    height:20,
                    padding:16,
                    fontSize:15,
                    // color:'gray',
                    justifyContent:'center',alignItems:'center',
                    backgroundColor:colors.sportColor,
                    fontWeight:'800'
                }
            });
            