import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    autoComplete: "on",
                    placeholder: "Your password"
                },
                value: "",
                autocomplete: "on",
                validation: {
                    required: true,
                    minLength: 3

                },
                valid: false,
                touched: false
            }
        }, isSignUp: true
    }

    submitFormHandler = (event) => {

        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    checkValidity(value, rules) {

        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (rules.minLength) { isValid = value.length >= rules.minLength && isValid }

        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.maxLength) { isValid = value.length <= rules.maxLength && isValid }
        return isValid
    }

    inputChangeHandler = (event, formIdentifier) => {


        const updatedControlls = {
            ...this.state.controls,
            [formIdentifier]: {
                ...this.state.controls[formIdentifier],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[formIdentifier].validation)
            }
        }
        this.setState({ controls: updatedControlls })
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formArray = []
        for (let key in this.state.controls) {
            formArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formArray.map(element => {

            return < Input key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangeHandler(event, element.id)}
            />

        }

        )

        if (this.props.loading)
            form = <Spinner />

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (<h4 className={classes.error}>
                {this.props.error}
            </h4>)
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitFormHandler} >
                    {form}
                    <Button btnType="Success"> SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"> Switch to {this.state.isSignUp ? 'Sign In' : 'Sign up'}
                </Button>
            </div>
        )
    }
}


const mapStateToProps = state => {

    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const dispatchMapToProps = dispatch => {

    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}


export default connect(mapStateToProps, dispatchMapToProps)(Auth)

