import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from './Razorpay';

export const Booking = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [proQuantity, setQuantity] = useState({});
    const [totalPrice, setPrice] = useState(0);
    const [formData, setFormData] = useState({ name: '', mobile_no: '', address: '' });
    const [errors, setErrors] = useState({});
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: '',
    });
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product`);
            const data = await res.json();
            const initialSelection = {};
            data.data.forEach(product => {
                const key = `${product.name}_${product.size}`;
                initialSelection[key] = 0;
            });
            setProducts(data.data);
            setQuantity(initialSelection);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleQuantityChange = (name, size, value) => {
        const key = `${name}_${size}`;
        const newQuantity = { ...proQuantity, [key]: parseInt(value) || 0 };
        setQuantity(newQuantity);

        let newTotal = 0;
        products.forEach(product => {
            const pKey = `${product.name}_${product.size}`;
            const qty = newQuantity[pKey] || 0;
            newTotal += qty * product.price;
        });

        setPrice(newTotal);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setDetails(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.mobile_no || !/^[0-9]{10}$/.test(formData.mobile_no)) newErrors.mobile_no = 'Valid 10-digit mobile number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (totalPrice <= 0) newErrors.quantity = 'Please add at least one product';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        await fetch(`${import.meta.env.VITE_SERVER_URL}/booking`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                quantity: proQuantity,
                total_price: totalPrice
            })
        });
        setShowPayment(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-green-900 flex flex-col items-center py-10 px-4 sm:px-8">
            <img src={logo} alt="Logo" className="h-28 sm:h-36 mb-6" />

            <Form className="w-full max-w-3xl bg-gradient-to-b from-gray-200 via-green-500 to-green-400 rounded-2xl p-6 shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-center mb-4 text-green-700">Booking Details</h2>

                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile_no"
                                placeholder="Enter mobile number"
                                value={formData.mobile_no}
                                onChange={handleInputChange}
                            />
                            {errors.mobile_no && <div className="text-danger">{errors.mobile_no}</div>}
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </Form.Group>

                <h5 className="text-lg font-semibold mt-4 mb-3 text-green-700">Select Products</h5>

                <Row>
                    {products.map((product, index) => {
                        const key = `${product.name}_${product.size}`;
                        return (
                            <Col md={6} key={index} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="text-green-800 text-sm font-semibold">
                                            {product.name} ({product.size})
                                        </Card.Title>
                                        <Card.Text>₹{product.price}</Card.Text>
                                        <InputGroup>
                                            <InputGroup.Text>Qty</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                value={proQuantity[key] || ''}
                                                onChange={(e) =>
                                                    handleQuantityChange(product.name, product.size, e.target.value)
                                                }
                                            />
                                        </InputGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {errors.quantity && <div className="text-danger mb-3">{errors.quantity}</div>}

                <Form.Group className="mb-4">
                    <Form.Label>Total Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="total_price"
                        readOnly
                        value={totalPrice}
                        className="bg-light"
                    />
                </Form.Group>

                <div className="text-center">
                    {!showPayment ? (
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                        >
                            Next
                        </button>
                    ) : (
                        <div className="mt-4">
                            <RazorpayButton amount={totalPrice} bookingDetails={details} />
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
};
