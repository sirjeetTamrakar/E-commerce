import React, {useState} from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@material-ui/core'
import Review from './Review'

const Payment = ({ token, back, details, Checkout, next }) =>
{
	// const [stripePromise, setStripePromise] = useState(() =>
	// 	loadStripe(process.env.STRIPE_KEY)
	// );

	const stripePromise = loadStripe(process.env.STRIPE_KEY);
	const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
				line_items: token.live.line_items,
				customer: {
					firstname: details.first_name,
					lastname: details.last_name,
					email: details.email,
					phone: details.phone,
				},
				shipping: {
					name: "Shiiping",
					address: details.address,
					town_city: details.city,
					zip: details.zip,
					street: details.shippingSubdivision,
					country: details.shippingCountry,
				},
				billing: {
					name: "Billing",
					town_city: details.city,
					postal_zip_code: details.zip,
					street: details.shippingSubdivision,
					country: details.shippingCountry,
					county_state: details.shippingSubdivision,
				},
				fulfillment: {shipping_method: "ship_7ZAMo1ey1oNJ4x"},
				payment: {
					gateway: "stripe",
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};
			
		Checkout(token.id, orderData);
		console.log(orderData)
				  next();
      };
    }


	// const handleSubmit = async (event, elements, stripe) =>
	// {
	// 	event.preventDefault()
	// 	if (!stripe || elements) return
	// 	const cardElement = elements.getElement(CardElement)
	// 	const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })
		
	// 	if (error)
	// 	{
	// 		console.log(error)
	// 	}
	// 	else
	// 	{
			// const orderData = {
			// 	line_items: token.live.line_items,
			// 	customer: { firstname: details.first_name, lastname: details.last_name, email: details.email, phone: details.phone },
		 	// 	shipping: { name: 'Main', address: details.address, city: details.city, zip: details.zip },
			// 	payment: {
			// 		gateway: 'stripe',
			// 		stripe: {
			// 			payment_method_id: paymentMethod.id
			// 		}
			// 	}
			// }
	// 		Checkout(token.id, orderData)
	// 		console.log(orderData)
	// 		next()
	// 	}
	// }
    return (
			<div>
				<Review token={token} />
				<h3>Payment Method</h3>
				<Elements stripe={stripePromise}>
					<ElementsConsumer>
					{({ elements, stripe }) => (
							<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
								<CardElement />
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginTop: "3rem",
									}}
								>
									<Button variant='outlined' onClick={back}>Back</Button>
									<Button variant='contained' color='primary' type='submit' disabled={!stripe}>
										Pay Now
									</Button>
								</div>
							</form>
						)}
					</ElementsConsumer>
				</Elements>
			</div>
		);
}

export default Payment
