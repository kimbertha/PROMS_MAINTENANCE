import react from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import './modal.scss'


interface ModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode;
  width?: string
}

const Modal = ({ isOpen, setOpen, children, width }: ModalProps) => {


  return (
    <>   
      <ChakraModal isOpen={isOpen} onClose={() => setOpen(false)} >
        <ChakraModal isOpen={isOpen} onClose={() => setOpen(false)} >
          <ModalOverlay/>
          <ModalContent className='modal-content' width={width} maxWidth='auto'>
            {children}
          </ModalContent>
        </ChakraModal>

      </ChakraModal>
    </>
    

  )

}

export default Modal