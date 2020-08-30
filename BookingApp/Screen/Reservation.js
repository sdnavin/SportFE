import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { appTheme, colors } from '../constants/AppColors'
import { ButtonGroup } from 'react-native-elements'
import { color } from 'react-native-reanimated'

import { SliderBox } from "react-native-image-slider-box";

// const component1 = () => <Text>Details</Text>
// const component2 = () => <Text>Booking</Text>
// const component3 = () => <Text>Maps & Hours</Text>

export default class Reservation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
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
    

    render() {
        var myInfo=this.props.route.params.facilityInfo;
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
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                />
                </>
            )}
            </View>
            )
        }
    }
    