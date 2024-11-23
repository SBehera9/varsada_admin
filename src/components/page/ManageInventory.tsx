import React, { useState, useEffect } from "react";
import { Card, Spin, Table, Tag, message } from "antd";
import Heading from "../UI/ManageOrder/Heading";
import SearchFilter from "../UI/ManageOrder/SearchFilter";

export default function ManageInventory() {
    // States for search and filter
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const handleSearchChange = (value: string) => setSearch(value);
    const handleFilterChange = (value: string) => setFilter(value);

    // States for inventory data and loading
    const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch inventory data from the backend
    useEffect(() => {
        const fetchInventoryData = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch("http://your-backend-api.com/inventory"); // Replace with your actual API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch inventory data");
                }
                const data: InventoryDataResponse = await response.json();
                setInventoryData(data.summary);
                setTableData(data.tableData); // Table data fetched dynamically
            } catch (error) {
                console.error("Error fetching inventory data:", error);
                message.error("Failed to load inventory data. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchInventoryData();
    }, []);

    // Table columns configuration
    const columns = [
        {
            title: "Item No",
            dataIndex: "itemNo",
            key: "itemNo",
        },
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Sold Value",
            dataIndex: "soldValue",
            key: "soldValue",
        },
        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
        },
        {
            title: "Availability",
            dataIndex: "availability",
            key: "availability",
            render: (availability: string) => {
                const color =
                    availability === "In-stock"
                        ? "green"
                        : availability === "Low stock"
                        ? "orange"
                        : "red";
                return <Tag color={color}>{availability}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <span>
                    <a href="#">...</a>
                </span>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

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

            {/* Inventory Summary Section */}
            <div className="w-full" title="Overall Inventory">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Categories</h4>
                        <p className="text-xl font-bold">{inventoryData?.categories || "-"}</p>
                    </Card>
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Total Products</h4>
                        <p className="text-xl font-bold">{inventoryData?.totalProducts || "-"}</p>
                        <p className="text-sm text-gray-600">
                            ₹{inventoryData?.totalInventory?.value || "-"}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Total Inventory On Hand</h4>
                        <p className="text-xl font-bold">{inventoryData?.totalInventory?.count || "-"}</p>
                        <p className="text-sm text-gray-600">
                            ₹{inventoryData?.totalInventory?.value || "-"}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Top Selling Products (cnt)</h4>
                        <p className="text-sm">
                            Last 30 Days:{" "}
                            <span className="font-bold">{inventoryData?.topSelling?.last30Days || "-"}</span>
                        </p>
                        <p className="text-sm">
                            Units: <span className="font-bold">₹{inventoryData?.topSelling?.units || "-"}</span>
                        </p>
                    </Card>
                </div>
                <div className="mt-6 flex justify-center">
                    <Card className="shadow-md border-red-200">
                        <h4 className="text-base font-medium">Low InStock Products (Cnt)</h4>
                        <p className="text-sm">
                            Low InStock:{" "}
                            <span className="font-bold">{inventoryData?.lowInStock?.low || "-"}</span>
                        </p>
                        <p className="text-sm text-red-600">
                            Out of stock:{" "}
                            <span className="font-bold">{inventoryData?.lowInStock?.outOfStock || "-"}</span>
                        </p>
                    </Card>
                </div>
            </div>

            {/* Table Section */}
            <div className="mt-8">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 10 }}
                    rowKey={(record) => record.itemNo} // Use itemNo as unique key
                />
            </div>
        </div>
    );
}

// Interface for inventory data
interface InventoryData {
    categories: number;
    totalProducts: number;
    totalInventory: { count: number; value: number };
    topSelling: { last30Days: number; units: number };
    lowInStock: { low: number; outOfStock: number };
}

// Response structure from API
interface InventoryDataResponse {
    summary: InventoryData;
    tableData: any[];
}
