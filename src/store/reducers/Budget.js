import * as actionType from "../actions/actionType";

const InitialState = {
  budget: {
    income: {
        value: [],
        info: []
    },
    expense: {
        value: [],
        info: []
    },
    total: 0,
  },
  loading: false,
  savedRedirect: false,
  redirect: false
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.INCOME:
        const index = state.budget.income.info.indexOf(action.info);
        let infoArray = [...state.budget.income.info];
        let valArray = [...state.budget.income.value];
        if(index === -1) {
            infoArray = [...state.budget.income.info.concat(action.info)]
            valArray = [...state.budget.income.value.concat(action.value)]
        } else {
            alert('This Description already exists');
        }
      return {
        ...state,
        budget: {
          ...state.budget,
          income: {
              ...state.budget.income,
              value: valArray,
              info: infoArray
          },
          total: state.budget.total + (index === -1 ? parseInt(action.value) : 0),
        },
      };
    case actionType.EXPENSE:
        const indexInfo = state.budget.expense.info.indexOf(action.info);
        let descArray = [...state.budget.expense.info];
        let valueArray = [...state.budget.expense.value];
        if(indexInfo === -1) {
            descArray = [...state.budget.expense.info.concat(action.info)]
            valueArray = [...state.budget.expense.value.concat(action.value)]
        } else {
            alert('This Description already exists');
        }
      return {
        ...state,
        budget: {
          ...state.budget,
          expense: {
              ...state.budget.expense,
              value: valueArray,
              info: descArray
          },
          total: state.budget.total - (indexInfo === -1 ? parseInt(action.value) : 0),
        },
      };
      case actionType.REMOVE_EXPENSE: 
      const descIndex = [...state.budget.expense.info].indexOf(action.description);
      const descriptionArray = [...state.budget.expense.info].filter((_,index) => index !== descIndex);
      const ValArray = [...state.budget.expense.value].filter((_,index) => index !== descIndex);
      return {
        ...state,
        budget: {
          ...state.budget,
          expense: {
              ...state.budget.expense,
              value: ValArray,
              info: descriptionArray
          },
          total: state.budget.total + parseInt(action.value),
        }
      };
      case actionType.REMOVE_INCOME: 
      const DescIndex = [...state.budget.income.info].indexOf(action.description);
      const DescArray = [...state.budget.income.info].filter((_,index) => index !== DescIndex);
      const ValueArray = [...state.budget.income.value].filter((_,index) => index !== DescIndex);
      return {
        ...state,
        budget: {
          ...state.budget,
          income: {
              ...state.budget.income,
              value: ValueArray,
              info: DescArray
          },
          total: state.budget.total - parseInt(action.value),
        }
      };
      case actionType.CLEAR_STATE: return {
        ...state,
        budget: {
          ...state.budget,
          income: {
            ...state.budget.income,
            value: [],
            info: []
          },
          expense: {
            ...state.budget.expense,
            value: [],
            info: []
          },
          total: 0
        }
      };
      case actionType.SUBMIT_START: return {
        ...state,
        loading: true
      };
      case actionType.SUBMIT_END: return {
        ...state,
        loading: false,
        savedRedirect: true
      }
      case actionType.SAVED_REDIRECT: return {
        ...state,
        savedRedirect: false
      }
      case actionType.SHOW_BUDGET: return {
        ...state,
        budget: {
          ...state.budget,
          income: {
            ...state.budget.income,
            value: action.budget.incomeValue ? action.budget.incomeValue : [],
            info: action.budget.incomeInfo ? action.budget.incomeInfo : []
          },
          expense: {
            ...state.budget.expense,
            value: action.budget.expenseValue ? action.budget.expenseValue : [],
            info: action.budget.expenseInfo ? action.budget.expenseInfo : []
          },
          total: action.budget.total
        },
        redirect: true
      }
      case actionType.REMOVE_SAVE_REDIRECT: return {
        ...state,
        redirect: false
      }
    default:
      return state;
  }
};

export default reducer;
