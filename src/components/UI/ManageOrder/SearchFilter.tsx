// components/SearchFilter.tsx
import { Input, Select } from "antd";

const { Option } = Select;

interface SearchFilterProps {
    search: string;
    filter: string;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: string) => void;
}

export default function SearchFilter({
    search,
    filter,
    onSearchChange,
    onFilterChange,
}: SearchFilterProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ width: 200 }}
            />
            <Select
                placeholder="Filter by status"
                value={filter}
                onChange={(value) => onFilterChange(value)}
                style={{ width: 200 }}
            >
                <Option value="">Filter</Option>
                <Option value="pending">Pending</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
            </Select>
        </div>
    );
}
