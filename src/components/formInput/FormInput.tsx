import React from 'react'
import './form-input.scss'

import { FormControl, FormLabel,Input, FormHelperText, InputLeftAddon, InputGroup } from '@chakra-ui/react'


interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  addonLabel?: boolean;
  [x: string]: any;
  
}

const FormInput = ({
  id,
  type = 'text',
  label,
  helperText,
  disabled,
  required,
  invalid,
  placeholder,
  addonLabel,
  handleChange,
  ...other 
}: FormInputProps) => {

  return (
    <InputGroup size='sm'>
      <FormControl
        isDisabled={disabled}
        isRequired={required}
        isInvalid={invalid}
        {...other}
        display={addonLabel && 'flex'}> 
      
        {!addonLabel && <FormLabel>{label}</FormLabel>}
        {addonLabel && <InputLeftAddon>{label}</InputLeftAddon >}

        <Input
          id={id}
          autoFocus={false}
          size='sm'
          className='form-input'
          type={type}
          placeholder={placeholder}
          onChange={handleChange}/>
        
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </InputGroup>
  )
}

export default FormInput