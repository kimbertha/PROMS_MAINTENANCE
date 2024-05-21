
import { useState, ChangeEvent, ChangeEventHandler } from 'react'

interface FieldsType {
  [key: string | symbol]: string;
}

export const useForm = (initialState: FieldsType): [FieldsType, ChangeEventHandler] => {
  const [values, setValues] = useState(initialState)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, [event.target.id]: event.target.value }) 
  
  return [ values, handleChange]
}