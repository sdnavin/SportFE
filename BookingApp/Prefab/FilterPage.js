import React, { Component } from 'react'
import { SafeAreaView, TouchableOpacity,Text,View, StyleSheet, Switch,Platform,  } from 'react-native'
import * as UIElements from '../Tools/UIElements'
// import Fontisto from 'react-native-vector-icons/Fontisto'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CheckBox from '@react-native-community/checkbox'

// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimeShower from './DateTimeShower'
import { FlatGrid } from 'react-native-super-grid';
import { useTheme } from '@react-navigation/native'

// Wrap and export
export default function(props) {
    const theme = useTheme();
    return <FilterPage {...props} theme={theme} />;
}

class FilterPage extends Component {
    
    constructor(props){
        super(props);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeStartTime=this.onChangeStartTime.bind(this);
        this.onChangeEndTime=this.onChangeEndTime.bind(this);
        this.state={
            uiOption:0,
            showDateTime:0,
            selectdate:new Date(),
            startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 9, 0, 0, 0),
            endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), 20, 0, 0, 0),
            showStartTime:'',
            showEndTime:'',
            gamesList:global.sports,

        };
        
    }
    componentDidMount(){
        this.setState({showStartTime:this.GetTime(this.state.startTime)});
        this.setState({showEndTime:this.GetTime(this.state.endTime)});
    }
    
    
    
    onChangeDate  ( selectedDate){
        const currentDate = selectedDate || date;
        this.setState({selectdate:currentDate});
    };
    onChangeStartTime ( selectedDate){
        const currentDate = selectedDate || date;
        this.setState({startTime:currentDate,showStartTime:this.GetTime(currentDate)});
    };
    onChangeEndTime ( selectedDate){
        const currentDate = selectedDate || date;
        this.setState({endTime:currentDate,showEndTime:this.GetTime(currentDate)});
    };
    render() {
        const { colors } = this.props;

        return (
            <View style={{width:'100%',height:'100%'}}>
            
            <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity style={{borderWidth:0.5,borderRadius:10,height:50,flex:1,marginEnd:10,justifyContent:'center',backgroundColor:'white'}} onPress={()=>this.setState({showDateTime:1})}>
            <Text style={{alignSelf:'center',fontSize:18,fontWeight:'500'}} >{this.state.selectdate.getDate() + "-" + (this.state.selectdate.getMonth() + 1) + "-" + this.state.selectdate.getFullYear()}</Text>
            </TouchableOpacity>
            {/* <Fontisto name='date' size={30} color='black'/> */}
            </View>
            
            {this.state.showDateTime==1 && 
                <DateTimeShower
                dateIn={this.state.selectdate}
                mode='date'
                onClose={date => {
                    if (date && Platform.OS !== 'ios') {
                        this.setState({ showDateTime: 0, date: (date) });
                    } else {
                        this.setState({ showDateTime: 0 });
                    }
                }
            }
            onChange={this.onChangeDate}
            />
        }
        <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
        {/* <Text style={{flex:0.3,paddingLeft:'10%'}}>Time</Text> */}
        <Text style={{}}>{'Start Time'}</Text>
        {UIElements.drawGapH(15)}
        <TouchableOpacity style={{borderWidth:0.5,borderRadius:10,flex:0.5,height:50,marginEnd:10,justifyContent:'center',backgroundColor:'white'}} onPress={()=>this.setState({showDateTime:2})}>
        <Text style={{alignSelf:'center',fontSize:18,fontWeight:'500'}}>{this.state.showStartTime}</Text></TouchableOpacity>
        <Text>{'End Time'}</Text>
        {UIElements.drawGapH(10)}
        <TouchableOpacity style={{borderWidth:0.5,borderRadius:10,flex:0.5,height:50,justifyContent:'center',backgroundColor:'white'}} onPress={()=>this.setState({showDateTime:3})}>
        <Text style={{alignSelf:'center',fontSize:18,fontWeight:'500'}}>{this.state.showEndTime}</Text></TouchableOpacity>
        </View>
        
        {(this.state.showDateTime==2||this.state.showDateTime==3) && 
            <DateTimeShower
            dateIn={this.state.showDateTime==3?this.state.endTime:this.state.startTime}
            mode='time'
            onClose={date => {
                if (date && Platform.OS !== 'ios') {
                    this.setState({ showDateTime: 0, date: (date) });
                } else {
                    this.setState({ showDateTime: 0 });
                }
            }
        }
        onChange={this.state.showDateTime==3?this.onChangeEndTime:this.onChangeStartTime}
        />
    }
    <View style={{width:'100%',height:50,flexDirection:'row',}}>
    
    <TouchableOpacity onPress={()=>this.setState({uiOption:1})}  style={styles.tabbutton}  ><Text style={{alignSelf:'center',color:'black',fontSize:20,fontWeight:'bold'}}>Sports</Text></TouchableOpacity>
    </View>
    <FlatGrid 
    style={{margin:10}}
    itemDimension={100}
    data={this.state.gamesList}
    renderItem={({ item }) => (<View style={{flexDirection:'row'}} >
    <CheckBox 
    boxType={'square'}
    tintColor={'gray'}
    onCheckColor={colors.sportColor}
    // onFillColor={colors.appcolor}
    onTintColor={colors.sportColor}
    disabled={false}
    value={false}
    onValueChange={(val) => {this.setState({valie:val})}}
    />
    <Text style={{paddingLeft:5, alignSelf:'center'}} >{item.name}</Text>
    </View>)}
    />
    
    <View style={styles.header} >
    <TouchableOpacity style={[styles.button,{backgroundColor:colors.background}]} onPress={this.clearAllFilter}>
    <Text >CLEAR ALL</Text></TouchableOpacity>
    <TouchableOpacity style={[styles.button,{backgroundColor:'#fbbc04'}]} onPress={()=>{this.props.navigation.goBack()}}>
    <Text >APPLY</Text></TouchableOpacity>
    </View>
    </View>
    )
}
clearAllFilter(){
    
}
GetTime(dateIn) {
    
    // Creating variables to hold time.
    var date, TimeType, hour, minutes, seconds, fullTime;
    
    // Creating Date() function object.
    date = dateIn;
    
    // Getting current hour from Date object.
    hour = date.getHours(); 
    
    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if(hour <= 11)
    {
        
        TimeType = 'AM';
        
    }
    else{
        
        // If the Hour is Not less than equals to 11 then Set the Time format as PM.
        TimeType = 'PM';
        
    }
    
    
    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if( hour > 12 )
    {
        hour = hour - 12;
    }
    
    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
    if( hour == 0 )
    {
        hour = 12;
    } 
    
    
    // Getting the current minutes from date object.
    minutes = date.getMinutes();
    
    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if(minutes < 10)
    {
        minutes = '0' + minutes.toString();
    }
    
    
    //Getting current seconds from date object.
    seconds = date.getSeconds();
    
    // If seconds value is less than 10 then add 0 before seconds.
    if(seconds < 10)
    {
        seconds = '0' + seconds.toString();
    }
    
    
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString()+' ' +TimeType.toString();// + ':' + seconds.toString() + ' ' + TimeType.toString();
    console.log(fullTime);
    
    return fullTime;
}
}
const styles= StyleSheet.create({
    
    header:{
        position:'absolute',bottom:0,
        flexDirection:'row',justifyContent:'space-around',
        // ,height:'15%'
    },title:{
        padding:16,
        // padding:15,
        fontSize:15,
        flex:1,
        // color:'gray'
    }
    ,button:{
        padding:16,
        fontSize:15,
        // color:'gray',
        justifyContent:'center',alignItems:'center',
        width:'50%',
        // backgroundColor:this.props.colors.sportColor,
        fontWeight:'500'
    },tabbutton:{
        backgroundColor:'transparent',
        flex:1,justifyContent:'center',
    }
})
