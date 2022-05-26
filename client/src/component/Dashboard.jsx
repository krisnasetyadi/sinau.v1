import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from './Navbar'
import Sidebar from "./Sidebar";
export default function Dashboard ({setAuth}){
    const [name,setName]=useState("")
    const [handleShowSidebar,setHandleShowSidebar]=useState(false)
    console.log('handle dashboaard',handleShowSidebar)
    async function getName(){
        try{
            const response = await fetch('http://localhost:5000/dashboard/',{
                method:"GET",
                headers:{token:localStorage.token}
            })
            const parseRes = await response.json()
            // console.log(parseRes)
            setName(parseRes.student_name)
        }catch(err){
            console.error(err.message)
        }
    }
    function logout(e){
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Successfully Logout")
    }
    useEffect(()=>{
        getName()
    },[])
    return(
        <div className="main-dashboard bg-success" style={{height:'500px'}}>
        <div  style={{height:'300px', margin:'auto',backgroundColor:'lavender'}}>
            <NavBar studentName={name} Logout={logout} setHandler={setHandleShowSidebar}/>
        </div>
        <div className="sidebar bg-warning">
        <Sidebar handleShowSidebar={handleShowSidebar} setHandleShowSidebar={()=>setHandleShowSidebar()} />
        </div>
        </div>
    )
}