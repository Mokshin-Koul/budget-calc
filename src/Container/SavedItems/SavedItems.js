import React, { Component } from 'react';
import SavedItem from './SavedItem/SavedItem';
import classes from './SavedItems.module.css';
import  * as actionCreators from '../../store/actions/index'; 
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class SavedItems extends Component {

    componentDidMount() {
        this.props.onSave(this.props.token,this.props.userId);
    }

    showBudget = id => {
        const budgetArray = this.props.saveList.filter(current => {
            return current.keyValue === id
        });
        console.log(budgetArray);
        this.props.setSaveListDisplay();
        this.props.setBudget(budgetArray[0]);
    }

    render() {

        let items = <p>There are no saved Items!!</p>
        let redirect = <Redirect to="/"/>
        if (this.props.loading) {
            items = <Spinner />;
        }
        if(this.props.saveList) {
            items = this.props.saveList.map(current => {
                return <SavedItem key={current.keyValue} total={current.total} date={current.date} showBudget={() => this.showBudget(current.keyValue)}/>
            });
        }

        return (
            <div className={classes.SavedItems}>
                {this.props.budgetRedirect ? redirect : null}
                {items}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        saveList: state.saved.saved,
        loading: state.saved.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        budgetRedirect: state.budget.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSave: (token,userId) => dispatch(actionCreators.save(token,userId)),
        setBudget: budget => dispatch(actionCreators.showBudget(budget)),
        setSaveListDisplay: () => dispatch(actionCreators.saveListDisplay())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SavedItems);