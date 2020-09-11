import React, { Component } from 'react'
import BannerScroll from '../Prefab/BannerScroll';
import * as UIElements from '../Tools/UIElements'
import StartBanner from '../Prefab/StartBanner';
import { ScrollView, View,Dimensions, SafeAreaView, Linking } from 'react-native';
import Api from '../constants/ApiLink';
import { SliderBox } from 'react-native-image-slider-box';
import { Text } from 'react-native-elements';
import { colors } from '../constants/AppColors';
const { width } = Dimensions.get('window');
import HeaderTitle from './HeaderTitle';

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
  
  constructor(props){
    super(props);
    this.state={
      homeslides:[],
      homeslideImages:[]
    }
  }
  
  componentDidMount(){
    getSportsFromApiAsync();
    getLocationFromApiAsync();
    this.getHomeSlidesFromApiAsync();
  }
  getHomeSlidesFromApiAsync = async () => {
    try {
      let response = await fetch(Api.homeSlides);
      let json = await response.text();
      console.log(json);
      let homeslides=JSON.parse(json);
      let allimages=[];
      homeslides.map((item,index)=>{
        allimages.push(item.image);
      });
      this.setState({homeslides,homeslideImages:allimages});
      //   return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  OpenBanner(index){
      Linking.openURL(this.state.homeslides[index].link);
  }
  
  render() {
    
    return (
      <>
      <HeaderTitle User={this.props.User}/>
      {/* <BannerScroll images={arr}/> */}
      <ScrollView style={{backgroundColor:colors.bgColor}} >
      {UIElements.drawGapV(10)}
      <View style={{width:'100%',justifyContent:'center',padding:10}}>
      <SliderBox
      autoplay
      circleLoop
      parentWidth={width-20}
      sliderBoxHeight={230}
      dotColor={colors.yellowColor}
      // inactiveDotColor="#90A4AE"
      ImageComponentStyle={{backgroundColor:colors.bgColor,borderWidth:3, borderRadius: 15, width: '100%',alignSelf:'center',}}
      imageLoadingColor={colors.bgColor}
      images={this.state.homeslideImages}
      onCurrentImagePressed={index => {this.OpenBanner(index)}}
      currentImageEmitter={index => {}}/></View>
      <StartBanner navigation={this.props.navigation}/>
      </ScrollView>
      </>
      )
    }
  }
  