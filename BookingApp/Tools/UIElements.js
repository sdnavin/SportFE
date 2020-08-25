import React from 'react';
import { StyleSheet, View } from 'react-native';



module.exports={
        drawGapV:function (valueGap){
            return(
                <View
                style={{paddingTop:((valueGap===undefined)?0:valueGap)}}/>
                );
            }, 
            drawGapH:function (valueGap){
                return(
                    <View
                    style={{paddingLeft:((valueGap===undefined)?0:valueGap)}}/>
                    );
                }, 
            
            drawLine:function (colorstr){
                return(
                    <View
                    style={{
                        borderBottomColor: colorstr,
                        borderBottomWidth: 1,
                    }}
                    />
                    );
                },
                drawLine:function (colorstr,boxWidth,width){
                    return(
                        <View
                        style={{
                            alignSelf:'center',
                            width:boxWidth,
                            borderBottomColor: colorstr,
                            borderBottomWidth: width,
                        }}
                        />
                        );
                    }
            
        }
        