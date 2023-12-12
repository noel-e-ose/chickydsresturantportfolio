import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useContractFunction, useEthers, useEtherBalance } from '@usedapp/core';
import { Link } from 'react-router-dom';
import { Contract, utils } from 'ethers';
import PaymentContract from '../../chain-info/contracts/PaymentContract.json';
import networkMapping from "../../chain-info/deployments/map.json";
import { constants } from 'ethers';
import {formatUnits} from "@ethersproject/units"
import { useState,useEffect } from 'react';

export const ViewOrders = () =>{

    const {account} = useEthers()
    const { chainId } = useEthers()
    const { abi } = PaymentContract
    const fundmeaddress = chainId ? networkMapping[String(chainId)]["PaymentContract"][0] : constants.AddressZero
    const PaymentContractInterface = new utils.Interface(abi)
    const PaymentContractContract = new Contract(fundmeaddress, PaymentContractInterface)
    const {send, state} = useContractFunction(PaymentContractContract, 'withdraw')

    const [userorders, setuserorders] = useState<Array<any>>([]);


   

      useEffect(() => {
        fetch('/adminaccess/api/getallorders')
          .then(response => response.json())
          .then(data => setuserorders(data))
          .catch(error => console.error('Error fetching va categories:', error));
      }, []);

      const handleDeleteOrder = async (OrderNo: any) => {
        if (typeof account === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('order_status', 'InTransit');
        try {
          const response = await fetch(`/adminaccess/api/updateorderstatus/${OrderNo}`, {
            method: 'POST',
            body: formDataToSend,
          });
      
          if (response.ok) {
            console.log('Data sent successfully');
          } else {
            console.error('Failed to send data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };


    return (
        <div>
            <Container>
                {account === "0x56E6c088e0cbAA252B5E42E7817648478382004A" ? (
                    <>
                    <Row>
                        <Col>
                            <div className='hldrdis'>
                                <Link to='admindashboard' className='dashmin'>Admin Dashboard</Link>
                                <Link to='viewusers' className='dashmin'>View Users</Link>
                                <Link to='vieworders'  className='dashmin'>View Orders</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div  className='bckdash'>
                                {userorders && userorders.length > 0 ? (
                                    <div >
                                        {userorders.map((orders, index) => (
                                            <div key={index} className="divhldrxx" >
                                                <div className="ordrtitl"><p  className="ordrtitl">Order Id: {orders.id}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">Item : {orders.itemordered}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">status : {orders.orderstatus}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">User Name : {orders.orderedby}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">Amount earned : {orders.orderamount}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">User walletAddress : {orders.orderwalletaddress}</p></div>
                                                <div className="txtodrd"><p  className="txtodrd">Order Homeaddress : {orders.userhomeaddress}</p></div>
                                                <div><button  onClick={() => handleDeleteOrder(orders.id)}  className="delivbtn" >Place Order In-Transit</button></div>
                                            </div>
                                            ))}
                                    </div>
                                ) : (
                                        <div className='ordermidxx'>
                                            <div className='ordermidxx'>
                                                <p style={{textAlign:'justify', fontSize:'15px'}}>You have no active Orders</p>
                                            </div>
                                        </div>
                                )}
                        </div>
                        </Col>
                    </Row>
                    </>
                ) : (
                    <div><p className='text-center' style={{ fontSize:'500'}}>404 PROFILE ACCESS NOT ALLOWED</p></div>
                )}
            </Container>
        </div>
    )

}