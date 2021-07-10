import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'
import Products from '../components/Products'


const Home = () =>
{
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState({})
	console.log(products)

	const fetchProducts = async () =>
	{
		const { data } = await commerce.products.list()
		setProducts(data)
	}

	const handleAddToCart = async (productId, quantity) =>
	{
		const {cart} = await commerce.cart.add(productId, quantity)
		setCart(cart)
	}

	useEffect(() =>
	{
		fetchProducts()
	}, [])
	

  	return (
			<div>
				<Products products={products} onAddToCart={handleAddToCart} />
			</div>
		);
}

export default Home
