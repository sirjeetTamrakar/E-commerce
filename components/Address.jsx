import React, {useState, useEffect} from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import ReactForm from './ReactForm'
import { Grid, Button, InputLabel, Select, MenuItem } from '@material-ui/core'
import Link from 'next/link'
import {commerce} from '../lib/commerce'

const Address = ({next, token}) =>
{
	const methods = useForm()
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");


	const fetchShippingCountries = async token => {
		const {countries} = await commerce.services.localeListShippingCountries(
			token
		);

		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async countryCode => {
		const {subdivisions} = await commerce.services.localeListSubdivisions(
			countryCode
		);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};


	useEffect(() => {
		fetchShippingCountries(token.id);
	}, [token.id]);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

    return (
			<div>
				<h2>Shipping Address</h2>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(data =>
							next({...data, shippingCountry, shippingSubdivision})
						)}
					>
						<Grid container spacing={3}>
							<ReactForm label='First Name' name='first_name' required sm={6} />
							<ReactForm label='Last Name' name='last_name' required sm={6} />
							<ReactForm label='Phone Number' name='phone' required sm={6} />
							<ReactForm label='Email' name='email' required sm={6} />
							<ReactForm label='City' name='city' required sm={6} />
							<ReactForm label='ZIP / Postal Code' name='zip' required sm={6} />
							<ReactForm label='Address' name='address' required sm={12} />
							<Grid item xs={12} sm={6}>
								<InputLabel>Shipping Country</InputLabel>
								<Select
									value={shippingCountry}
									fullWidth
									onChange={e => setShippingCountry(e.target.value)}
								>
									{Object.entries(shippingCountries)
										.map(([code, name]) => ({id: code, label: name}))
										.map(item => (
											<MenuItem key={item.id} value={item.id}>
												{item.label}
											</MenuItem>
										))}
								</Select>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel>Shipping Subdivision</InputLabel>
								<Select
									value={shippingSubdivision}
									fullWidth
									onChange={e => setShippingSubdivision(e.target.value)}
								>
									{Object.entries(shippingSubdivisions)
										.map(([code, name]) => ({id: code, label: name}))
										.map(item => (
											<MenuItem key={item.id} value={item.id}>
												{item.label}
											</MenuItem>
										))}
								</Select>
							</Grid>
						</Grid>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "3rem",
							}}
						>
							<Button variant='outlined'>
								<Link href='/cart'>Back to Cart</Link>
							</Button>
							<Button variant='contained' color='primary' type='submit'>
								Next
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		);
}

export default Address
