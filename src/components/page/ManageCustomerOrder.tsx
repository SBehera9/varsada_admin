


import React from "react";

// Reusable component for Product Information
function ProductInfo({ product, status, trackingNo, trackingUrl, deliveredDate, image }) {
    return (
        <div className="border p-4 rounded-md mb-4 bg-white">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{product}</h3>
                <span className={`px-3 py-1 text-sm rounded-md ${status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {status}
                </span>
            </div>
            <p className="text-sm text-gray-600">
                Quantity: 2 | Color: Blue | Size: L | Weight: 2 lb | Value: ₹2,160.00
            </p>
            <p className="text-sm mt-2">
                <span className="font-semibold">Tracking No:</span> {trackingNo}
            </p>
            <p className="text-sm">
                <span className="font-semibold">Tracking URL:</span>{" "}
                <a href={trackingUrl} className="text-blue-500" aria-label={`Track order ${trackingNo}`}>
                    {trackingUrl}
                </a>
            </p>
            <p className="text-sm">
                <span className="font-semibold">Delivered Date & Time:</span> {deliveredDate}
            </p>
            {image && (
                <div className="mt-4">
                    <p className="text-sm font-semibold">Image of the Product from Customer:</p>
                    <img
                        src={image}
                        alt="Customer uploaded product"
                        className="mt-2 w-32 h-32 object-cover border"
                    />
                </div>
            )}
        </div>
    );
}

export default function ManageCustomerOrder() {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-xl font-semibold mb-4">Rishi's Manage Orders</h1>

                {/* Search and Filter Section */}
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 p-2 rounded-md w-1/2"
                    />
                    <button className="border border-gray-300 p-2 rounded-md flex items-center">
                        <span>Filter</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 ml-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V18a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-6.586l-4.707-4.707A1 1 0 014 6V4z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Shipping Details Section */}
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h2 className="font-semibold">Shipping Items</h2>
                    <div className="mt-2">
                        <p>
                            <span className="font-semibold">Order No:</span> 12345
                        </p>
                        <p>
                            <span className="font-semibold">Customer Name:</span> Sheela
                        </p>
                        <p>
                            <span className="font-semibold">Shipping Address:</span>{" "}
                            No 23, 10th Ave, Sarvamangala Colony, Manthope Colony, Ashok Nagar, Chennai, Tamil Nadu 600083, India
                        </p>
                    </div>
                </div>

                {/* Order Details Section */}
                <ProductInfo
                    product="Co-ord set"
                    status="Delivered"
                    trackingNo="UTCN086809"
                    trackingUrl="http://SNDJNDKSLASC.com"
                    deliveredDate="24-77-2024, 12:30"
                    image="https://via.placeholder.com/150"
                />

                {/* Refund/Cancel Request Section */}
                <div className="border p-4 rounded-md mb-4 bg-white">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Co-ord set</h3>
                        <span className="px-3 py-1 text-sm rounded-md bg-yellow-100 text-yellow-600">
                            Requested Refund/Cancel
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Quantity: 2 | Color: Blue | Size: L | Weight: 2 lb | Value: ₹2,160.00
                    </p>
                    <p className="text-sm mt-2">
                        <span className="font-semibold">Tracking No:</span> UTCN086809
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Tracking URL:</span>{" "}
                        <a href="http://SNDJNDKSLASC.com" className="text-blue-500">
                            http://SNDJNDKSLASC.com
                        </a>
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Delivered Date & Time:</span> 24-77-2024, 12:30
                    </p>

                    {/* Refund Details */}
                    <div className="mt-4">
                        <h4 className="font-semibold text-sm text-red-500">
                            Reason for the Order Cancellation/Refund/Return
                        </h4>
                        <p className="text-sm text-gray-600">
                            Product Damaged - This dress came damaged and not comfortable, with a flattering fit and
                            high-quality fabric that feels amazing all day.
                        </p>
                        <div className="mt-2">
                            <p className="text-sm font-semibold">Image of the Product from Customer:</p>
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Customer uploaded product"
                                className="mt-2 w-32 h-32 object-cover border"
                            />
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Refund Now
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                                Reject Refund
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
