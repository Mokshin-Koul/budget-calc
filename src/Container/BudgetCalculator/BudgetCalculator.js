import classes from "./BudgetCalculator.module.css";
import React, { Component } from "react";
import Input from "../../components/Input/Input";
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import IncomeItems from '../../components/IncomeItems/IncomeItems';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from "react-router";

class BudgetCalculator extends Component {

  componentDidMount() {
    this.props.onAuthRedirect();
    this.props.redirectFromSaved();
  }

    state = {
        incomeValue: '',
        expenseValue: '',
        description: ''
    }

    setDescription = event => {
      this.setState({
        description: event.target.value
      })
    }

    incomeHandler = event => {
        console.log(event.target.value);
        this.setState({
            incomeValue: event.target.value
        });
    }

    expenseHandler = event => {
        console.log(event.target.value);
        this.setState({
            expenseValue: event.target.value
        });
    }

    addIncome = () => {
      if(this.state.incomeValue && this.state.description) {
        this.props.onAddIncome(this.state.incomeValue,this.state.description);
        this.setState({
        incomeValue: '',
        description: ''
      })
      }
    }

    addExpense = () => {
      if(this.state.expenseValue && this.state.description) {
        this.props.onAddExpense(this.state.expenseValue,this.state.description);
        this.setState({
        expenseValue: '',
        description: ''
      })
      }
    }

    submitHandler = () => {

      const date = new Date();
      const format = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
      console.log(format);
      const finalData = {
        date: format,
        key: new Date().getTime(),
        income: {
          value: this.props.incomeValues,
          info: this.props.incomeInfo
        },
        expense: {
          value: this.props.expenseValues,
          info: this.props.expenseInfo
        },
        total: this.props.total,
        userId: this.props.userId
      }
      this.props.onSubmitData(finalData,this.props.token);
      this.props.onclearState();
    }

    authRedirectHandler = () => {
      this.props.history.replace('/auth');
    }

  render() {

    let button = null;
    let clearAllButton = null;
    let saved = <Redirect to="/saved"/>
    if ((!this.props.savedRedirect)) {
      saved = null;
    }
    if(this.props.total) {
      button = (this.props.token ? <button className={classes.submit} onClick={this.submitHandler}>Save</button> : <button className={classes.signupsubmit} onClick={this.authRedirectHandler}>SignUp/SignIn</button>);
      clearAllButton = <button className={classes.submit} onClick={this.props.onclearState}>Clear All</button>
    }
    if(this.props.loading) {
      button = (
        <div className={classes.Spinner}>
      <Spinner />
      </div>
      );
      clearAllButton = null;
    }

    if(this.props.saveListDisplay) {
      button = null;
    }
    if(!this.props.total) {
      this.props.resetSaveListDisplay();
    }

    return (
      <div>
        {saved}
        <div className={classes.Calc}>
         <input placeholder="Description" className={classes.input} value={this.state.description} onChange={this.setDescription}/>
          <div>
            <div>
              <Input type="income" changed={this.incomeHandler} value={this.state.incomeValue}/>
              <button onClick={this.addIncome}>Add</button>
            </div>
            <div>
              <Input type="expense" changed={this.expenseHandler} value={this.state.expenseValue}/>
              <button onClick={this.addExpense}>Add</button>
            </div>
          </div>
          <p>{this.props.total}</p>
        </div>
        <div className={classes.budget}>
          <div>
            <p className={classes.income}>INCOME</p>
            <IncomeItems items={this.props.incomeValues} desc={this.props.incomeInfo} remove={this.props.removeIncome}/>
          </div>
          <div>
            <p className={classes.expense}>EXPENSE</p>
            <IncomeItems items={this.props.expenseValues} desc={this.props.expenseInfo} remove={this.props.removeExpense}/>
          </div>
          </div>
          {button}
          {clearAllButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.budget.budget.total,
    incomeValues: state.budget.budget.income.value,
    incomeInfo: state.budget.budget.income.info,
    expenseValues: state.budget.budget.expense.value,
    expenseInfo: state.budget.budget.expense.info,
    loading: state.budget.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    savedRedirect: state.budget.savedRedirect,
    saveListDisplay: state.saved.saveListDisplay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIncome: (value,description) => dispatch(actionCreators.income(value,description)),
    onAddExpense: (value,description) => dispatch(actionCreators.expense(value,description)),
    removeExpense: (value,description) => dispatch(actionCreators.removeExpense(value,description)),
    removeIncome: (value,description) => dispatch(actionCreators.removeIncome(value,description)),
    onSubmitData: (data,token) => dispatch(actionCreators.submitBudget(data,token)),
    onclearState: () => dispatch(actionCreators.clearState()),
    onAuthRedirect: () => dispatch(actionCreators.authRedirect()),
    redirectFromSaved: () => dispatch(actionCreators.removeSaveRedirect()),
    resetSaveListDisplay: () => dispatch(actionCreators.resetSaveListDisplay())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BudgetCalculator);
