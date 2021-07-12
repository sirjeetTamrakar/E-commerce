import Image from 'next/image'
import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const Review = ({token}) => {
    return (
			<div>
				<h3>Order Summary</h3>
				{token.live.line_items.map(product => (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							borderBottom: "0.1px solid grey",
							margin: "1rem",
							padding: ".5rem 0",
						}}
						key={product.name}
					>
						<div style={{cursor: "pointer"}}>
							<Link href={`/products/${product.permalink}`} passHref>
								<Image
									src={product.media.source}
									height={100}
									width={100}
									objectFit='contain'
								/>
							</Link>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<h3>{product.name}</h3>
							<p>{`Quantity: ${product.quantity}`}</p>
						</div>
						<b>Rs. {product.line_total.formatted}</b>
					</div>
				))}
				<h2>Total: Rs. {token.live.subtotal.formatted}</h2>
				<Button variant='outlined'>
					<Link href='/checkout'>Back</Link>
				</Button>
			</div>
		);
}

export default Review
