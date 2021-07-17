import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from "next/link";
import styles from "../styles/Products.module.css";

const Products = ({ products, onAddToCart}) =>
{
	const [alert, setAlert] = useState(false)
	const [loading, setLoading] = useState(false);	

	useEffect(() =>
	{
		const timeout = setTimeout(() =>
		{
			setAlert(false)
		}, 1000)
		return () => clearTimeout(timeout)
	}, [alert])

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading)
		return (
			<div
				style={{
					minHeight: "70vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Image
					src='/loading2.gif'
					height={700}
					width={700}
					objectFit='cover'
					alt='sagdhad'
				/>
			</div>
		);
	return (
		<>
			<div className={styles.center}>
				<h1>PRODUCTS</h1>
				<div className={styles.main}>
					{products.map(product => (
						<div className={styles.card} key={product.id}>
							<Link href={`/products/${product.permalink}`} passHref>
								<span onClick={() => setLoading(true)}>
									<Image
										src={product.media.source}
										className={styles.img}
										height={710}
										width={710}
										objectFit='cover'
										alt={product.name}
									/>
								</span>
							</Link>
							<div className={styles.info}>
								<h2>{product.name}</h2>
								<b>Rs. {product.price.formatted}</b>
								<div className={styles.btns}>
									<div
										className={styles.buttons}
										onClick={() => (onAddToCart(product.id, 1), setAlert(true))}
										title='Add To Cart'
									>
										<div>Add to Cart</div>
									</div>
									<Link href={`/products/${product.permalink}`} passHref>
										<div
											className={styles.details}
											onClick={() => setLoading(true)}
										>
											View
										</div>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.flex}>
				{alert && <p className={styles.alert}>Item added to cart!</p>}
			</div>
		</>
	);
}

export default Products
