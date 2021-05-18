import classes from './Auth.module.css';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {

    constructor() {
        super();
        this.inputElementRef = React.createRef();
    }

    state = {
        authForm: {
            email: {
                value: ''
            },
            password: {
                isValid: false,
                rules: {
                    required: true,
                    minLength: 6,
                    upperCase: 1,
                    number: 1
                },
                value: ''
            },
            valid: false,
            touched: false
        },
        signUp: true
    }

    validity =  (password,rules) => {
        let isValid = true;
            isValid = (password.length > rules.minLength) && isValid;
            isValid = (password.findIndex(current => current === current.toUpperCase()) === -1 ? false : true) && isValid;
            isValid = (password.findIndex(current => Number.isInteger(parseInt(current))) === -1 ? false : true) && isValid;
            //console.log(this.state.passArray);
        return isValid;
    }

    passwordChangeHandler = () => {
        const passArray = [];
        for(let i in this.inputElementRef.current.value) {
            passArray.push(this.inputElementRef.current.value[i]);
        }
        const newState = {
            ...this.state,
            authForm: {
                ...this.state.authForm,
                password: {
                    ...this.state.authForm.password,
                    isValid: this.validity(passArray,this.state.authForm.password.rules),
                    value: this.inputElementRef.current.value
                },
                valid: this.validity(passArray,this.state.authForm.password.rules),
                touched: this.inputElementRef.current.value === '' ? false : true
            }
        };
        const updatedAuthForm = {
            ...newState.authForm
        }
        this.setState({
            authForm: updatedAuthForm
        })
    }

    formSubmit = event => {
        event.preventDefault();
       this.props.onFormSubmit(this.state.authForm.email.value,this.state.authForm.password.value,this.state.signUp);
       const updated = {
        ...this.state,
        authForm: {
            ...this.state.authForm,
            password: {
                ...this.state.authForm.password,
                isValid: false
            },
            email: {
                ...this.state.authForm.email.value,
                value: ''
            },
            valid: false,
            touched: false
        }
    }
    this.inputElementRef.current.value = '';
    const updatedForm = {
        ...updated.authForm
    }
    this.setState({
        authForm: updatedForm
    })
    }

    switchSignup = () => {
        this.setState({
            signUp: false
        })
    }

    switchSignIn = () => {
        this.setState({
            signUp: true
        })
    }

    emailChangeHandler = event => {
        const updated = {
            ...this.state,
            authForm: {
                ...this.state.authForm,
                email: {
                    ...this.state.authForm.email.value,
                    value: event.target.value
                }
            }
        }
        const updatedForm = {
            ...updated.authForm
        }
        this.setState({
            authForm: updatedForm
        })
    }

    render() {

        let passwordClass = null;
        let redirect = null;
        if (this.props.redirect) {
            redirect = <Redirect to="/"/>;
        }
        if (!this.state.authForm.password.isValid && this.state.authForm.touched) {
            passwordClass = classes.passwordInvalid;
        }
        let submit = <Spinner />;
        let SubmitButton = (this.state.signUp ? <button>SignUp</button> : <button>SignIn</button>);
        if(!this.props.loading) {
            submit = (this.state.signUp ? <p>already have an account ? instead <span onClick={this.switchSignup}>SignIn</span></p> : <p>Don't have an account ? instead <span onClick={this.switchSignIn}>SignUp</span></p>);
        }
        return (
            <div>
                {redirect}
                <form className={classes.Auth} onSubmit={this.formSubmit}>
                <input type="email" placeholder="Email..." onChange={this.emailChangeHandler} value={this.state.authForm.email.value}/>
                <input type="password" placeholder="password..." onChange={this.passwordChangeHandler} className={passwordClass} ref={this.inputElementRef}/>
                {this.props.loading ? null : SubmitButton}
                </form>
                <div className={classes.toggle}>
                 {submit}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        redirect: state.auth.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit: (email,password,signup) => dispatch(actionCreators.auth(email,password,signup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);