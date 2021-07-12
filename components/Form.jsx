import React, {useState, useEffect} from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import Address from './Address'
import Payment from './Payment'
// import Confirmation from './Confirmation'
import styles from '../styles/Form.module.css'
import {commerce} from '../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Form = () =>
{
    const [active, setActive] = useState(0)
    const [cart, setCart] = useState({});
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState({})

	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
	};
	useEffect(() => {
		fetchCart();
    }, []);
    
    console.log(cart)

    useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				console.log(token);
				setToken(token);
			} catch (error) {}
		};
        generateToken();
    }, [cart]);
    
    const nextStep = () => setActive((prev) => prev + 1)
    const prevStep = () => setActive((prev) => prev - 1);

    const next = (data) =>
    {
        setDetails(data)
        nextStep()
    }
    
    const Confirmation = () => (
        <div>
            Confirm
        </div>
    )

    const Checkout = () =>
        active === 0 ?
            <Address next={next}/> :
            <Payment setDetails={setDetails} token={token}/>
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
            {active === steps.length ? <Confirmation/> : token && <Checkout/>}
        </div>
    )
}

export default Form
