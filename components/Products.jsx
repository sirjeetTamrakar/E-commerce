import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from "next/link";
import styles from "../styles/Products.module.css";

const Products = ({ products, onAddToCart}) =>
{
	const [alert, setAlert] = useState(false)

	useEffect(() =>
	{
		const timeout = setTimeout(() =>
		{
			setAlert(false)
		}, 1000)
		return () => clearTimeout(timeout)
	}, [alert])
	// console.log(products)
	return (
		<>
			<div className={styles.center}>
				<h1>PRODUCTS</h1>
				<div className={styles.main}>
					{products.map(product => (
						<div className={styles.card} key={product.id}>
							<Link href={`/products/${product.permalink}`} passHref>
								<Image
									src={product.media.source}
									className={styles.img}
									height={1080}
									width={810}
									// objectFit='cover'
									alt={product.name}
								/>
							</Link>
							<div className={styles.info}>
								<Link href={`/products/${product.permalink}`} passHref>
									<h2>{product.name}</h2>
								</Link>
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
										<div className={styles.details}>View</div>
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
