import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import logomain from "../images/logo.jpg"




export const Footer = () =>{

    return (
        <><div className='vicein'>
            <div className='gunnin'>
                <div  style={{padding:'14px'}}><img src={logomain}  className="mainlogo" alt="Chicky D's"/><p className='vinkxyl'>Welcome to Chicky'Ds: Where flavor meets perfection. Indulge in our crafted delights, from crispy bites to savory feasts. Join us and savor every moment, one delectable bite at a time.</p></div>
                <div className='notusex'></div>
                <div className='notusex'>
                    <form>
                        <input className='ftimpt'/>
                        <button className='subbtn'>Subscribe</button>
                    </form>
                    <p>Subscribe to Chicky'Ds food menu letter</p>
                    <p>For inquiries contact- +1 230-943-2930 | info@chickyds.com</p>
                </div>
            </div>
            <hr style={{color:'white'}} />
            <div><p className=' polininm' >Copyright &copy; December 2023 Created By Noel-e-ose.  </p></div>
        </div>
        </>
    )

}