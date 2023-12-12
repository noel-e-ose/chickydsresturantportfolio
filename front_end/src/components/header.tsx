import {Outlet, NavLink, Link} from "react-router-dom"
import { Footer } from "./footer"
import logomain from "../images/logo.jpg"
import { useState, useEffect } from "react"
import { useEthers } from '@usedapp/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";



export const Header = () => {

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined


    useEffect(() => {
        if (isConnected) {
          sendaddress()
        }
    }, [account]);
  
      const sendaddress = async () => {
          const adduser = await fetch('/api/onconnect',{
              method: 'POST',
              headers: {
                  'Content-Type':'application/json',
              },
              body:JSON.stringify({user_address : account})
          })   
  
      }


    const [active, setActive] = useState('dropdwn')
    const [wrking, setwrking] = useState('mainnavlink navitem')
    const [togglerIcon, settogglerIcon] = useState('menubtn')
    const navtoggle = () => {
        active === 'dropdwn' ? setActive('dropdwn dropdwnactive') : setActive('dropdwn')
        wrking === 'mainnavlink navitem' ? setwrking('mainnavlink navitem mainnavlinkactive') : setwrking('mainnavlink navitem')
        togglerIcon === 'menubtn' ? settogglerIcon('menubtn toggle') : settogglerIcon('menubtn')
    }
    

    return(
        <div>
            <div className="originadiv">
                <div className="mainnav">
                    <div>
                        <Link to="/">
                            <img src={logomain} className="mainlogo" alt="Chicky D's" />
                        </Link>
                    </div>
                    <div className="midnav">
                        <div  className={active}>
                            <Link to="/" ><button className={wrking}>Home</button></Link>
                            <Link to="menu" ><button className={wrking}>Menu</button></Link>
                            <Link to="trackorders" ><button className={wrking}>Track Orders</button></Link>
                            <Link to="userdetails"><button className={wrking}>User details</button></Link>
                            <>{account === "0x56E6c088e0cbAA252B5E42E7817648478382004A" ? (
                                <><Link to="admindashboard"><button className={wrking}>Admin Dashboard</button></Link></>
                            ) : (
                                <></>
                            )}</>
                            <>{isConnected ? (
                                <button  className={wrking} onClick={deactivate}>
                                    Disconnect
                                </button>
                            ) : (
                                <button className={wrking} 
                                    onClick={() => {
                                        activateBrowserWallet()
                                    }}
                                >
                                    Connect Wallet
                                </button>
                            )}</>
                        </div>
                        <div onClick={navtoggle} className={togglerIcon} style={{marginLeft:'5px'}}>
                            <div className="linetog line1"></div>
                            <div className="linetog line2"></div>
                            <div className="linetog line3"></div>
                        </div>
                    </div>
                </div>
                <div><Link to="cart"><FontAwesomeIcon className="cartnav" icon={faCartShopping} /></Link></div>
            </div>
            <div>
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}