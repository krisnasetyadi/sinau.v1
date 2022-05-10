import React, { useEffect, useState } from "react";
import { Navbar,Container,Button } from "react-bootstrap";
import moment from 'moment';
import { Link } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

export default function Nav(props){
    const {studentName,Logout} = props
    // console.log('isi student',studentName)
    const [timeStamp,setTimeStamp]=useState(moment().format('dddd,DD/MM/YYYY | hh:mm:ss A'));
    // console.log('isi timestamp',timeStamp)
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
  <Navbar bg="light" variant="light">
    <div className="title" style={{marginLeft:'10px'}}>
        <Link to="/dashboard" className="text-reset text-decoration-none bold">
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
</header>
    )
}