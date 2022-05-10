import React,{useState} from "react";
import {Button,Form} from 'react-bootstrap';
import{ Link } from'react-router-dom';
import {toast} from 'react-toastify';

export default function Login ({setAuth}){
    const[inputs,setInputs]=useState({
        email:"",
        password:""
    })
    const {email,password} = inputs
    function onChange(e){
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
    async function onSubmitForm(e){
        e.preventDefault()
        try{
            const body = {email,password}
            const response = await fetch('http://localhost:5000/auth/login',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            // console.log(parseRes)
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
            setAuth(true)
            toast.success('login successfully')
            } else {
                setAuth(false)
                toast.error(parseRes)
            }
            
        }catch(err){
            console.error(err.message)
        }
    }
    return(
        <div style={{width:'300px', margin:'auto'}}>
        <h1 className="text-center my-5">Login</h1>
        <Form onSubmit={onSubmitForm}>
            <Form.Control 
            type="email" 
            name="email" 
            placeholder="email"
            className="my-3"
            value={email}
            onChange={e=>onChange(e)}
            />

            <Form.Control 
            type="password" 
            name="password" 
            placeholder="password"
            className="my-3"
            value={password}
            onChange={e=>onChange(e)}
            />
            <Button variant="success" className="btn-block" type="submit"> Login </Button>
        </Form>
        <Link to='/register'>Register</Link>
        </div>
    )
}