import React, { useState } from 'react';

const AdminSettingsPage: React.FC = () => {
    const [appName, setAppName] = useState('');
    const [appDescription, setAppDescription] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPhone, setAdminPhone] = useState('');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleSaveChanges = () => {
        // Handle save logic
        console.log({ appName, appDescription, adminEmail, adminPhone, maintenanceMode });
        alert('Settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h1>

                {/* General Settings */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">App Name</label>
                            <input
                                type="text"
                                value={appName}
                                onChange={(e) => setAppName(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter app name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">App Description</label>
                            <textarea
                                value={appDescription}
                                onChange={(e) => setAppDescription(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter app description"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Admin Contact</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Admin Email</label>
                            <input
                                type="email"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter admin email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Admin Phone</label>
                            <input
                                type="tel"
                                value={adminPhone}
                                onChange={(e) => setAdminPhone(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter admin phone number"
                            />
                        </div>
                    </div>
                </div>

                {/* Maintenance Mode */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Maintenance Mode</h2>
                    <div className="flex items-center space-x-4">
                        <label className="block text-sm font-medium text-gray-600">Enable Maintenance Mode</label>
                        <input
                            type="checkbox"
                            checked={maintenanceMode}
                            onChange={(e) => setMaintenanceMode(e.target.checked)}
                            className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
