import React, { useEffect, useState } from "react";
import axios from "axios";

interface CustomerDetails {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
    email: string;
    activationDate: string;
    status: string;
    flagging: number;
    productsPurchased: number;
    ordersReturned: number;
}

const AccountDetails: React.FC = () => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<CustomerDetails>('/api/customer-details')  
            .then(response => {
                setCustomerDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!customerDetails) {
        return <div>No customer details found.</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Account Details</h1>
                <button className="bg-[#C473FF] text-white px-4 py-2 rounded-md">
                    Edit Account Details
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Customer Information</h2>
                    <button className="text-blue-500 hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>Customer Name: <span className="text-purple-600">{customerDetails.name}</span></div>
                    <div>Customer Address: <span className="text-purple-600">{customerDetails.address}</span></div>
                    <div>City: <span className="text-purple-600">{customerDetails.city}</span></div>
                    <div>State: <span className="text-purple-600">{customerDetails.state}</span></div>
                    <div>Country: <span className="text-purple-600">{customerDetails.country}</span></div>
                    <div>ZIP Code: <span className="text-purple-600">{customerDetails.zip}</span></div>
                    <div>Customer Phone Number: <span className="text-purple-600">{customerDetails.phone}</span></div>
                    <div>Customer Email Address: <span className="text-purple-600">{customerDetails.email}</span></div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Account Status</h2>
                    <button className="text-blue-500 hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>Account Activation Date: <span className="text-purple-600">{customerDetails.activationDate}</span></div>
                    <div>Account Status: <span className="text-purple-600">{customerDetails.status}</span></div>
                    <div>Account Flagging (if any): <span className="text-purple-600">{customerDetails.flagging}</span></div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Other Information</h2>
                    <button className="text-blue-500 hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>Total Number of Products Purchased: <span className="text-purple-600">{customerDetails.productsPurchased}</span></div>
                    <div>List of Orders Returned: <span className="text-purple-600">{customerDetails.ordersReturned}</span></div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
