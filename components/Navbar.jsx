import React, { useState, useEffect } from 'react'
import { commerce } from '../lib/commerce';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'

const Navbar = () =>
{
	const [cart, setCart] = useState({});

	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
	};

	useEffect(() => {
		fetchCart();
	}, [cart]);
    return (
			<div className={styles.main}>
				<Link href='/'>
					<b style={{cursor:'pointer'}}>E-Commerce</b>
			</Link>
				<Link href='/cart'>
					<div className={styles.icon}>
						<span className='material-icons'>shopping_cart</span>
						<sup>{!cart.line_items ? 0 : cart.total_items}</sup>
					</div>
				</Link>
			</div>
		);
}

export default Navbar
