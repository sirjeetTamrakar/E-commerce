import React, {useState} from 'react'
import { commerce } from '../lib/commerce'
import Products from '../components/Products'

export async function getStaticProps()
{
	const { data: products } = await commerce.products.list();
	return {
		props: {
			products
		},
		revalidate:5
	}
}

const Home = ({products}) =>
{
	const [cart, setCart] = useState({})

	const handleAddToCart = async (productId, quantity) =>
	{
		const {cart} = await commerce.cart.add(productId, quantity)
		setCart(cart)
	}

  	return (
			<div>
				<Products products={products} onAddToCart={handleAddToCart} />
			</div>
		);
}

export default Home
