import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const ReactForm = ({ name, label, required, sm }) =>
{
    const { control } = useFormContext()
    
    return (
			<Grid item xs={12} sm={sm}>
				<Controller
					render={({field}) => (
					<TextField {...field} defaultValue='' label={label} fullWidth required={required}/>
					)}
					control={control}
					name={name}
				/>
			</Grid>
		);
}

export default ReactForm
