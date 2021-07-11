import { commerce } from "../../lib/commerce";
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Product.module.css'

export async function getStaticProps({params}) {
	const {permalink} = params;

	const product = await commerce.products.retrieve(permalink, {
		type: "permalink",
	});
	
	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const {data: products} = await commerce.products.list();

	return {
		paths: products.map(product => ({
			params: {
				permalink: product.permalink,
			},
		})),
		fallback: false,
	};
}



export default function ProductPage({ product })
{
	const [cart, setCart] = useState({});
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [alert]);

	const handleAddToCart = async (productId, quantity) => {
		const {cart} = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	return (
		<div className={styles.main}>
			<Image
				src={product.media.source}
				height={510}
				width={780}
				alt={product.name}
			/>
			<div className={styles.head}>
				<div>
					<h1>{product.name}</h1>
					<b>{product.price.formatted_with_symbol}</b>
				</div>
				<div className={styles.buttons}>
					<div
						className={styles.button}
						onClick={() => (handleAddToCart(product.id, 1), setAlert(true))}
						title='Add To Cart'
					>
						<span className='material-icons'>add_shopping_cart</span>
						<div>ADD TO CART</div>
					</div>
					<Link href='/cart'>Proceed to Cart</Link>
				</div>
			</div>
			<p dangerouslySetInnerHTML={{__html: product.description}} />
			<div className={styles.flex}>
				{alert && <p className={styles.alert}>Item added to cart!</p>}
			</div>
		</div>
	);
}

