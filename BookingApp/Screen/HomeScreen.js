import React, { Component } from 'react'
import BannerScroll from '../Prefab/BannerScroll';
import * as UIElements from '../Tools/UIElements'
import StartBanner from '../Prefab/StartBanner';
import { ScrollView } from 'react-native';

// const arr=[{image:require('../assets/sport01.jpg')},{image:require('../assets/sport02.jpg')},{image:require('../assets/sport03.jpg')},{image:require('../assets/sport04.jpg')}];

export default class HomeScreen extends Component {


    render() {

        return (
            <>
            {/* <BannerScroll images={arr}/> */}
            <ScrollView contentContainerStyle={{padding:10}}>
            <StartBanner navigation={this.props.navigation}/>
            </ScrollView>
            </>
        )
    }
}
