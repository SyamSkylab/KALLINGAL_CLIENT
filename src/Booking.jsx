import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

export const Booking = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [proQuantity, setQuantity] = useState({});
    const [totalPrice, setPrice] = useState(0);
    const [formData, setFormData] = useState({ name: '', mobile_no: '', address: '' });
    const [errors, setErrors] = useState({});

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

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/booking`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                quantity: proQuantity,
                total_price: totalPrice
            })
        });

        const data = await res.json();
        if (data.success) {
            navigate('/');
            alert("Booking successful");
        } else {
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center py-6 px-4 sm:px-6">
            <img src={logo} alt="Logo" className="h-32 sm:h-40 mb-6" />
            <h5 className='text-white font-light'>make payment to this number 8086390026 (mention name and address) </h5>
            <Form className="w-full max-w-2xl bg-gradient-to-br from-green-900 via-emerald-50 to-green-900 border-2 rounded-xl p-6 shadow-lg" onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <small className="text-red-600">{errors.name}</small>}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="mobile_no"
                        placeholder="Enter mobile number"
                        value={formData.mobile_no}
                        onChange={handleInputChange}
                    />
                    {errors.mobile_no && <small className="text-red-600">{errors.mobile_no}</small>}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <small className="text-red-600">{errors.address}</small>}
                </Form.Group>

                <h5 className="text-lg font-semibold mt-5 mb-3 text-green-800">Select Products</h5>
                <Row>
                    {products.map((product, index) => {
                        const key = `${product.name}_${product.size}`;
                        return (
                            <Col md={6} key={index} className="mb-4">
                                <Card className='bg-gradient-to-bl from-black via-green-300 to-black'>
                                    <Card.Body>
                                        <Card.Title className="text-green-800 text-base font-bold">
                                            {product.name} ({product.size})
                                        </Card.Title>
                                        <Card.Text>Price: ₹{product.price}</Card.Text>
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

                {errors.quantity && <small className="text-red-600 d-block mb-3">{errors.quantity}</small>}

                <div className="mb-4">
                    <Form.Label>Total Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="total_price"
                        readOnly
                        value={totalPrice}
                        className="bg-light"
                    />
                </div>

                <div className="text-center">
                    <Button
                        type="submit"
                        className="bg-transparent  border-b-4 px-5 py-2 text-black fw-bold rounded"
                    >
                        Book Now
                    </Button>
                </div>
            </Form>
        </div>
    );
};
