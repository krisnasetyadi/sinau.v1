import React, { useEffect, useState } from "react";
import { Navbar,Container,Button } from "react-bootstrap";
import moment from 'moment';
import { Link } from "react-router-dom";
import { BiPowerOff,BiMenu } from "react-icons/bi";
import MenuButton from "./Sidebar";

export default function Nav(props){
    const {studentName,Logout,setHandler} = props
    const [timeStamp,setTimeStamp]=useState(moment().format('dddd,DD/MM/YYYY | hh:mm:ss A'));
    const [show, setShow] = useState(false);
    const toggleShow = () => setHandler((s) => !s);
    // console.log('setHandler',toggleShow)

    useEffect(()=>{
        setTimeout(()=>{
            setTime();
        },1000)
    })
    const setTime = () => {
        setTimeStamp(moment().format('dddd, DD/MM/YYYY | hh:mm:ss A'))
    }
    return(
<header className="header">
    <div className="nav-container">
        <Navbar bg="light" variant="light">
            <div className="menu-button btn">
            <BiMenu style={{fontSize:'2rem'}} onClick={toggleShow}/>
            </div>
            <div className="title" style={{marginLeft:'10px'}}>
                <Link to="/" className="text-reset text-decoration-none bold">
                    <h1>Sinau.id</h1>
                </Link>
            </div>
        <Container style={{marginRight:'10px'}}>
            <div className="date">
                {timeStamp}
            </div>
            <div className="name">
                {studentName}
            </div>
        <BiPowerOff className="btn" style={{fontSize:'60px'}} onClick={e=>Logout(e)}/>
        </Container>
        
    </Navbar>
  </div>
</header>
    )
}