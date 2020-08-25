import React, { Component } from 'react'
import FilterBar from '../Prefab/FilterBar'
import { FlatGrid } from 'react-native-super-grid';
import { View,Text,Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class FacilityContent extends Component {
    render() {
        return (
            <>
                <FilterBar  navigation={this.props.navigation}/>
                <View style={{borderWidth:2}}>
            <FlatGrid 
            style={{margin:10,borderWidth:0}}
            itemDimension={(screenWidth/2)-40}
            data={FacilityList}
            renderItem={({ item }) => (<View>
                <Text>{item.name}</Text>
                <Text>{item.location}</Text>
            </View>)}/>
            </View>
            </>
        )
    }
}
