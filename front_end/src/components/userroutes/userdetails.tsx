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


const defaultFormData= {
    user_fullname:"",
    user_email:"",
    username:"",
    user_bio:"",
    user_phn:"",
    user_homeaddress:""
}



export const Userdetails = () =>{

    const [formData, setformData] =useState(defaultFormData)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openx, setOpenx] = useState(false);
    const handleOpenx = () => setOpenx(true);
    const handleClosex = () => setOpenx(false);

    const [openy, setOpeny] = useState(false);
    const handleOpeny = () => setOpeny(true);
    const handleClosey = () => setOpeny(false);

    const [openv, setOpenv] = useState(false);
    const handleOpenv = () => setOpenv(true);
    const handleClosev = () => setOpenv(false);

    const {account} = useEthers()

    const isConnected = account !== undefined

    const [userprofile, setuserprofile] = useState<any>()


    useEffect(() => {
        const fetchUserprofile = async () => {
          try {
            const response = await fetch(`/api/userprofiledetails/${account}`);
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

      const onSubmitname = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (typeof account === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('user_fullname', formData.user_fullname);
        formDataToSend.append('user_address', account);
        try {
            const response = await fetch('/api/updateprofilename', {
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
    }
      const onSubmitemail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (typeof account === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('user_email', formData.user_email);
        formDataToSend.append('user_address', account);
        try {
            const response = await fetch('/api/updateprofileemail', {
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
    }

      const onSubmitphone = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (typeof account === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('user_phn', formData.user_phn);
        formDataToSend.append('user_address', account);
        try {
            const response = await fetch('/api/updateprofilephone', {
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
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }) )
    }

      const onSubmithomeaddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (typeof account === 'undefined') return
        const formDataToSend = new FormData();
        formDataToSend.append('user_homeaddress', formData.user_homeaddress);
        formDataToSend.append('user_address', account);
        try {
            const response = await fetch('/api/updateprofilehomeaddress', {
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
    }

    

    return (
        <>
            <Container className="orderhldrxx">
                <Row>
                    <Col className="useditscol">
                        <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change Fullname
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <form onSubmit={onSubmitname}>
                                        <input type="text" name="user_fullname" onChange={onChange} />
                                        <button>Save Change</button>
                                    </form>
                                </div>
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                        <div className="bdymainnin">
                            {userprofile && userprofile.fullname ? (<div>{userprofile.fullname}</div>) : (<div><p>NO user fullname set</p></div>)}
                            <button onClick={handleOpen} className="polvlbtn">edit</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="useditscol">
                        <div>
                        <Modal
                            open={openx}
                            onClose={handleClosex}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change email
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <form onSubmit={onSubmitemail}>
                                        <input type="text" name="user_email" onChange={onChange} />
                                        <button>Save Change</button>
                                    </form>
                                </div>
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                        <div className="bdymainnin">
                            {userprofile && userprofile.email ? (<div>{userprofile.email}</div>) : (<div><p>NO user email set</p></div>)}
                            <button onClick={handleOpenx} className="polvlbtn">edit</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="useditscol">
                        <div>
                        <Modal
                            open={openy}
                            onClose={handleClosey}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change Phonenumber
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <form onSubmit={onSubmitphone}>
                                        <input type="text" name="user_phn" onChange={onChange} />
                                        <button>Save Change</button>
                                    </form>
                                </div>
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                        <div className="bdymainnin">
                            {userprofile && userprofile.phonenumber ? (<div>{userprofile.phonenumber}</div>) : (<div><p>NO phone number set</p></div>)}
                            <button onClick={handleOpeny} className="polvlbtn">edit</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="useditscol">
                        <div>
                        <Modal
                            open={openv}
                            onClose={handleClosev}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change Home address
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <form onSubmit={onSubmithomeaddress}>
                                        <input type="text" name="user_homeaddress" onChange={onChange} />
                                        <button>Save Change</button>
                                    </form>
                                </div>
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                        <div className="bdymainnin">
                            {userprofile && userprofile.homeaddress ? (<div>{userprofile.homeaddress}</div>) : (<div><p>NO Home address set</p></div>)}
                            <button onClick={handleOpenv} className="polvlbtn">edit</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}