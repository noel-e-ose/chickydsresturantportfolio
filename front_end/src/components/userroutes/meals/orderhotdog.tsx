import hotdog from '../../../images/hotdog.jpg'
import { Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEthers } from '@usedapp/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export const Orderhotdog = () =>{

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [orvalue, setvalue] = useState(1)

    const { account } = useEthers()

    const handleminus = () => {
        setvalue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0))
    }
    const handleplus = () => {
        setvalue(orvalue + 1)
    }
    const finalval = orvalue.toString()

    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (typeof account === 'undefined') return
        if (typeof finalval === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('cart_owner', account);
        formDataToSend.append('item_quantity', finalval);
        formDataToSend.append('item_price', '7');
        formDataToSend.append('cart_item', 'Hotdog');
        try {
            const response = await fetch('/api/addtocart', {
              method: 'POST',
              body: formDataToSend,
            });
      
            if (response.ok) {
                handleOpen()
              console.log('Data sent successfully');
            } else {
              console.error('Failed to send data');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

    return (
        <>
            <Container>
                <Row>
                    <Col >
                        <div className='mdalhldr'>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Added to Cart
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Item successfully added to cart.
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='orderhldr'>
                        <div>
                            <h2 className='hedr'>Hotdog</h2>
                            <img  src={hotdog} className='orderpic'/>
                            <div>
                                <p className='quntity'>Quantity</p>
                                <div><button className='ordrbtn' onClick={handleminus}><FontAwesomeIcon icon={faMinus} /></button> <input type="text" name='orderval' value={orvalue} className='ordrinput' /> <button className='ordrbtn' onClick={handleplus}><FontAwesomeIcon icon={faPlus} /></button></div>
                            </div>
                            <form  onSubmit={onSubmit}>
                            <div><button className='addcrtbtn'>ADD TO CART</button></div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}