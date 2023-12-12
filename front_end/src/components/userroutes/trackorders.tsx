import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEthers } from '@usedapp/core';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack} from '@mui/material';
import { Alert } from '@mui/material';



export const Trackorders = () =>{
    const {account} = useEthers()

    const isConnected = account !== undefined

    const [userorders, setuserorders] = useState<Array<any>>([]);
    const [issuffecient, setInsuffecient] = useState(false);



    useEffect(() => {
        const fetchUserorders = async () => {
          try {
            const response = await fetch(`/api/orderdetails/${account}`);
            if (response.ok) {
              const data = await response.json();
              setuserorders(data);
            } else {
              console.error('Error fetching profile:', response.status);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };

        if (isConnected) {
            fetchUserorders()
        }
      }, [account]);



      const handleDeleteOrder = async (OrderNo: any) => {
        try {
            const response = await fetch(`/api/orderdetails/delete/${OrderNo}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setInsuffecient(true)
            } else {
                console.error('Error deleting order:', response.status);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };







    return (
        <>
            <Container className="orderhldrxx">
                <Row>
                    <Col>
                        <div>
                            {issuffecient && <div className="success-message"><Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Thanks for trusting us with your Order</Alert>
                            </Stack></div>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <div>
                                {userorders && userorders.length > 0 ? (
                                    <div >
                                        {userorders.map((orders, index) => (
                                            <div key={index} className="divhldrxx" >
                                                <div className="ordrtitl">Order Id: {orders.Order_id}</div>
                                                <div className="txtodrd">Item : {orders.Orderitem}</div>
                                                <div className="txtodrd">status : {orders.Orderstatus}</div>
                                                <div><button  onClick={() => handleDeleteOrder(orders.OrderNo)} className="delivbtn" >Delivered</button></div>
                                            </div>
                                            ))}
                                    </div>
                                ) : (
                                        <div className='ordermidxx'>
                                            <div className='ordermidxx celling'>
                                                <p style={{textAlign:'justify', fontSize:'15px'}}>You have no active Orders, but your stomach doesn't have to be Empty. Add some items and come back here to checkout.</p>
                                                <button><Link to='menu' style={{textDecoration:'none',fontSize:'16px'}}>Place Your Order</Link></button>
                                            </div>
                                        </div>
                                )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}