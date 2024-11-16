import { useState, useEffect } from "react";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Number of orders per page

    // Fetch data from the backend
    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://your-backend-api/orders");
                const data = await response.json();
                setOrders(data); // Assuming the response is an array of orders
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, []);

    // Filter and search orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.productName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? order.status === filter : true;
        return matchesSearch && matchesFilter;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const currentOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    // Handlers for pagination
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Order</h1>

            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <table className="w-full border-collapse border border-gray-300 text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Product Name</th>
                        <th className="border border-gray-300 p-2">Order ID</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Customer Name</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Amount</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="border border-gray-300 p-2">{order.productName}</td>
                                <td className="border border-gray-300 p-2">{order.id}</td>
                                <td className="border border-gray-300 p-2">{order.date}</td>
                                <td className="border border-gray-300 p-2">{order.customerName}</td>
                                <td className="border border-gray-300 p-2">{order.status}</td>
                                <td className="border border-gray-300 p-2">${order.amount}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4"> {/* Adjusted to justify-end */}
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`text-black p-2 ${
                        currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                >
                    &larr;
                </button>

                <span className="text-lg mx-4">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={` text-black p-2  ${
                        currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                    }`}
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
}
