import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import ReactForm from './ReactForm'
import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core'
import {commerce} from '../lib/commerce'

const Address = () =>
{
    const [shippingZones, setShippingZones] = useState([])
    const [shippingZone, setShippingZone] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    return (
			<div>
				<h2>Shipping Address</h2>
				<FormProvider {...methods}>
					<form onSubmit=''>
						<Grid container spacing={3}>
							<ReactForm label='First Name' name='first_name' required />
							<ReactForm label='Last Name' name='last_name' required />
							<ReactForm label='Address' name='address' required />
							<ReactForm label='Email' name='email' required />
							<ReactForm label='City' name='city' required />
                        <ReactForm label='ZIP / Postal Code' name='zip' required />
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Zones</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Choose
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Choose
                                </MenuItem>
                            </Select>
                        </Grid> */}
						</Grid>
					</form>
				</FormProvider>
			</div>
		);
}

export default Address
