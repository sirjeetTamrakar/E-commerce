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
	const [img, setImg] = useState(`${product.media.source}`)
	console.log(img)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [alert]);

	const handleAddToCart = async (productId, quantity) => {
		const {cart} = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	console.log(product)

	return (
		<div className={styles.main}>
			<div className={styles.image}>
				<Image
					src={img}
					height={580}
					width={580}
					objectFit='cover'
					alt={product.name}
				/>
				<div className={styles.img}>
					{product.assets.map(asset => (
						<div key={asset.id} className={styles.item}>
							<Image
								src={asset.url}
								height={55}
								width={55}
								objectFit='cover'
								alt={product.name}
								onClick={() => setImg(asset.url)}
								onMouseOver={() => setImg(asset.url)}
								// onMouseLeave={(prevState) => setImg(prevState)}
							/>
						</div>
					))}
				</div>
			</div>

			<div className={styles.info}>
				<div className={styles.head}>
					<div>
						<div className={styles.title}>{product.name}</div>
						<b>Rs. {product.price.formatted}</b>
					</div>
					<div className={styles.buttons}>
						<div
							className={styles.button}
							onClick={() => (handleAddToCart(product.id, 1), setAlert(true))}
							title='Add To Cart'
						>
							<div>ADD TO CART</div>
						</div>
						<Link href='/cart' passHref>
							<div className={styles.cart}>BUY NOW</div>
						</Link>
					</div>
				</div>
				<p dangerouslySetInnerHTML={{__html: product.description}} />
				<div className={styles.flex}>
					{alert && <p className={styles.alert}>Item added to cart!</p>}
				</div>
			</div>
		</div>
	);
}

