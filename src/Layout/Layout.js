import React,{ Component } from 'react';
import AUX from '../HOC/Auxiliary';
import Toolbar from '../components/Toolbar/toolbar';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <AUX>
                <Toolbar auth={this.props.isAuth}/>
                <main>{this.props.children}</main>
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);