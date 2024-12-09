import React, { useState } from 'react';

interface CategoryFormData {
    categoryName: string;
    productName: string;
    discountRate: string;
    startDate: string;
    endDate: string;
}

export default function Createnewcategory() {
    const [categoryName, setCategoryName] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [discountRate, setDiscountRate] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName || !productName || !discountRate || !startDate || !endDate) {
            setError('All fields are required');
            return;
        }
        
        const formData: CategoryFormData = {
            categoryName,
            productName,
            discountRate,
            startDate,
            endDate,
        };

        console.log(formData);

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
                    className="bg-[#C473FF] text-white px-4 py-2 rounded hover:bg-[#7840a1]"
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
