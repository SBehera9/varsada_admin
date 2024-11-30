import React, { useState } from 'react';

export default function Createnewcategory() {
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!categoryName || !productName || !discountRate || !startDate || !endDate) {
            setError('All fields are required');
            return;
        }
        
        // Handle form submission logic here
        console.log({
            categoryName,
            productName,
            discountRate,
            startDate,
            endDate
        });

        // Clear the form after submission
        setCategoryName('');
        setProductName('');
        setDiscountRate('');
        setStartDate('');
        setEndDate('');
        setError('');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Create New Category</h2>
                <button
                    type="submit"
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Category Name</label>
                    <input
                        type="text"
                        placeholder="Enter Category Name"
                        className="p-2 border border-gray-300 rounded"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter Sub-Category Name"
                        className="p-2 border border-gray-300 rounded"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Discount Rate (%)</label>
                    <input
                        type="text"
                        placeholder="Enter Discount"
                        className="p-2 border border-gray-300 rounded"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Discount Rate Start Date</label>
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Discount Rate End Date</label>
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
}
