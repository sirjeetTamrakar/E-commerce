import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'
import Products from '../components/Products'
import Link from 'next/link'

const Home = () =>
{
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState({})

	const fetchProducts = async () =>
	{
		const { data } = await commerce.products.list()
		setProducts(data)
	}

	const fetchCart = async () =>
	{
		const cart = await commerce.cart.retrieve()
		setCart(cart)
	}

	const handleAddToCart = async (productId, quantity) =>
	{
		const item = await commerce.cart.add(productId, quantity)
		setCart(item.cart)
	}

	useEffect(() =>
	{
		fetchProducts()
		fetchCart()
	}, [])
	
	console.log(cart)

  	return (
			<div>
				<Products products={products} onAddToCart={handleAddToCart} />
		</div>
	);
}

export default Home
