import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import bbqsauce from '../../images/bbqsauce.jpg'
import burger from '../../images/burger.jpg'
import chicken from '../../images/chicken.jpg'
import chickenandfrieskebab from '../../images/chickenndfrieskebab.png'
import chickenpie from '../../images/chickenpie.jpg'
import cocacola from '../../images/coke.jpg'
import corndog from '../../images/corndog.jpg'
import fanta from '../../images/fanta.jpg'
import fries from '../../images/fries.jpg'
import friesndketchup  from '../../images/friesndketchup.jpg'
import hotdog from '../../images/hotdog.jpg'
import ketchup from '../../images/ketchup.jpg'
import pepsi from '../../images/pepsi.jpg'
import sprite from '../../images/sprite.jpg'
import promopic from '../../images/promopix.jpg'



export const Menu = () =>{

    return (
        <>
            <Container>
                <Row style={{margin:'15px' } }  className="menubbackgrnd">
                    <Col>
                        <div>
                            <Link to='orderpromo'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={promopic} className="promppicmenu" />
                                            <div>
                                                <p className="menutxt">Chicky D's Chicken & Fries PROMO</p>
                                                <p className="menutxt">$20.5</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderchickenfrieskebab'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={chickenandfrieskebab} className="chickenfrieskebab" />
                                            <div>
                                                <p className="menutxt">Chicken & Fries Kebab</p>
                                                <p className="menutxt">$6.5</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderchickenwings'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={ chicken} className="chickenmenu" />
                                            <div>
                                                <p className="menutxt">Chicken wings</p>
                                                <p className="menutxt">$6.5</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderfrenchfries'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={fries} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">French Fries</p>
                                                <p className="menutxt">$5</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderfrenchfriesketchup'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={friesndketchup} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">French fries & Ketchup</p>
                                                <p className="menutxt">$6</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderbbq'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={bbqsauce} className="friesmenu"/>
                                            <div>
                                                <p className="menutxt">Bbq Sauce</p>
                                                <p className="menutxt">$1</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderketchup'  className="linkhldr">
                                <Row>
                                    <Col>
                                        <div  className="menuhlder">
                                            <img src={ketchup} className="friesmenu"/>
                                            <div>
                                                <p className="menutxt">Ketchup</p>
                                                <p className="menutxt">$1</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderburger' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={burger} className="friesmenu"/>
                                            <div>
                                                <p className="menutxt">Chicken Burger</p>
                                                <p className="menutxt">$10</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='ordercorndog' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={corndog} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Corn dog</p>
                                                <p className="menutxt">$5</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderhotdog' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={hotdog} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Hot dog</p>
                                                <p className="menutxt">$7</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderchickenpie' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={chickenpie} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Chicken pie</p>
                                                <p className="menutxt">$5.41</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='ordercoke' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={cocacola} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Coca Cola</p>
                                                <p className="menutxt">$1.2</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderpepsi' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={pepsi} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Pepsi</p>
                                                <p className="menutxt">$1</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='orderfanta'className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={fanta} className="friesmenu" />
                                            <div>
                                                <p  className="menutxt">Fanta</p>
                                                <p className="menutxt">$1</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                            <Link to='ordersprite' className="linkhldr">
                                <Row>
                                    <Col>
                                        <div className="menuhlder">
                                            <img src={sprite} className="friesmenu" />
                                            <div>
                                                <p className="menutxt">Sprite </p>
                                                <p className="menutxt">$1</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}