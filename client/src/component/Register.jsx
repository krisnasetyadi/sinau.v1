import React,{useState} from "react";
import { Form,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register ({setAuth}){
    const [inputs,setInputs] = useState({
        email:'',
        password:'',
        name:''
    });
    const {email,password,name} = inputs;

    function onChange(e){
        setInputs({...inputs,[e.target.name]:e.target.value});
    }

    async function onSubmitForm(e){
        e.preventDefault()
        try{
            const body = {email,password,name}
            const response = await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            // console.log(parseRes);
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token)

            setAuth(true)
            toast.success('Register Successfully')
            }else{
                setAuth(false)
                toast.error(parseRes);
            }
            

        }catch(err){
            console.error(err.message)
        }
    }
    return(
        <div style={{width:'300px', margin:'auto'}}>
        <h1 className="text-center my-5" >Register</h1>
        <Form onSubmit={onSubmitForm} >
            <Form.Control 
            type="email" 
            name="email" 
            placeholder="email" 
            className="my-3"
            value={email}
            onChange={e=>onChange(e)} />
            <Form.Control 
            type="text" 
            name="name" 
            placeholder="username" 
            className="my-3"
            value={name}
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

            <Button className="btn btn-success btn-block" type="submit">Submit</Button>
        </Form>
        <Link to='/login'>Login</Link>
        </div>
    )
}