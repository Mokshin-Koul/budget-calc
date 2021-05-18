import React,{ Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Auth';

class Logout extends Component {

    componentDidMount() {
        this.props.resetAuth();
    }

    render() {
        return (
            <Redirect to="/"/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetAuth: () => dispatch(actionCreators.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);

