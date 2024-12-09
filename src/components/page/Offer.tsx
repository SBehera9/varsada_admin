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

interface FetchOffersResponse {
    offers: Offer[];
    total: number;
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
        setError(null); 
        try {
            const response = await axios.get<FetchOffersResponse>('/api/offers', {
                params: {
                    page: currentPage,
                    pageSize,
                    search: searchText,
                },
            });

            setOffers(response.data.offers || []);
            setTotalItems(response.data.total || 0);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to fetch offers.');
            } else {
                setError('An unexpected error occurred.');
            }
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
            render: (url: string) => <img src={url} alt="Banner" style={{ width: '100px' }} />,
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
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean, record: Offer) => (
                <Switch checked={isActive} onChange={() => handleToggleSwitch(record.id)} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <Button type="link">Details</Button>,
        },
    ];

    const handleToggleSwitch = (id: number) => {
        setOffers(prevOffers =>
            prevOffers.map(offer =>
                offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
            )
        );
    };

    const handleSearch = () => {
        setCurrentPage(1); 
        fetchOffers();
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
                    <Button className='bg-[#C473FF] text-white hover:bg-[#C473FF]' onClick={handleSearch}>
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
                    <span>Displaying {offers.length} of {totalItems} items</span>
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
