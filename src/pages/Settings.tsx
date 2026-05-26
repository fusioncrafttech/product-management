import React, { useState } from 'react';
import { Building2, Bell, Lock, Palette, Users, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clinic');
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'clinic', label: 'Clinic Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'users', label: 'User Management', icon: Users }
  ];

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage clinic settings and preferences"
      />

      {saveMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {saveMessage}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Clinic Profile */}
            {activeTab === 'clinic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Clinic Name"
                    placeholder="Enter clinic name"
                    defaultValue="DentalCare Clinic"
                  />
                  <FormInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    defaultValue="+1 234-567-8900"
                  />
                  <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    defaultValue="info@dentalcare.com"
                  />
                  <FormInput
                    label="Website"
                    placeholder="Enter website URL"
                    defaultValue="https://dentalcare.com"
                  />
                </div>
                <FormInput
                  label="Address"
                  placeholder="Enter clinic address"
                  defaultValue="123 Dental Street, Medical City, MC 12345"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="City"
                    placeholder="Enter city"
                    defaultValue="Medical City"
                  />
                  <FormInput
                    label="State/Province"
                    placeholder="Enter state/province"
                    defaultValue="MC"
                  />
                  <FormInput
                    label="Postal Code"
                    placeholder="Enter postal code"
                    defaultValue="12345"
                  />
                  <FormInput
                    label="Country"
                    placeholder="Enter country"
                    defaultValue="United States"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications for new appointments', defaultChecked: true },
                    { label: 'SMS notifications for appointment reminders', defaultChecked: true },
                    { label: 'Email notifications for new inquiries', defaultChecked: true },
                    { label: 'Email notifications for billing updates', defaultChecked: false },
                    { label: 'Push notifications for urgent matters', defaultChecked: true },
                    { label: 'Weekly summary reports', defaultChecked: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <FormInput
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <FormInput
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <FormInput
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            )}

            {/* Theme */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'Blue', color: 'bg-blue-500' },
                        { name: 'Green', color: 'bg-green-500' },
                        { name: 'Purple', color: 'bg-purple-500' }
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className={`p-4 rounded-lg border-2 ${
                            theme.name === 'Blue' ? 'border-blue-500' : 'border-gray-200'
                          } hover:border-gray-300 transition-colors`}
                        >
                          <div className={`w-8 h-8 ${theme.color} rounded-full mx-auto mb-2`}></div>
                          <span className="text-sm text-gray-700">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Display Mode
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50">
                        <span className="text-sm text-gray-700">Light Mode</span>
                      </button>
                      <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300">
                        <span className="text-sm text-gray-700">Dark Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <Button size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Admin User', email: 'admin@dentalcare.com', role: 'Administrator', status: 'Active' },
                    { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@dentalcare.com', role: 'Doctor', status: 'Active' },
                    { name: 'Receptionist Mary', email: 'mary@dentalcare.com', role: 'Receptionist', status: 'Active' },
                    { name: 'Nurse Amanda', email: 'amanda@dentalcare.com', role: 'Nurse', status: 'Active' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">{user.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {user.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
