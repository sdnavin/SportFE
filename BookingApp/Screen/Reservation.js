import React, { Component } from 'react'
import { View,Text, Switch, ScrollView } from 'react-native'
import AppColors, { appTheme, colors } from '../constants/AppColors'
import { ButtonGroup, Button, Image } from 'react-native-elements'
import { color } from 'react-native-reanimated'
import * as UIElements from '../Tools/UIElements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimeShower from '../Prefab/DateTimeShower'
import { ActivityIndicator } from 'react-native'
import Api from '../constants/ApiLink'
import { Linking } from 'react-native'
import HTML from 'react-native-render-html';
import { useTheme } from '@react-navigation/native'
import ToggleBar from '../Prefab/ToggleBar'

// const component1 = () => <Text>Details</Text>
// const component2 = () => <Text>Booking</Text>
// const component3 = () => <Text>Maps & Hours</Text>
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function Reservation(props) {
    const theme = useTheme();
    return <Reservationf {...props} theme={theme} />;
}


class Reservationf extends Component {
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
            facilityData:{},formats:[],
            sportNo:-1,formatNo:-1
            
        }
        this.onChangeDate(null,this.state.selectdate);
        setTimeout(()=>{this.onChangeDate(null,this.state.selectdate)},100);
        this.updateIndex = this.updateIndex.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
    }
    componentDidMount(){
        var myInfo=this.props.facilityInfo;
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
        const { theme } = this.props;
        return( <Text style={{color:theme.colors.text}} >Details</Text>)
    }
    component2 = () =>{
        const { theme } = this.props;
        
        return( <Text style={{color:theme.colors.text}}>Booking</Text>)
    }
    component3 = () =>{
        const { theme } = this.props;
        
        return( <Text style={{color:theme.colors.text}}>Maps & Hours</Text>)
    }
    
    selectedSport(index){
        if(index!=-1){
            var myInfo=this.state.facilityData;
            this.setState({formats:myInfo.sports[index].formats})
            console.log(myInfo.sports[index].formats.length);
        }else{
            this.setState({formats:[]});
        }
    }
    
    selectedSport(index){
        if(index!=-1){
            var myInfo=this.state.facilityData;
            this.setState({formats:myInfo.sports[index].formats,sportNo:index})
            console.log(myInfo.sports[index].formats);
        }else{
            this.setState({formats:[],sportNo:-1});
        }
    }
    selectedFormat(index){
        if(index!=-1){
            var myInfo=this.state.facilityData;
            this.setState({formatNo:index})
            console.log(myInfo.sports[this.state.sportNo].formats[index]);
        }else{
            this.setState({formats:[],formatNo:-1});
        }
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
        const { theme } = this.props;
        
        let totalstring="";
        myinfo.sports.map((item, index)=>{
            totalstring+=item.name+(index<(myinfo.sports.length-1)?", ":"");
        });
        return(<Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{totalstring}</Text>)
    }
    
    
    getFormatsArray(){
        var myinfo=this.state.formats;
        console.log(myinfo.length);
        let totalstring=[];
        if(myinfo.length){
            myinfo.map((item, index)=>{
                var citem=item;
                totalstring.push(item);
            });
        }
        console.log(totalstring);
        return(totalstring)
    }
    
    getGamesArray(myinfo){
        let totalstring=[];
        if(myinfo.sports.length>0){
            myinfo.sports.map((item, index)=>{
                var citem=item;
                totalstring.push(item);
            });
        }
        console.log(totalstring);
        return(totalstring)
    }
    
    getAllTimes(){
        const { theme } = this.props;
        
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
                }} style={{margin:3,borderRadius:10,borderColor:theme.colors.text,borderWidth:2,width:75,height:70,justifyContent:'center'}}>
                <Text key={"tc"+index} style={{alignSelf:'center',color:theme.colors.text}}>{("0" + (index+1)).slice(-2)+":00"}</Text>
                <Text key={"tb"+index}  style={{alignSelf:'center',fontWeight:'bold',color:theme.colors.text}}>Book</Text>
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
                const { theme } = this.props;
                
                if(this.state.dataLoading==0)
                return(<ActivityIndicator/>)
                var myInfo=this.state.facilityData;
                const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }];
                console.log(buttons);
                const { selectedIndex } = this.state;
                const logo={
                    uri:myInfo.logo
                }
                console.log(myInfo.images)
                return (
                    <View style={{backgroundColor:theme.colors.background}}>
                    <ButtonGroup
                    disabled
                    disabledSelectedStyle={{backgroundColor:theme.colors.yellowColor}}
                    disabledTextStyle={{color:theme.colors.text}}
                    disabledSelectedTextStyle={{color:theme.colors.text}}
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    textStyle={{color:theme.colors.text}}
                    selectedButtonStyle={{backgroundColor:theme.colors.yellowColor}}
                    containerStyle={{backgroundColor:theme.colors.background,height: 35}} />
                    
                    {this.state.selectedIndex==0&&(
                        <>
                        <View style={(myInfo.images.length>0)?{}:{height:80}}>
                        <SliderBox
                        images={myInfo.images}
                        onCurrentImagePressed={index => {}}
                        currentImageEmitter={index => {}}
                        />
                        <View style={{position:'absolute',bottom:0,flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                        <Image source={logo} PlaceholderContent={<ActivityIndicator/>} style={{alignSelf:'flex-start',marginLeft:10,width:80,height:80, resizeMode: 'contain'}}/>
                        
                        <TouchableOpacity onPress={()=>{this.openMap(myInfo.latitude,myInfo.longitude)}} style={{ backgroundColor:theme.colors.sportColor,borderRadius:5,height:25,width:110,justifyContent:'center',translateY:50,flexDirection:'row'}}>
                        <MaterialIcons style={{alignSelf:'center'}} name={"location-on"} size={15} color={theme.colors.text}/>
                        <Text style={{alignSelf:'center',color:theme.colors.text}}>View on Map</Text>
                        </TouchableOpacity></View></View>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}} >
                        <Text style={{fontSize:18,fontWeight:'200',color:theme.colors.text}}>{myInfo.name}</Text>
                        <Button disabled={!myInfo.bookingType.toLowerCase().includes('online')} onPress={()=>{this.setState({selectedIndex:1})}} containerStyle={{alignSelf:'center'}} buttonStyle={{backgroundColor:theme.colors.yellowColor,height:20}} title='BOOK NOW' titleStyle={{alignSelf:'center',fontSize:16}}/>
                        </View>
                        <ScrollView automaticallyAdjustContentInsets showsVerticalScrollIndicator={false}
                        scrollEnabled={true} horizontal={false} style={{margin:10,height:'50%'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text style={{fontSize:16,fontWeight:'bold',color:theme.colors.text}}>SPORTS</Text>
                        <View style={{width:'70%'}}>
                        {this.getGames(myInfo)}
                        </View>
                        </View>
                        {UIElements.drawGapV(15)}
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text style={{fontSize:16,fontWeight:'bold',color:theme.colors.text}}>SURFACE</Text>
                        <Text style={{fontSize:16,color:theme.colors.text}}>{myInfo.surface}</Text>
                        </View>
                        {UIElements.drawGapV(15)}
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text style={{fontSize:16,fontWeight:'bold',color:theme.colors.text}}>TIMINGS</Text>
                        <View style={{width:'75%'}}>
                        <HTML
                        tagsStyles={{p: { textAlign: 'right', fontSize:16 ,color:theme.colors.text}}}
                        html={myInfo.openingHours}/>
                        </View>
                        </View>
                        {UIElements.drawGapV(15)}
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text style={{fontSize:16,fontWeight:'bold',color:theme.colors.text}}>FACILITIES</Text>
                        <View style={{width:'70%'}}>
                        <Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{this.listtoString(myInfo.facilities)}</Text>
                        </View>
                        </View>
                        {UIElements.drawGapV(15)}
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text style={{fontSize:16,fontWeight:'bold',color:theme.colors.text}}>CONTACT</Text>
                        <View style={{width:'70%'}}>
                        {!!(myInfo.webLink)&& <TouchableOpacity onPress={()=>Linking.openURL(myInfo.webLink)} style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
                        <Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{(myInfo.webLink)}</Text>
                        <MaterialCommunityIcons style={{marginLeft:10, alignSelf:'center'}} name={"web"} size={18} color={theme.colors.text}/>
                        </TouchableOpacity>}
                        {!!(myInfo.contactEmail)&&<TouchableOpacity onPress={()=>Linking.openURL("mailto:"+myInfo.contactEmail)} style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
                        <Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{(myInfo.contactEmail)}</Text>
                        <MaterialCommunityIcons style={{marginLeft:10, alignSelf:'center'}} name={"email"} size={18} color={theme.colors.text}/>
                        </TouchableOpacity>}
                        {!!(myInfo.telePhone1)&&<TouchableOpacity onPress={()=>Linking.openURL("tel:"+myInfo.telePhone1)} style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
                        <Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{(myInfo.telePhone1)}</Text>
                        <MaterialCommunityIcons style={{marginLeft:10, alignSelf:'center'}} name={"phone"} size={18} color={theme.colors.text}/>
                        </TouchableOpacity>}
                        {!!(myInfo.telePhone2)&&<TouchableOpacity onPress={()=>Linking.openURL("tel:"+myInfo.telePhone2)} style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
                        <Text style={{fontSize:16,textAlign:'right',color:theme.colors.text}}>{(myInfo.telePhone2)}</Text>
                        <MaterialCommunityIcons style={{marginLeft:10, alignSelf:'center'}} name={"phone"} size={18} color={theme.colors.text}/>
                        </TouchableOpacity>}
                        
                        
                        </View>
                        </View>
                        
                        </ScrollView>
                        
                        </>
                        )}
                        
                        {this.state.selectedIndex==1&&(
                            <>
                            {this.isLoading(
                                <ScrollView style={{margin:10,}}>
                                <ToggleBar items={this.getGamesArray(myInfo)} itemSelected={this.selectedSport.bind(this)}/>
                                {UIElements.drawGapV(10)}
                                {this.state.formats.length>0&&
                                    <>
                                    <ToggleBar items={this.getFormatsArray()} itemSelected={this.selectedFormat.bind(this)}/>
                                    {UIElements.drawGapV(10)}
                                    </>
                                }
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
                                <Text key={"T+"+index} style={{alignSelf:'center',fontWeight:'bold',fontSize:15,width:'10%',textAlign:'center',color:theme.colors.text}}> {monthNames[item.getMonth()]+" "+item.getDate()} </Text>
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
                                    <Text style={{fontSize:22,fontWeight:'bold',color:theme.colors.text}}>{myInfo.name}</Text>
                                    {UIElements.drawGapV(5)}
                                    
                                    <Text style={{fontSize:18,fontWeight:'600',color:theme.colors.text}}>{myInfo.location}</Text>
                                    {UIElements.drawGapV(5)}
                                    
                                    <View style={{flexDirection:'row'}} ><Text style={{fontSize:18,fontWeight:'bold',color:theme.colors.text}}>{"Date - "}</Text>
                                    <Text style={{fontSize:18,fontWeight:'600',color:theme.colors.text}}>{this.state.selectdate.getDate()+" "+monthNames[this.state.selectdate.getMonth()]+" "+this.state.selectdate.getFullYear()}</Text></View>
                                    <View style={{flexDirection:'row'}} ><Text style={{fontSize:18,fontWeight:'bold',color:theme.colors.text}}>{"Time - "}</Text>
                                    <Text style={{fontSize:18,fontWeight:'600',color:theme.colors.text}}>{("0" + (this.state.selectdate.getHours())).slice(-2)+":00"}</Text></View>
                                    {UIElements.drawGapV(10)}
                                    <Button onPress={()=>{}} buttonStyle={{backgroundColor:theme.colors.yellowColor,height:30,width:'50%',alignSelf:'center'}} title='Confirm & Pay' titleStyle={{alignSelf:'center',fontSize:18}}/>
                                    </View></View>
                                    </>
                                    )}
                                    </View>
                                    )
                                }
                            }
                            
                            