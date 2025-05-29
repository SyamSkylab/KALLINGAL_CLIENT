import React, { useEffect, useReducer, useRef, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from './contexts/authcontext.provider';
import { Logout } from './contexts/logout';

export const Admin = () => {
    const { access_token } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [statusVal, setStatusVal] = useState('BOOKED');
    const [page, setPage] = useState(1);
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const statuses = ["BOOKED", "CANCEL", "PAYMENT_SUCCESSFULL", "SHIPPED"];
    const take = 10;

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({ status: statusVal, page, take });

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/booking?${params.toString()}`, {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            const data = await res.json();

            if (res.ok && data?.data) {
                setBookings(data.data); // assuming `data.total` is available
            } else {
                setError("Failed to fetch bookings.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    const handleStatusEdit = async (id, status) => {

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/booking/${id}`, {
            method: 'put', headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, body: JSON.stringify({ status })
        })
        const data = await res.json()
        if (data?.success == true) {
            setChange(!change)
        }
        else {
            alert("something went wrong")
        }
    }
    useEffect(() => {
        fetchBookings();
    }, [statusVal, page, change]);

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePageInputChange = (e) => {
        const value = e.target.value;
        const num = parseInt(value);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
            setPage(num);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="fixed top-0 w-full h-20 bg-green-800 text-white flex items-center px-4 shadow-md z-50">
                <div className="mx-auto flex flex-wrap">
                    {statuses.map(status => (
                        <Button
                            key={status}
                            variant={statusVal === status ? "info" : "outline-info"}
                            onClick={() => {
                                setPage(1);
                                setStatusVal(status);
                            }}
                            className="m-1"
                        >
                            {status}
                        </Button>
                    ))}
                </div>
                <Logout />
            </div>

            {/* Table Section */}
            <div className="pt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Mobile No</th>
                                <th>Address</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">No bookings found.</td>
                                </tr>
                            ) : (
                                bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.name}</td>
                                        <td>{booking.mobile_no}</td>
                                        <td>{booking.address}</td>
                                        <td>{JSON.stringify(booking.quantity)}</td>
                                        <td>{booking.total_price}</td>
                                        <td>     <Form.Select
                                            defaultValue={booking.status}
                                            onChange={(e) => handleStatusEdit(booking.id, e.target.value)}
                                        >{statuses.map((status, index) => { return (<option key={index} value={status}>{status}</option>) })}</Form.Select></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-center mt-4 gap-3">
                    <Button
                        variant="outline-primary"
                        onClick={handlePrev}
                        disabled={page <= 1}
                    >
                        Prev
                    </Button>

                    <Form.Control
                        type="number"
                        min="1"
                        value={page}
                        onChange={handlePageInputChange}
                        style={{ width: '80px' }}
                    />

                    <Button
                        variant="outline-primary"
                        onClick={handleNext}

                    >
                        Next
                    </Button>
                </div>


            </div>
        </>
    );
};
