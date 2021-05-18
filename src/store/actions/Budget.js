import * as actionType from './actionType';
import axios from '../../axios/axios';

export const income = (incomeValue,info) => {
    return {
        type: actionType.INCOME,
        value: incomeValue,
        info: info
    }
} 

export const expense = (expenseValue,info) => {
    return {
        type: actionType.EXPENSE,
        value: expenseValue,
        info: info
    }
} 

export const removeExpense = (value,description) => {
    return {
        type: actionType.REMOVE_EXPENSE,
        value: value,
        description: description
    }
}

export const removeIncome = (value,description) => {
    return {
        type: actionType.REMOVE_INCOME,
        value: value,
        description: description
    }
}

export const clearState = () => {
    return {
        type: actionType.CLEAR_STATE,
    }
}

export const submitStart = () => {
    return {
        type: actionType.SUBMIT_START
    }
}

export const submitEnd = () => {
    return {
        type: actionType.SUBMIT_END
    }
}

// export const submitBudgetSync = data => {
//     return {
//         type:
//     }
// }

export const savedRedirect = () => {
    return {
        type: actionType.SAVED_REDIRECT
    }
}

export const showBudget = budget => {
    return {
        type: actionType.SHOW_BUDGET,
        budget: budget
    }
}

export const removeSaveRedirect = () => {
    return {
        type: actionType.REMOVE_SAVE_REDIRECT
    }
}

export const submitBudget = (data,token) => {
    return dispatch => {
        dispatch(submitStart());
        axios.post("/budget.json?auth=" + token,data)
        .then(response => {
            dispatch(submitEnd());
            dispatch(savedRedirect());
        })
        .catch(error => {
            console.log(error);
        })
    }
}