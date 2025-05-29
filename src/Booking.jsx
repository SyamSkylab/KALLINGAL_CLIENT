import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

    const handleQuantityChange = (name, size, value, price) => {
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

            <Form className="w-full max-w-lg bg-green-100 border-2 rounded-xl p-6 shadow-lg" onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2"
                    />
                    {errors.name && <small className="text-red-600">{errors.name}</small>}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        name="mobile_no"
                        placeholder="Enter mobile number"
                        value={formData.mobile_no}
                        onChange={handleInputChange}
                        className="p-2"
                    />
                    {errors.mobile_no && <small className="text-red-600">{errors.mobile_no}</small>}
                </Form.Group>

                <Form.Group className="mb-4">
                    <textarea
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.address && <small className="text-red-600">{errors.address}</small>}
                </Form.Group>

                {products.map((product, index) => {
                    const key = `${product.name}_${product.size}`;
                    return (
                        <div key={index} className="mb-4">
                            <label className="block text-green-800 font-semibold mb-1">
                                {product.name} {product.size}:
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={proQuantity[key] || 0}
                                onChange={(e) => handleQuantityChange(product.name, product.size, e.target.value, product.price)}
                                name={key}
                                placeholder="Enter Quantity"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    );
                })}
                {errors.quantity && <small className="text-red-600 block mb-4">{errors.quantity}</small>}

                <div className="mb-6">
                    <label className="block font-semibold mb-1">Total Price:</label>
                    <input
                        className="w-full p-2 rounded bg-gray-100"
                        value={totalPrice}
                        type="number"
                        name="total_price"
                        readOnly
                    />
                </div>

                <div className="text-center">
                    <Button type="submit" className="bg-green-700 hover:bg-green-800 px-6 py-2 text-white rounded">
                        Order
                    </Button>
                </div>
            </Form>
        </div>
    );
};
