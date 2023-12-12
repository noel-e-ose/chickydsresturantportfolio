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
import { useState, useEffect } from 'react';

export const Admindashboard = () =>{

    const {account} = useEthers()
    const { chainId } = useEthers()
    const { abi } = PaymentContract
    const fundmeaddress = chainId ? networkMapping[String(chainId)]["PaymentContract"][0] : constants.AddressZero
    const PaymentContractInterface = new utils.Interface(abi)
    const PaymentContractContract = new Contract(fundmeaddress, PaymentContractInterface)
    const {send, state} = useContractFunction(PaymentContractContract, 'withdraw')

    const [amounterned, setamounterned] = useState<Array<any>>([]);

    const ethbalance = useEtherBalance(account)

    const contractbalance = useEtherBalance(fundmeaddress)

    const formatethbalance: number =ethbalance ? parseFloat(formatUnits(ethbalance, 18)) : 0

    const formatcontractbalance: number =contractbalance ? parseFloat(formatUnits(contractbalance, 18)) : 0

    const totalValue = amounterned.reduce((acc, item) => acc + parseFloat(item.amount) ,  0);

    useEffect(() => {
        fetch('/adminaccess/api/getamountsearned')
          .then(response => response.json())
          .then(data => setamounterned(data))
          .catch(error => console.error('Error fetching va categories:', error));
      }, []);

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
                                <div className='bdywrk'>
                                    <div>Contract Address - {fundmeaddress}</div>
                                    <div>Contract Address Balance - {formatcontractbalance}</div>
                                </div>
                                <div className='bdywrk'>
                                    <div>Wallet Address - {account}</div>
                                    <div>Wallet Address Balance - {formatethbalance}</div>
                                </div>
                                <div>
                                    <div><p>Total Amount earned By Chicky D's - ${totalValue}</p></div>
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