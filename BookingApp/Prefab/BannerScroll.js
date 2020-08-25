import React, { Component } from 'react'
import { View, ScrollView,StyleSheet,Image,Dimensions, SafeAreaView } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class BannerScroll extends Component {
    
    constructor(props){
        super(props);
        this.state={
            position:screenWidth
        }
        this.AutoScroll=this.AutoScroll.bind(this)
    }
    componentDidMount() {
        this.activeInterval=setInterval(
            this.AutoScroll ,4000
            )
        }
        componentWillUnmount(){
            clearInterval(this.activeInterval);
        }
        AutoScroll(){
            this.scrollView.scrollTo({ x: this.state.position, animated: true })
            this.setState({position:this.state.position+screenWidth},()=>{
                if((this.state.position)>(screenWidth*this.props.images.length)){
                    this.scrollView.scrollTo({ x: 0, animated: true })
                    this.setState({position:0});
                }
            })
        }
        render() {
            return (
                <SafeAreaView style={styles.scrollViewStyle}>
                <ScrollView
                ref={ref => this.scrollView = ref}
                horizontal={true}
                contentContainerStyle={ styles.contentScrollViewStyle }
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                >
                {
                    this.props.images.map((image,index) => {
                        return (<Image style={styles.bannerImage} key={index} source={image.image} width={screenWidth} height={300}/>);
                    })
                }
                </ScrollView></SafeAreaView>
                )
            }
        }
        const styles = StyleSheet.create({
            bannerImage:{
                alignSelf:'center'
            },
            scrollViewStyle:{
                alignContent:'center',
                height:'35%'
            },
            contentScrollViewStyle:{
                flexDirection: 'row',
                overflow:'hidden',
            }
        });
        