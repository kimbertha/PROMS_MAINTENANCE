import { useState } from 'react'

export const useModal = (init = false): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] => {   
  const [isOpen, setIsOpen] = useState(init)   

  const toggleModal: () => void = () => setIsOpen(!isOpen) 

  return [isOpen, setIsOpen, toggleModal] 
}