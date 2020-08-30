import React,{Component}from 'react';
import { TouchableOpacity, Platform, Text,View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../constants/AppColors';

export default class DateTimeShower extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: this.props.dateIn,
        };
    }
    
    render() {
        const { onClose, onChange,mode,dateIn} = this.props;
        const { date } = this.state;
        return (
            <>
            <View onPress={onClose(this.state.date)}>
                {(Platform.OS === 'ios')&&<TouchableOpacity style={styles.Container} onPress={onClose(this.state.date)}>
                <Text style={{alignSelf:'center',fontSize:18,color:colors.sportColor}}>Done</Text>
                </TouchableOpacity>}
                <DateTimePicker
                value={dateIn}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
                
                style={{ backgroundColor: 'white' }}
                />
                </View>
                </>
                );
            }
        }
        
        const styles = StyleSheet.create({
            Container:{
                backgroundColor:'white',
                // position: 'absolute',
                justifyContent: 'center',
                width: '100%',
                height: 50
            },
            Header:{
                width: '100%',
                padding: 16,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'grey',
            }
        })