import React, {useState, useEffect} from "react";
import { commerce } from "../lib/commerce";
import Link from 'next/link';
import Image from 'next/image' 
import styles from '../styles/Cart.module.css'


const Cart = () =>
{
	const [cart, setCart] = useState({});

	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
	};

	console.log(cart)
	useEffect(() => {
		fetchCart();
	}, []);

		const handleUpdate = async (productId, quantity) => {
			const {cart} = await commerce.cart.update(productId, {quantity});
			setCart(cart);
		};

		const handleRemove = async (productId) => {
			const {cart} = await commerce.cart.remove(productId);
			setCart(cart);
		};

		const handleEmptyCart = async () => {
			const {cart} = await commerce.cart.empty();
			setCart(cart);
		};


	const EmptyCart = () =>
	(
		<>
			Your cart is empty!
			<Link href='/'>
				<button>Shop Now</button>
			</Link>
		</>
	)

	if (!cart.line_items) return 'loading...'
	const CartList = () => (
		<>
			{cart.line_items.map(item => (
				<div className={styles.card} key={item.id}>
					<Link href={`/products/${item.permalink}`} passHref>
						<Image
							src={item.media.source}
							height={200}
							width={300}
							objectFit='cover'
							alt={item.name}
						/>
					</Link>
					<div>
						<div>{item.name}</div>
						<h3>Rs. {item.line_total.formatted}</h3>
						<p style={{color: "gray"}}>
							(Rs. {item.price.formatted} x {item.quantity})
						</p>
						<small dangerouslySetInnerHTML={{__html: item.description}} />
						<div className={styles.buttons1}>
							<div className={styles.button1}>
								<span
									className='material-icons'
									onClick={() => handleUpdate(item.id, item.quantity - 1)}
								>
									{item.quantity === 1 ? "delete_outline" : "remove"}
								</span>
								<b>{item.quantity}</b>
								<span
									className='material-icons'
									onClick={() => handleUpdate(item.id, item.quantity + 1)}
								>
									add
								</span>
							</div>
							<button onClick={() => handleRemove(item.id)}>REMOVE</button>
						</div>
					</div>
				</div>
			))}
		</>
	);
	return (
		<div className={styles.center}>
			<h1>Your Cart</h1>
			{cart.line_items.length && (
				<>
					<h1>Your Cart</h1>
					<div className={styles.options}>
						<h2>Total : Rs. {cart.subtotal.formatted}</h2>
						<div className={styles.buttons}>
							<button onClick={handleEmptyCart}>EMPTY CART</button>
							<button>
								<Link href='/checkout'> CHECKOUT</Link>
							</button>
						</div>
					</div>
				</>
			)}
			<div className={styles.main}>
				{!cart.line_items.length ? <EmptyCart /> : <CartList />}
			</div>
		</div>
	);
}

export default Cart
