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
							<TextField
								fullWidth
								name={name}
								label={label}
								required={required}
							/>
					)}
					control={control}
				/>
			</Grid>
		);
}

export default ReactForm
