import { update_Profile,update_Loading,update_Claims,update_Redeem,get_Locale, update_MemberID, update_AccessToken,update_onDismiss,update_Network} from './action-types'
import { combineReducers } from 'redux';
// import profiledata from '../../../Data/profileData.json'

const initialState = {
    profile: {},
    claims:{},
    memberID:'',
    accessToken:'',
    isLoading:false,
    locale:'',
    onExitDismiss:{},
    isConnected:true,
};

const profileReducer = (state = initialState, action) => {
   
    if(action.type === update_Profile){
        return{
            ...state,profile:action.payload
        }
    }else if(action.type === update_Claims){
        return{
            ...state,claims:action.payload
        }
    }else if(action.type === update_Redeem){
        return{
            ...state,redeem:action.payload
        }
    }
    else if(action.type === update_Loading){
        return{
            ...state,isLoading:action.stateIn
        }
    }
    else if(action.type === update_MemberID){
        return{
            ...state,memberID:action.payload
        }
    }
    else if(action.type === update_AccessToken){
        return{
            ...state,accessToken:action.payload
        }
    }else if(action.type === update_onDismiss){
        return{
            ...state,onExitDismiss:action.stateIn
        }
    }else if(action.type === update_Network){
        return{
            ...state,isConnected:action.stateIn
        }
    }else if(action.type === get_Locale){
        return{
            ...state,locale:action.payload
        }
    }
    // console.log("check "+ (action.payload));
    return state;
};

export default combineReducers({
    profileReducer,
});
