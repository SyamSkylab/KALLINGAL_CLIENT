import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from './assets/logo.png'
export const Reg = () => {
    const navigate = useNavigate()
    const registration = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const mobile_no = e.target.mobile_no.value
        const password = e.target.password.value


        const res = await fetch(`http://localhost:3000/auth/reg`, {
            method: 'post', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ name: name, mobile_no: mobile_no, password: password })
        })
        const data = await res.json()
        if (data['success']) {
            navigate('/login')
        }
    }
    return (

        <div className='fixed  w-screen mx-auto h-screen bg-green-900 z-[9999]'><img src={logo} className='w-60 h-45 mx-auto'></img><h2 className=' text-center text-white'>CUSTOMER REGISTRATION</h2> <Form className='mx-auto px-4 mt-10 border-2 bg-green-200 w-90 h-72  rounded-2xl' onSubmit={registration}>
            <Form.Group className='pl-10 pt-10 ' controlId="formBasicTask1">
                <Form.Control className='w-auto' type="text" name="name" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className='pl-10 pt-10' controlId="formBasicDate">
                <Form.Control className='w-auto' type="text" name="mobile_no" placeholder="Enter Mobile Number" />
            </Form.Group>
            <Form.Group className='pl-10 pt-10' controlId="formBasicTask">
                <Form.Control className='w-auto' type="text" name="password" placeholder="Enter Password" />
            </Form.Group>
            <Form.Group className='pl-30 pt-1.5' >
                <Button type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form></div>
    )
}
