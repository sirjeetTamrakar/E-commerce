import React, {useState, useEffect} from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import Address from './Address'
import Payment from './Payment'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import {commerce} from '../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Form = () =>
{
    const [active, setActive] = useState(0)
    const [cart, setCart] = useState({});
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState({})
    const [order, setOrder] = useState({})
    const [error, setError] = useState('')


	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
    };
    
	useEffect(() => {
		fetchCart();
    }, []);
    

    useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				setToken(token);
			} catch (error) {}
		};
        generateToken();
    }, [cart]);

    const refreshCart = async () =>
    {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCheckout = async (tokens, newOrder) =>
    {
        try
        {
            const incomingOrder = await commerce.checkout.capture(tokens, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        }
        catch (error)
        {
            setError(error.data.error.message)
        }
    }

    
    const nextStep = () => setActive((prev) => prev + 1)
    const prevStep = () => setActive((prev) => prev - 1);

    const next = (data) =>
    {
        setDetails(data)
        nextStep()
    }
    
    const Confirmation = () => (
			<div>
				<h2>Thank you for choosing us</h2>
				<Image
					src='/minion.jpg'
					height={500}
					width={500}
					objectFit='contain'
					alt='sagdhad'
				/>
			</div>
		);

    console.log(order)

    const Checkout = () =>
			active === 0 ? (
				<Address next={next} token={token} />
			) : (
				<Payment
					details={details}
					token={token}
					back={prevStep}
					next={nextStep}
					Checkout={handleCheckout}
				/>
			);
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
