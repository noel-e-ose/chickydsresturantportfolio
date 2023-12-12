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

export const Viewusers = () =>{

    const [userdetails, setuserdetails] = useState<Array<any>>([]);

    useEffect(() => {
        fetch('/adminaccess/api/getallusers')
          .then(response => response.json())
          .then(data => setuserdetails(data))
          .catch(error => console.error('Error fetching va categories:', error));
      }, []);

    const {account} = useEthers()
    const { chainId } = useEthers()
    const { abi } = PaymentContract
    const fundmeaddress = chainId ? networkMapping[String(chainId)]["PaymentContract"][0] : constants.AddressZero
    const PaymentContractInterface = new utils.Interface(abi)
    const PaymentContractContract = new Contract(fundmeaddress, PaymentContractInterface)
    const {send, state} = useContractFunction(PaymentContractContract, 'withdraw')

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
                            <div className='bckdash'>
                                <div>
                                    <div>
                                        {userdetails.map( (users, index) => (
                                            <div className='userdihldr'>
                                                <div>{users && users.id ? (<>{users.id}</>) : (<><p>No user id set</p></>)}</div>
                                                <div>{users && users.name ? (<>{users.name}</>) : (<><p>No user name set</p></>)}</div>
                                                <div>{users && users.email ? (<>{users.email}</>) : (<><p>No user email set</p></>)}</div>
                                                <div>{users && users.phone ? (<>{users.phone}</>) : (<><p>No user phone number set</p></>)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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