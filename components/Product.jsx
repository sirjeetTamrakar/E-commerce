import React, { useState, useEffect } from 'react'
import Image from 'next/link'
import {commerce} from "../lib/commerce";

const Product = ({id}) =>
{
    const [item, setItem] = useState([]);

	const fetchItem = async () => {
		setItem(await commerce.products.retrieve(id));
    };

    useEffect(() =>
    {
        fetchItem()
	}, [])
	console.log(item.media.source)
	if (!item.media) return 'Loading...'

    return (
			<div>
				{/* <Image
						src={item.media.source}
						height={200}
						width={300}
						objectFit='cover'
						alt={item.name}
					/> */}
						<div>{item.name}</div>
						<b>Rs. {item.price.formatted}</b>
			
			</div>
		);
}

export default Product
