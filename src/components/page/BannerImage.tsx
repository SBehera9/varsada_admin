import React, { useState } from 'react';

interface BannerFormData {
    bannerName: string;
    topText: string;
    bottomText: string;
    mediaUrl: string;
    mediaType: 'image' | 'video' | 'gif';
    link: string;
    position: 'top' | 'center';
}

export default function BannerImage() {
    const [bannerName, setBannerName] = useState<string>('');
    const [topText, setTopText] = useState<string>('');
    const [bottomText, setBottomText] = useState<string>('');
    const [mediaUrl, setMediaUrl] = useState<string>('');
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'gif'>('image');
    const [link, setLink] = useState<string>('');
    const [position, setPosition] = useState<'top' | 'center'>('top');
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const handleSubmit = async () => {
        const formData: BannerFormData = {
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
            <h1 className="text-2xl font-bold mb-6">Banner Image</h1>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
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

                <div className="space-y-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value as 'image' | 'video' | 'gif')}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="gif">GIF</option>
                        </select>
                    </div>
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

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="top"
                            checked={position === 'top'}
                            onChange={(e) => setPosition(e.target.value as 'top' | 'center')}
                            className="mr-2"
                        />
                        Top
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="center"
                            checked={position === 'center'}
                            onChange={(e) => setPosition(e.target.value as 'top' | 'center')}
                            className="mr-2"
                        />
                        Center
                    </label>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 bg-[#C473FF] text-white rounded-md hover:bg-[#9350c4]"
                >
                    Preview
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#C473FF] text-white rounded-md hover:bg-[#9350c4]"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
