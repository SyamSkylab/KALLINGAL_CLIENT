// src/components/RazorpayButton.jsx
import React from 'react';
import axios from 'axios';
import { loadRazorpayScript } from './utils/loadRazorpay.script';
import { useNavigate } from 'react-router-dom';

const RazorpayButton = ({ amount, bookingDetails }) => {
    const navigate = useNavigate()
    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) return alert('Razorpay SDK load failed');

        // Step 1: Create Razorpay Order
        const result = await axios.post(`${process.env.VITE_SERVER_URL}/razorpay/create`, {
            amount,
            bookingDetails,
        });

        const { razorpayKey, orderId } = result.data;

        // Step 2: Razorpay Checkout Options
        const options = {
            key: razorpayKey,
            amount: amount * 100,
            currency: 'INR',
            name: 'Kallingal Herbal Booking',
            description: 'Booking Confirmation',
            order_id: orderId,
            handler: function (response) {
                console.log('Razorpay Response:', response);
                // Optional: Send payment_id to backend for confirmation
                navigate('/payment-success');

            },
            prefill: {
                name: bookingDetails.name,
                email: bookingDetails.email,
                contact: bookingDetails.mobile_no,
            },
            notes: bookingDetails,
            method: {
                upi: true,
                card: false,
                netbanking: false,
                wallet: false,
            },
            theme: { color: '#0ab39c' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="px-6 mx-auto bg-green-600 text-white m rounded shadow"
        >
            Pay ₹{amount}
        </button>
    );
};

export default RazorpayButton;
