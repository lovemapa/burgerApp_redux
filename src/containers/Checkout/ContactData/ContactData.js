import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Loader from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'


export default class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            streetCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street Code"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Postal Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            delievery: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {
                            value: "fastest", displayValue: "Fastest"
                        },
                        {
                            value: "cheapest", displayValue: "Cheapest"
                        }
                    ]
                },
                validation: {},
                valid: true,
                value: "fastest",

            },
        }
        ,
        formIsValid: false,
        loading: false
    }

    submitFormhandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        const formData = {}
        for (let formId in this.state.orderForm) {
            formData[formId] = this.state.orderForm[formId].value
        }


        const order = {
            ingredients: this.props.ingredients,
            price: Number(this.props.price).toFixed(2),
            orderData: formData

        }

        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false })
            this.props.history.push('/')

        }).catch(err => {
            this.setState({ loading: false })

        })

    }

    checkValidity(value, rules) {

        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (rules.minLength) { isValid = value.length >= rules.minLength && isValid }

        if (rules.maxLength) { isValid = value.length <= rules.maxLength && isValid }
        return isValid
    }


    inputChangeHandler = (event, formIdentifier) => {

        const updatedorderForm = {
            ...this.state.orderForm
        }

        const OrderFormValue = {
            ...updatedorderForm[formIdentifier]
        }

        OrderFormValue.value = event.target.value
        OrderFormValue.valid = this.checkValidity(OrderFormValue.value, OrderFormValue.validation)
        OrderFormValue.touched = true

        updatedorderForm[formIdentifier] = OrderFormValue

        let isFormValid = true
        for (let identifier in updatedorderForm) {


            isFormValid = updatedorderForm[identifier].valid && isFormValid
        }
        console.log("this", isFormValid);

        this.setState({ orderForm: updatedorderForm, formIsValid: isFormValid })

    }

    render() {


        const formArray = []
        for (let key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (<form onSubmit={this.submitFormhandler}>


            {
                formArray.map(element => {

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
            }
            <Button disabled={!this.state.formIsValid} btnType="Success"> Order</Button>

        </form>)

        if (this.state.loading) {
            form = <Loader />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        )
    }
}
