import React from 'react'
import Image from 'next/image'
import styles from "../styles/Products.module.css";

const Products = ({products, onAddToCart}) => {
    return (
			<div className={styles.center}>
				<div className={styles.main}>
					{products.map(product => (
						<div className={styles.card} key={product.id}>
							<Image
								src={product.media.source}
								height={200}
								width={300}
								objectFit='cover'
								alt={product.name}
							/>
							<h2>{product.name}</h2>
							<b>Rs. {(product.price.formatted)}</b>
							{/* <small dangerouslySetInnerHTML={{ __html: product.description.slice(0, 100) }}/> */}
							<div className={styles.buttons}>
								<div className={styles.button}>
									<span className='material-icons'>remove</span>
									<div>2</div>
									<span className='material-icons'>add</span>
								</div>
								<span
									className='material-icons'
									onClick={() => onAddToCart(product.id, 1)}
									title='Add To Cart'
								>
									add_shopping_cart
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
}

export default Products
