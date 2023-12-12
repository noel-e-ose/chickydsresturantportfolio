import {Outlet, NavLink, Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import mainbdy from '../images/promopix.jpg'
import promopixsec from '../images/promopixsec.jpg'
import fam from '../images/mainfamily.jpg'


export const Main = () =>{

    return (
        <>
            <Container>
                <Row className="mainnbdhldr">
                    <div><Col><Link to='orderpromo'><img src={mainbdy} className='mainbdyflx'/></Link></Col></div>
                    <div style={{padding:'5px'}}>
                        <Col><Link to='menu'><img src={fam} className='fampix'/></Link></Col>
                        <Col><Link to='menu'><img src={promopixsec} className='promopix'/></Link></Col>
                    </div>
                </Row>
            </Container>
        </>
    )

}