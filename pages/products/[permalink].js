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

		const {data: products} = await commerce.products.list();

	
	return {
		props: {
			product,
			products
		},
		revalidate:5
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
		fallback: 'blocking',
	};
}



export default function ProductPage({ product, products })
{
	const [cart, setCart] = useState({});
	const [alert, setAlert] = useState(false);
	const [loading, setLoading] = useState(false);	
	const [img, setImg] = useState(`${ product.media.source }`)
	

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [alert]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 6000);
		return () => clearTimeout(timeout);
	}, [loading]);

	useEffect(() =>
	{
		setImg(`${product.media.source}`);
	}, [product.id])



	const handleAddToCart = async (productId, quantity) => {
		const {cart} = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	if (loading) return<div style={{minHeight: "70vh", display:'flex',alignItems:'center', justifyContent:'center'}}>
														<Image
															src='/loading.gif'
															height={700}
															width={700}
															objectFit='cover'
															alt='sagdhad'
														/>
													</div>


	return (
		<>
			<div className={styles.main}>
				<div className={styles.image}>
					<Image
						src={img}
						height={580}
						width={580}
						objectFit='contain'
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
									onMouseEnter={() => setImg(asset.url)}
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
								<div
									className={styles.cart}
									onClick={() => (
										handleAddToCart(product.id, 1)
									)}
								>
									BUY NOW
								</div>
							</Link>
						</div>
					</div>
					<p dangerouslySetInnerHTML={{__html: product.description}} />
					<div className={styles.flex}>
						{alert && <p className={styles.alert}>Item added to cart!</p>}
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					width: "90%",
					margin: "0 auto",
					paddingTop: "2rem",
				}}
			>
				<h2>More Products</h2>
			</div>
			<div className={styles.suggestion}>
				{products.map(prod => (
					<div className={styles.card1} onClick={() => setLoading(true)} key={prod.id}>
						<Link href={`/products/${prod.permalink}`} passHref>
							<Image
								src={prod.media.source}
								className={styles.img1}
								height={1600}
								width={1300}
								objectFit='cover'
								alt={prod.name}
							/>
						</Link>
						<div className={styles.info1}>
							<h4>{prod.name}</h4>
							<b>Rs. {prod.price.formatted}</b>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

