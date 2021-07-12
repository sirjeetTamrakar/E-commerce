import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const Payment = ({token}) => {
    return (
			<div>
				<h2>Payment</h2>
				<Review token={token} />
			</div>
		);
}

export default Payment
