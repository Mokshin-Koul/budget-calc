import * as actionTypes from '../actions/actionType';

const intitialState = {
    saved: null,
      loading: false,
      saveListDisplay: false
    }

    const reducer = (state = intitialState,action) => {
        switch(action.type) {
            case actionTypes.SAVE_START: return {
                ...state,
                loading: true
            };
            case actionTypes.SAVE_ITEM: return {
                ...state,
                loading: false,
                saved: action.data
            }
            case actionTypes.SAVE_LIST_DISPLAY: return {
                ...state,
                saveListDisplay: true
            }
            case actionTypes.RESET_SAVE_LIST_DISPLAY: return {
                ...state,
                saveListDisplay: false
            }
            default: return state;
        }
    }

    export default reducer;