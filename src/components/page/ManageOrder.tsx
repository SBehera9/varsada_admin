export default function ManageOrder() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-left">Manage Order</h1>
            <div className="flex items-center space-x-4">
                <input 
                    type="text" 
                    placeholder="Search Orders" 
                    className="mt-4 p-2 border border-gray-300 rounded"
                />
                <select className="mt-4 p-2 border border-gray-300 rounded">
                    <option value="">Filter</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
        </div>
    );
}
