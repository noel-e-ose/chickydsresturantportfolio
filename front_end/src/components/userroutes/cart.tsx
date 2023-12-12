import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import { useEthers } from '@usedapp/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { useContractFunction, useEtherBalance } from '@usedapp/core';
import { Contract, utils } from 'ethers';
import PaymentContract from '../../chain-info/contracts/PaymentContract.json';
import networkMapping from "../../chain-info/deployments/map.json";
import { constants } from 'ethers';
import {formatUnits} from "@ethersproject/units"
import {Stack} from '@mui/material';
import { Alert } from '@mui/material';
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






export const Cart = () =>{

  const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {account} = useEthers()

    const isConnected = account !== undefined

    const [cartitems, setcartitems] = useState<Array<any>>([]);

    const [cartitemstwo, setcartitemstwo] = useState<Array<any>>([]);

    const [userprofile, setuserprofile] = useState<any>()
    const [excngrate, setexcngrate] =useState<any>()
    useEffect(() => {
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
          .then(response => response.json())
          .then(data => setexcngrate(data))
          .catch(error => console.error('Error fetching va categories:', error));
      }, []);

    const { chainId } = useEthers()
    const { abi } = PaymentContract
    const fundmeaddress = chainId ? networkMapping[String(chainId)]["PaymentContract"][0] : constants.AddressZero
    const PaymentContractInterface = new utils.Interface(abi)
    const PaymentContractContract = new Contract(fundmeaddress, PaymentContractInterface)
    const {send, state} = useContractFunction(PaymentContractContract, 'makepayment')
    const ethbalance = useEtherBalance(account)
    const formatethbalance: number =ethbalance ? parseFloat(formatUnits(ethbalance, 18)) : 0
    const [issuffecient, setInsuffecient] = useState(false);
    


    useEffect(() => {
        const fetchUsercartitems = async () => {
          try {
            const response = await fetch(`/api/cartdetails/${account}`);
            if (response.ok) {
              const data = await response.json();
              setcartitems(data);
            } else {
              console.error('Error fetching profile:', response.status);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };

        if (isConnected) {
            fetchUsercartitems()
        }
      }, [account]);


    useEffect(() => {
        const fetchUsercartitemsjusttwo = async () => {
          try {
            const response = await fetch(`/api/cartdetailsjusttwo/${account}`);
            if (response.ok) {
              const data = await response.json();
              setcartitemstwo(data);
            } else {
              console.error('Error fetching profile:', response.status);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };

        if (isConnected) {
            fetchUsercartitemsjusttwo()
        }
      }, [account]);

    useEffect(() => {
        const fetchUserprofile = async () => {
          try {
            const response = await fetch(`/api/userprofile/${account}`);
            if (response.ok) {
              const data = await response.json();
              setuserprofile(data);
            } else {
              console.error('Error fetching profile:', response.status);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };

        if (isConnected) {
            fetchUserprofile()
        }
      }, [account]);

      const totalValue = cartitems.reduce((acc, item) => acc + parseFloat(item.price ) * item.quantity ,  0);

      const rate =excngrate ? excngrate.USD : '0'
    const price = totalValue
    const pi = rate>'0' ? price/rate : '0' 
    const innik = formatethbalance.toString() >= pi.toString()
    const xi = utils.parseEther(pi.toString())
    const pricexn = xi
    useEffect(() => {
        if (state.status === 'Success') {
            sendDataToBackend();
            handleOpen()
        }
      }, [state]);


      const sendDataToBackend = async () => {
        try {
          const response = await fetch(`/api/placeorder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                millo: JSON.stringify(cartitemstwo),
                ordered_byfullname: userprofile.fullname,
                order_phonenumber: userprofile.phonenumber,
                order_homeaddress: userprofile.homeaddress,
                order_amount: totalValue,
                order_status: 'processing',
                ordered_byaddress: account,
            })
          });
    
          const responseData = await response.json();
          console.log('Response from backend:', responseData);
        } catch (error) {
          console.error('Error sending data to backend:', error);
        }
      };
 
      const onSubmit =async () => {
        innik ? send({ value: pricexn }) : setInsuffecient(true)
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
                                Order Placed
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Your Order is processing please be patient
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='midtable'>
                        <div>
                        <div>
                        {issuffecient && <div className="success-message"><Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="warning">Insuffecient Funds!</Alert>
                        </Stack></div>}
                        </div>
                        <Table striped bordered hover >
                            
                                    {cartitems && cartitems.length > 0 ? (
                                      
                                    <div className='tblevi'>
                                        <div>
                                          <p className='okkkinn'>Please orders must be up to $50 and above</p>
                                          <p className='okkkinn'>wait for transaction to be successfull before leaving page</p>
                                        </div>
                                        <thead>
                                            <tr>
                                            <th className='ttal'>item quantity</th>
                                            <th className='ttal'>item name</th>
                                            <th className='ttal'>item price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {cartitems.map((cart, index) => (
                                            <tr key={index}>
                                                <td className='ttal'>{cart.quantity}</td>
                                                <td className='ttal'>{cart.item}</td>
                                                <td className='ttal'>${cart.price * cart.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr className='ttal'>
                                            <td className='ttal' >Total value</td>
                                            <td className='ttal'></td>
                                            <td className='ttal'>${totalValue}</td>
                                        </tr>
                                        </tbody>
                                        <div>
                                            <button onClick={onSubmit} className='ordrbtx'>Place Order</button>
                                        </div>
                                    </div>
                                ) : (
                                    <tbody>
                                    <tr>
                                        <td className='midtable  celling'>
                                            <p style={{textAlign:'justify', fontSize:'15px'}}>Your cart is currently empty, but your stomach doesn't have to be. Add some items and come back here to checkout.</p>
                                            <button><Link to='menu' style={{textDecoration:'none',fontSize:'16px'}}>Place Your Order</Link></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                )}
                            
                        </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}