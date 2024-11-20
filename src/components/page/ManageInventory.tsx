import React, { useState } from "react";
import Heading from "../UI/ManageOrder/Heading";
import SearchFilter from "../UI/ManageOrder/SearchFilter";
import InventoryDashboard from "../UI/ManageOrder/InventoryDashboard";
import OrderTable from "../UI/ManageOrder/OrderTable";

export default function ManageInventory() {
    // Example state and handlers for the SearchFilter component
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    
    // Example state and handlers for the OrderTable component
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const totalOrders = 100;

    const handleSearchChange = (value: string) => setSearch(value);
    const handleFilterChange = (value: string) => setFilter(value);

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleViewOrder = (order: any) => {
        console.log("View Order Details:", order);
    };

    return (
        <div className="p-4">
            {/* Heading */}
            <Heading title="Manage Inventory" />

            {/* Search and Filter */}
            <SearchFilter
                search={search}
                filter={filter}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
            />

            {/* Inventory Details */}
            <InventoryDashboard />

            {/* Orders Table */}
            <div className="mt-6">
                <OrderTable
                    orders={orders}
                    currentPage={currentPage}
                    ordersPerPage={ordersPerPage}
                    totalOrders={totalOrders}
                    onPageChange={handlePageChange}
                    onViewOrder={handleViewOrder}
                />
            </div>
        </div>
    );
}
