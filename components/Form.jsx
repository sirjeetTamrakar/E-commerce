import React, {useState} from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import Address from './Address'
import Payment from './Payment'
// import Confirmation from './Confirmation'
import styles from '../styles/Form.module.css'

const steps = ['Shipping Address', 'Payment Details']

const Form = () =>
{
    const [active, setActive] = useState(0)

    const Confirmation = () => (
        <div>
            Confirm
        </div>
    )

    const Checkout = () =>
        active === 0 ?
            <Address /> :
            <Payment/>
    return (
        <div className={styles.paper}>
            <h1>Checkout</h1>
            <Stepper activeStep={active}>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {active === steps.length ? <Confirmation/> : <Checkout/>}
        </div>
    )
}

export default Form
