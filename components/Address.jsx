import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import ReactForm from './ReactForm'
import { Grid, Button, TextareaAutosize } from '@material-ui/core'
import Link from 'next/link'

const Address = ({next}) =>
{
    const methods = useForm()

    return (
			<div>
				<h2>Shipping Address</h2>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit((data) => next({data}))}>
						<Grid container spacing={3}>
							<ReactForm label='First Name' name='first_name' required sm={6}/>
							<ReactForm label='Last Name' name='last_name' required sm={6}/>
							<ReactForm label='Phone Number' name='phone' required sm={6}/>
							<ReactForm label='Email' name='email' required sm={6}/>
							<ReactForm label='City' name='city' required sm={6}/>
							<ReactForm label='ZIP / Postal Code' name='zip' required sm={6}/>
							<ReactForm label='Address' name='zip' required sm={12}/>
	
						</Grid>
						<br />
						<div style={{display: "flex", justifyContent: "space-between"}}>
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
