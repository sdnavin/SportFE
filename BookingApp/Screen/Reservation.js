import React, { Component } from 'react'
import { View,Text, Switch, ScrollView } from 'react-native'
import { appTheme, colors } from '../constants/AppColors'
import { ButtonGroup, Button } from 'react-native-elements'
import { color } from 'react-native-reanimated'
import * as UIElements from '../Tools/UIElements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimeShower from '../Prefab/DateTimeShower'
import { ActivityIndicator } from 'react-native'
import Api from '../constants/ApiLink'
import { Linking } from 'react-native'

// const component1 = () => <Text>Details</Text>
// const component2 = () => <Text>Booking</Text>
// const component3 = () => <Text>Maps & Hours</Text>
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];



export default class Reservation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataLoading:0,
            loading:1,
            selectedIndex: 0,
            allDates:[new Date(),new Date(),new Date(),new Date()],
            selectdate:new Date(),
            futureDate:new Date(),
            reserveDateTime:new Date(),
            facilityData:{}
            
        }
        this.onChangeDate(null,this.state.selectdate);
        setTimeout(()=>{this.onChangeDate(null,this.state.selectdate)},100);
        this.updateIndex = this.updateIndex.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
    }
    componentDidMount(){
        var myInfo=this.props.route.params.facilityInfo;
        this.getFacilityFromApiAsync(Api.getFacilityDetail+myInfo.id)
    }
    
    openMap(lat,lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        
        Linking.openURL(url); 
    }
    listtoString(info){
        var totalstring="";

        const nameList = info.map((name,index) => {
            totalstring+=name+((index>=(info.length-1))?"":", ");

        });
        return totalstring;
    }
  
    getFacilityFromApiAsync = async (facilityURL) => {
        try {
            
            let response = await fetch(facilityURL);
            let jsonObj = await response.text();
            console.log(jsonObj);
            global.Facilities=(JSON.parse(jsonObj));
            this.setState({facilityData:JSON.parse(jsonObj),dataLoading:1})
            //   return json.movies;
        } catch (error) {
            console.error(error);
        }
    };
    
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
    
    component1 = () =>{ 
        return( <Text>Details</Text>)
    }
    component2 = () =>{
        return( <Text>Booking</Text>)
    }
    component3 = () =>{
        return( <Text>Maps & Hours</Text>)
    }
    
    onChangeDate (event,selectedDate){
        console.log("S"+selectedDate);
        const currentDate = selectedDate;
        var myFutureDate=new Date(currentDate);
        myFutureDate.setDate(myFutureDate.getDate()+ 3);//myFutureDate is now 8 days in the future
        this.setState({selectdate:currentDate,futureDate:myFutureDate});
        const alls=[new Date(),new Date(),new Date(),new Date()];
        let t=0;
        for( t=0;t<4;t++){
            alls[t]=new Date(currentDate);
            alls[t].setDate(alls[t].getDate()+ t);//myFutureDate is now 8 days in the future
        }
        
        this.setState({allDates:alls});
        this.setState({loading:0})
    };
    
    getGames(myinfo){
        let totalstring="";
        myinfo.sports.map((item, index)=>{
                totalstring+=item.name+(index<(myinfo.sports.length-1)?", ":"");
            });
        return(<Text style={{fontSize:18,textAlign:'right'}}>{totalstring}</Text>)
            }
            
            getAllTimes(){
                var alllines=[];
                let t=0;
                var alltime=[];
                for (t=0;t<24;t++){
                    alltime[t]=t;
                }
                return( alltime.map((item,index)=>{
                    return(
                        <TouchableOpacity key={'tot'+index} onPress={()=>{
                            var timeHr=(index+1);
                            var timeset=this.state.selectdate;
                            console.log("T :"+timeHr);
                            timeset.setHours(timeHr);
                            timeset.setMinutes(0);
                            this.setState({selectdate:timeset});
                            this.setState({selectedIndex:2})
                        }} style={{margin:3,borderRadius:10, borderWidth:2,width:75,height:70,justifyContent:'center'}}>
                        <Text key={"tc"+index} style={{alignSelf:'center'}}>{("0" + (index+1)).slice(-2)+":00"}</Text>
                        <Text key={"tb"+index}  style={{alignSelf:'center',fontWeight:'bold'}}>Book</Text>
                        </TouchableOpacity>
                        )}));
                    }
                    isLoading(children){
                        if(this.state.loading==1){
                            return( <View><ActivityIndicator/></View>)
                        }else{
                            return(<>{children}</>);
                        }
                    }
                    
                    render() {
                        if(this.state.dataLoading==0)
                        return(<ActivityIndicator/>)
                        var myInfo=this.state.facilityData;
                        const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }];
                        const { selectedIndex } = this.state;
                        return (
                            <View style={{backgroundColor:appTheme.colors.background}}>
                            <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            selectedButtonStyle={{backgroundColor:colors.yellowColor}}
                            containerStyle={{height: 35}} />
                            
                            {this.state.selectedIndex==0&&(
                                <>
                                <SliderBox
                                images={myInfo.images}
                                onCurrentImagePressed={index => {}}
                                currentImageEmitter={index => {}}
                                />
                                <TouchableOpacity onPress={()=>{this.openMap(myInfo.latitude,myInfo.longitude)}} style={{backgroundColor:colors.sportColor,borderRadius:5,height:25,width:100,justifyContent:'center',alignSelf:'flex-end',}} >
                                    <Text style={{alignSelf:'center'}}>View on Map</Text>
                                </TouchableOpacity>
                                <ScrollView style={{margin:10}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <Text style={{fontSize:22,fontWeight:'bold'}}>{myInfo.name}</Text>
                                <Button onPress={()=>{this.setState({selectedIndex:1})}} containerStyle={{alignSelf:'center'}} buttonStyle={{backgroundColor:colors.yellowColor,height:20}} title='BOOK NOW' titleStyle={{alignSelf:'center',fontSize:16}}/>
                                </View>
                                {UIElements.drawGapV(20)}
                                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <Text style={{fontSize:18,fontWeight:'bold'}}>SPORTS</Text>
                                <View style={{width:'70%'}}>
                                {this.getGames(myInfo)}
                                </View>
                                </View>
                                {UIElements.drawGapV(15)}
                                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <Text style={{fontSize:18,fontWeight:'bold'}}>SURFACE</Text>
                                <Text style={{fontSize:18}}>{myInfo.surface}</Text>
                                </View>
                                {UIElements.drawGapV(15)}
                                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <Text style={{fontSize:18,fontWeight:'bold'}}>PRICING</Text>
                                <Text style={{fontSize:18}}>{myInfo.pricing}</Text>
                                </View>
                                {UIElements.drawGapV(15)}
                                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <Text style={{fontSize:18,fontWeight:'bold'}}>FACILITIES</Text>
                                <View style={{width:'70%'}}>
                                            <Text style={{fontSize:18,textAlign:'right'}}>{this.listtoString(myInfo.facilities)}</Text>
                                    </View>
                                </View>
                                
                                </ScrollView>
                                
                                </>
                                )}
                                
                                {this.state.selectedIndex==1&&(
                                    <>
                                    {this.isLoading(
                                        <ScrollView style={{margin:10,}}>
                                        {/* {UIElements.drawGapV(10)}
                                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                                        <Text style={{fontSize:16}}>Single Booking</Text>
                                        <Switch onValueChange={()=>{}} />
                                        <Text style={{fontSize:16}}>Block Booking</Text>
                                    </View> */}
                                    
                                    {UIElements.drawGapV(10)}
                                    <TouchableOpacity style={{borderWidth:0.5,flexDirection:'row',borderRadius:10,height:50,flex:1,justifyContent:'center',backgroundColor:'white'}} onPress={()=>this.setState({showDateTime:1})}>
                                    <Text style={{alignSelf:'center',fontSize:18,fontWeight:'500'}} >{(monthNames[this.state.selectdate.getUTCMonth() ]) + " " + this.state.selectdate.getDate()}</Text>
                                    <Text style={{alignSelf:'center',fontSize:18,fontWeight:'500'}} >{' - '+ (monthNames[this.state.futureDate.getUTCMonth()]) + " " + this.state.futureDate.getDate()}</Text>
                                    </TouchableOpacity>
                                    
                                    {this.state.showDateTime==1 && 
                                        <DateTimeShower
                                        dateIn={this.state.selectdate}
                                        mode='date'
                                        onClose={date => {
                                            if (date && Platform.OS !== 'ios') {
                                                this.setState({ showDateTime: 0 });
                                            } else {
                                                this.setState({ showDateTime: 0 });
                                            }
                                        }
                                    }
                                    onChange={this.onChangeDate}
                                    />
                                    
                                }
                                
                                {this.state.allDates.map((item,index)=>(
                                    <>
                                    {UIElements.drawGapV(15)}
                                    <View key={"V"+index} style={{flexDirection:'row',height:75,justifyContent:'center'}}>
                                    <Text key={"T+"+index} style={{alignSelf:'center',fontWeight:'bold',fontSize:15,width:'10%',textAlign:'center'}}> {monthNames[item.getMonth()]+" "+item.getDate()} </Text>
                                    <ScrollView  key={"S+"+index}  style={{marginRight:10}} horizontal >
                                    {this.getAllTimes()}
                                    </ScrollView>
                                    <MaterialIcons key={"MI+"+index} style={{position:'absolute',right:-15,marginTop:20}} name="keyboard-arrow-right" size={40} />
                                    </View>
                                    </>
                                    ))}
                                    
                                    </ScrollView>
                                    )}
                                    </>
                                    )}
                                    
                                    {this.state.selectedIndex==2&&(
                                        <>
                                        <SliderBox
                                        images={myInfo.images}
                                        onCurrentImagePressed={index => {}}
                                        currentImageEmitter={index => {}}
                                        />
                                        <View style={{margin:10}}>
                                        {UIElements.drawGapV(10)}
                                        <View style={{justifyContent:'space-between'}}>
                                        <Text style={{fontSize:22,fontWeight:'bold'}}>{myInfo.name}</Text>
                                        {UIElements.drawGapV(5)}
                                        
                                        <Text style={{fontSize:18,fontWeight:'600'}}>{myInfo.location}</Text>
                                        {UIElements.drawGapV(5)}
                                        
                                        <View style={{flexDirection:'row'}} ><Text style={{fontSize:18,fontWeight:'bold'}}>{"Date - "}</Text>
                                        <Text style={{fontSize:18,fontWeight:'600'}}>{this.state.selectdate.getDate()+" "+monthNames[this.state.selectdate.getMonth()]+" "+this.state.selectdate.getFullYear()}</Text></View>
                                        <View style={{flexDirection:'row'}} ><Text style={{fontSize:18,fontWeight:'bold'}}>{"Time - "}</Text>
                                        <Text style={{fontSize:18,fontWeight:'600'}}>{("0" + (this.state.selectdate.getHours())).slice(-2)+":00"}</Text></View>
                                        {UIElements.drawGapV(10)}
                                        <Button onPress={()=>{}} buttonStyle={{backgroundColor:colors.yellowColor,height:30,width:'50%',alignSelf:'center'}} title='Confirm & Pay' titleStyle={{alignSelf:'center',fontSize:18}}/>
                                        </View></View>
                                        </>
                                        )}
                                        </View>
                                        )
                                    }
                                }
                                
                                