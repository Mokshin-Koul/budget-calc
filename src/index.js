import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import BudgetReducer from './store/reducers/Budget';
import savedReducer from './store/reducers/Saveditems';
import authReducer from './store/reducers/Auth';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  budget: BudgetReducer,
  saved: savedReducer,
  auth: authReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
