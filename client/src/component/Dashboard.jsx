import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import NavBar from './Navbar'
export default function Dashboard ({setAuth}){
    const [name,setName]=useState("")

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
        <div  style={{height:'300px', margin:'auto',backgroundColor:'lavender'}}>
            <NavBar studentName={name} Logout={logout}/>
            {/* <div>
            <h4>Welcome Back, {name}</h4>
            </div>
         */}
        {/* <Button variant="primary" onClick={e=>logout(e)}>Logout</Button> */}
        </div>
    )
}