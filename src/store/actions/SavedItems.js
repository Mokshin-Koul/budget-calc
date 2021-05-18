import * as actionTypes from './actionType';
import axios from '../../axios/axios';

export const saveSync = saveList => {
    return {
        type: actionTypes.SAVE_ITEM,
        data: saveList
    }
}

export const saveStart = () => {
    return {
        type: actionTypes.SAVE_START
    }
}

export const saveListDisplay = () => {
    return {
        type: actionTypes.SAVE_LIST_DISPLAY
    }
}

export const resetSaveListDisplay = () => {
    return {
        type: actionTypes.RESET_SAVE_LIST_DISPLAY
    }
}

export const save = (token,userId) => {
    return dispatch => {
        dispatch(saveStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/budget.json' + queryParams)
        .then(response => {
            console.log(response.data);
            const savedList = [];
            for(let key in response.data) {
                savedList.push({
                    incomeValue: response.data[key].income ? response.data[key].income.value : null,
                    incomeInfo: response.data[key].income ? response.data[key].income.info : null,
                    expenseValue: response.data[key].expense ? response.data[key].expense.value : null,
                    expenseInfo: response.data[key].expense ?  response.data[key].expense.info : null,
                    keyValue: key,
                    total: response.data[key].total,
                    date: response.data[key].date
                });
            }
            dispatch(saveSync(savedList));
        })
        .catch(error => {
            console.log(error);
        })
    }
}