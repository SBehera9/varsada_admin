import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";

interface InventoryData {
    categories: number;
    totalProducts: number;
    totalInventory: { count: number; value: number };
    topSelling: { last30Days: number; units: number };
    lowInStock: { low: number; outOfStock: number };
}

const InventoryDashboard: React.FC = () => {
    const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInventoryData = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch("http://your-backend-api.com/inventory"); // Replace with your actual API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch inventory data");
                }
                const data: InventoryData = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
                message.error("Failed to load inventory data. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchInventoryData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="w-full" title="Overall Inventory" >
            {/* Overall Inventory Card - Full Width */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* Categories */}
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Categories</h4>
                        <p className="text-xl font-bold">{inventoryData?.categories || "-"}</p>
                    </Card>

                    {/* Total Products */}
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Total Products</h4>
                        <p className="text-xl font-bold">{inventoryData?.totalProducts || "-"}</p>
                        <p className="text-sm text-gray-600">
                            ₹{inventoryData?.totalInventory?.value || "-"}
                        </p>
                    </Card>

                    {/* Total Inventory On Hand */}
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Total Inventory On Hand</h4>
                        <p className="text-xl font-bold">{inventoryData?.totalInventory?.count || "-"}</p>
                        <p className="text-sm text-gray-600">
                            ₹{inventoryData?.totalInventory?.value || "-"}
                        </p>
                    </Card>

                    {/* Top Selling Products */}
                    <Card className="shadow-md">
                        <h4 className="text-base font-medium">Top Selling Products (cnt)</h4>
                        <p className="text-sm">
                            Last 30 Days: <span className="font-bold">{inventoryData?.topSelling?.last30Days || "-"}</span>
                        </p>
                        <p className="text-sm">
                            Units: <span className="font-bold">₹{inventoryData?.topSelling?.units || "-"}</span>
                        </p>
                    </Card>
                </div>

                {/* Low InStock Products (Bottom 1 Card) */}
                <div className="mt-6 flex justify-center">
                    <Card className="shadow-md border-red-200">
                        <h4 className="text-base font-medium">Low InStock Products (Cnt)</h4>
                        <p className="text-sm">
                            Low InStock: <span className="font-bold">{inventoryData?.lowInStock?.low || "-"}</span>
                        </p>
                        <p className="text-sm text-red-600">
                            Out of stock: <span className="font-bold">{inventoryData?.lowInStock?.outOfStock || "-"}</span>
                        </p>
                    </Card>
                </div>

            </div>
    );
};

export default InventoryDashboard;
