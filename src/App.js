import Layout from "./Layout/Layout";
//import classes from './App.module.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BudgetCalculator from './Container/BudgetCalculator/BudgetCalculator';
import SavedItems from "./Container/SavedItems/SavedItems";
import Auth from "./Container/Auth/Auth";
import Logout from './components/Logout/Logout';
import React,{ Component } from "react";
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

class  App extends Component {

  componentWillMount() {
    this.props.onAuthStateCheck();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <Layout>
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/auth" component={Auth} />
              <Route path="/saved" component={SavedItems} />
              <Route path="/" component={BudgetCalculator}/>
              </Switch>
            </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStateCheck: () => dispatch(actionCreators.authStateCheck())
  }
}

export default connect(null,mapDispatchToProps)(App);
