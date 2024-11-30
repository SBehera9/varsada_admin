import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, Input, Pagination, Alert, Spin } from 'antd';
import axios from 'axios';

interface Offer {
    id: number;
    bannerImage: string;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

const Offer: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOffers();
    }, [currentPage, pageSize, searchText]);

    const fetchOffers = async () => {
        setLoading(true);
        setError(null); // Clear any previous errors
        try {
            const response = await axios.get('/api/offers', {
                params: {
                    page: currentPage,
                    pageSize,
                    search: searchText,
                },
            });

            const { offers = [], total = 0 } = response.data || {};
            setOffers(offers);
            setTotalItems(total);
        } catch (error) {
            setError('Failed to fetch offers. Please try again later.');
            setOffers([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Banner Image',
            dataIndex: 'bannerImage',
            key: 'bannerImage',
            render: (text: string) => <img src={text} alt="Banner" style={{ width: '100px' }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Action',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text: boolean, record: Offer) => (
                <Switch checked={text} onChange={() => handleSwitchChange(record.id)} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <Button type="link">...</Button>,
        },
    ];

    const handleSwitchChange = (id: number) => {
        setOffers(prevOffers =>
            prevOffers.map(offer =>
                offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
            )
        );
    };

    const handleSearch = () => {
        fetchOffers(); // Trigger search manually when button is clicked
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Offers</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={handleInputChange}
                        style={{ width: 200 }}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Create Banner
                    </Button>
                </div>
            </div>

            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={offers}
                    pagination={false}
                    rowKey="id"
                />
            )}

            {!loading && !error && (
                <div className="flex justify-between items-center mt-4">
                    <span>Displaying {offers?.length || 0} of {totalItems || 0} items</span>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Offer;
