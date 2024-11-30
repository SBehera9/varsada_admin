import React, { useState } from 'react';

export default function BannerImage() {
    const [bannerName, setBannerName] = useState('');
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [link, setLink] = useState('');
    const [position, setPosition] = useState('top');
    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = async () => {
        const formData = {
            bannerName,
            topText,
            bottomText,
            mediaUrl,
            mediaType,
            link,
            position,
        };

        try {
            const response = await fetch('API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Banner uploaded successfully!');
            } else {
                alert('Failed to upload the banner. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the backend.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 ">Banner Image</h1>
            <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    {/* Banner Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Name</label>
                        <input
                            type="text"
                            value={bannerName}
                            onChange={(e) => setBannerName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter banner name"
                        />
                    </div>
                    {/* Top Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Top Text</label>
                        <textarea
                            value={topText}
                            onChange={(e) => setTopText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Enter top text"
                        />
                    </div>
                    {/* Bottom Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bottom Text</label>
                        <textarea
                            value={bottomText}
                            onChange={(e) => setBottomText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Enter bottom text"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* Media URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
                        <input
                            type="text"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter media URL"
                        />
                    </div>
                    {/* Media Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="gif">GIF</option>
                        </select>
                    </div>
                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter link"
                        />
                    </div>
                </div>
            </div>

            {/* Position Section */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="top"
                            checked={position === 'top'}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mr-2"
                        />
                        Top
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="center"
                            checked={position === 'center'}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mr-2"
                        />
                        Center
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Preview
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Submit
                </button>
            </div>

            
        </div>
    );
}
