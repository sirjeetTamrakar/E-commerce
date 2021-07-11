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
				<div className={styles.main}>
					{products.map(product => (
						<div className={styles.card} key={product.id}>
							<Link href={`/products/${product.permalink}`}>
								<Image
									src={product.media.source}
									height={200}
									width={300}
									objectFit='cover'
									alt={product.name}
								/>
							</Link>
							<h2>{product.name}</h2>
							<b>Rs. {product.price.formatted}</b>
							{/* <small dangerouslySetInnerHTML={{ __html: product.description.slice(0, 100) }}/> */}
							<div
								className={styles.buttons}
								onClick={() => (onAddToCart(product.id, 1), setAlert(true))}
								title='Add To Cart'
							>
								<span className='material-icons'>add_shopping_cart</span>
								<div>ADD TO CART</div>
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
