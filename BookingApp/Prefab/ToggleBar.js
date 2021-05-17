import React, { Component } from 'react'
import { Alert,View,Text, StyleSheet, SafeAreaView, TextInput, ScrollView, Dimensions } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as UIElements from '../Tools/UIElements';
import AppColors from '../constants/AppColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('window');
import {TouchableOpacity} from 'react-native-gesture-handler'
import { useTheme } from '@react-navigation/native';

// Wrap and export
export default function ToggleBar(props) {
    const theme = useTheme();
    return <ToggleBarC {...props} theme={theme} />;
}

class ToggleBarC extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items,
            selected:-1
        };
        console.log(this.props.items);
        this.selectItem= this.selectItem.bind(this);
    }
    selectItem(cItem){
        var ItemSelected=this.props.itemSelected;
        ItemSelected(cItem);
        this.setState({selected:(cItem===this.state.selected)?-1:cItem});
    }
    getDiveder(cItem){
        console.log(cItem);
        let clampedValue=0;
        clampedValue = Math.max(0, Math.min(4, this.state.items.length));
        clampedValue=Math.max(((width-(15*clampedValue))/clampedValue),cItem.length*10);
        return clampedValue
    }
    render() {
        const { theme } = this.props;
        return (<>
            <SafeAreaView style={styles.header} >
            <View style={{flexDirection:'row',flex:1}} >
            <ScrollView style={{marginRight:10,alignSelf:'flex-start'}} contentContainerStyle={{justifyContent:'flex-start'}} horizontal showsHorizontalScrollIndicator={false} >
            {this.state.items.map((item,index)=>{
                var cItem=item;
                var cIndex=index;

                return( <TouchableOpacity onPress={()=>{this.selectItem(cIndex)}} key={'FTo'+index} style={{marginLeft:5, padding:5,width:this.getDiveder(cItem.name),flexDirection:'row',borderWidth:1,borderColor:this.state.selected==index?theme.colors.sportColor: theme.colors.border,borderRadius:5,justifyContent:'center'}} >
                <Text  key={'FT'+index} style={{alignSelf:'center',color:this.state.selected==index?theme.colors.sportColor:theme.colors.text }}>{item.name}</Text>
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
            height:45,
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
    
    