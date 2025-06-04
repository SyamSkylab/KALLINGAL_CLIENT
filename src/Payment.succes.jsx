// src/pages/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // Optional icon lib

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Redirect to home
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            <CheckCircle size={100} className="text-green-500 animate-bounce mb-4" />
            <h1 className="text-2xl font-semibold text-green-600">Payment Successful</h1>
            <p className="text-gray-500 mt-2">Redirecting to Home...</p>
        </div>
    );
};

export default PaymentSuccess;
