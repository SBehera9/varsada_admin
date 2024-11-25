import React from 'react';

export default function ManagePromo() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Item no: QNC1827817291 (sheela)</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Updated Stock Information (12/09/2024)</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-medium">Opening On Hand Stock</p>
              <p className="text-xl">7</p>
            </div>
            <div>
              <p className="font-medium">New Inventory Count</p>
              <p className="text-xl">10</p>
            </div>
            <div>
              <p className="font-medium">New On Hand Total</p>
              <p className="text-xl">17</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Product Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Product Name</p>
              <p>Sheela</p>
            </div>
            <div>
              <p className="font-medium">Product Category</p>
              <p>Stavn</p>
            </div>
            <div>
              <p className="font-medium">Product Sub-Category</p>
              <p>Stavn</p>
            </div>
            <div>
              <p className="font-medium">Expiry Date</p>
              <p>Stavn</p>
            </div>
            <div>
              <p className="font-medium">Colors</p>
              <p>+12387428345</p>
            </div>
            <div>
              <p className="font-medium">Sizes</p>
              <p>Individual</p>
            </div>
            <div>
              <p className="font-medium">Price</p>
              <p>Individual</p>
            </div>
          </div>
          <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">Edit</button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Stock Information</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-medium">Opening Stock</p>
              <p className="text-xl">35</p>
            </div>
            <div>
              <p className="font-medium">Stock Sold</p>
              <p className="text-xl">24</p>
            </div>
            <div>
              <p className="font-medium">Stock Damaged</p>
              <p className="text-xl">4</p>
            </div>
            <div>
              <p className="font-medium">On Hand Stock</p>
              <p className="text-xl">7</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="py-2 px-4 bg-blue-500 text-white rounded">Edit Current Stock</button>
            <button className="py-2 px-4 bg-green-500 text-white rounded">Add New Stock</button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Updated Stock Information</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Opening On Hand Stock</th>
                <th className="py-2 px-4 border">New Inventory Count</th>
                <th className="py-2 px-4 border">New On Hand Total</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">24/07/2024</td>
                <td className="py-2 px-4 border">20</td>
                <td className="py-2 px-4 border">20</td>
                <td className="py-2 px-4 border">20</td>
                <td className="py-2 px-4 border">...</td>
              </tr>
              {/* Repeat similar rows */}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <p>Displaying 10 of 30 items</p>
            <div className="flex space-x-2">
              <button className="py-2 px-4 bg-gray-200 text-gray-600 rounded">1</button>
              <button className="py-2 px-4 bg-gray-200 text-gray-600 rounded">2</button>
              <button className="py-2 px-4 bg-gray-200 text-gray-600 rounded">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
