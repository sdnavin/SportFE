import React, { Component } from 'react'
import BannerScroll from '../Prefab/BannerScroll';
import * as UIElements from '../Tools/UIElements'
import StartBanner from '../Prefab/StartBanner';
import { ScrollView } from 'react-native';
import Api from '../constants/ApiLink';

// const arr=[{image:require('../assets/sport01.jpg')},{image:require('../assets/sport02.jpg')},{image:require('../assets/sport03.jpg')},{image:require('../assets/sport04.jpg')}];

const getSportsFromApiAsync = async () => {
    try {
      let response = await fetch(Api.getGames);
      let jsonObj = await response.text();
      console.log(jsonObj);
      global.sports=(JSON.parse(jsonObj));
    //   return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  const getLocationFromApiAsync = async () => {
    try {
      let response = await fetch(Api.getLocations);
      let json = await response.text();
      console.log(json);
      global.locations=(JSON.parse(json));
    //   return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
export default class HomeScreen extends Component {



    componentDidMount(){
        getSportsFromApiAsync();
        getLocationFromApiAsync();

    }

    

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
