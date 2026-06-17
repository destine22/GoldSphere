'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useAdminStore } from '@/store/adminStore';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const { settings, updateSettings } = useAdminStore();

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p className="text-sm font-semibold text-[#F0C040]">{label}</p>
        {description && (
          <p className="text-xs text-[#C8A882]">{description}</p>
        )}
      </div>
      <div
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
          checked ? 'bg-[#D4A017]' : 'bg-[#6B3A1F]'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            checked ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  const colorPalette = [
    { name: 'Main Dark', color: '#1A0800' },
    { name: 'Background', color: '#2C1A0E' },
    { name: 'Card', color: '#3D2010' },
    { name: 'Border', color: '#8B5E3C' },
    { name: 'Gold', color: '#D4A017' },
    { name: 'Orange', color: '#E8780C' },
    { name: 'Red', color: '#C1440E' },
    { name: 'Green', color: '#6A9A5A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
          Settings
        </h1>
        <p className="text-[#C8A882] mt-1">Manage your admin dashboard settings</p>
      </div>

      <div className="flex gap-2 bg-[#3D2010] p-1 rounded-xl border border-[#8B5E3C] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                : 'text-[#C8A882] hover:bg-[#D4A017]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]"
        style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}
      >
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040]">
              General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => updateSettings({ storeName: e.target.value })}
                  className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                    Store Email
                  </label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => updateSettings({ storeEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                    Store Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => updateSettings({ storePhone: e.target.value })}
                    className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                  Store Address
                </label>
                <textarea
                  value={settings.storeAddress}
                  onChange={(e) => updateSettings({ storeAddress: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => updateSettings({ currency: e.target.value })}
                  className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040]">
              Appearance
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-[#E8D5A3] mb-4">Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colorPalette.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div
                      className="w-full h-16 rounded-lg border border-[#8B5E3C]"
                      style={{ backgroundColor: color.color }}
                    />
                    <p className="text-sm text-[#C8A882] font-medium">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C]">
              <h3 className="text-lg font-semibold text-[#F0C040] mb-2">
                African Market Dark
              </h3>
              <p className="text-sm text-[#C8A882]">Custom theme editing coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040]">
              Notifications
            </h2>
            <div className="space-y-4">
              <ToggleSwitch
                checked={settings.notifications.newOrder}
                onChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, newOrder: checked },
                  })
                }
                label="New Order Notification"
                description="Get notified when a new order is placed"
              />
              <ToggleSwitch
                checked={settings.notifications.lowStock}
                onChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, lowStock: checked },
                  })
                }
                label="Low Stock Alert"
                description="Get notified when product stock is low"
              />
              <ToggleSwitch
                checked={settings.notifications.newUser}
                onChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, newUser: checked },
                  })
                }
                label="New User Registration"
                description="Get notified when a new user signs up"
              />
              <ToggleSwitch
                checked={settings.notifications.orderUpdate}
                onChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, orderUpdate: checked },
                  })
                }
                label="Order Status Update"
                description="Get notified when order status changes"
              />
              <ToggleSwitch
                checked={settings.notifications.weeklyReport}
                onChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, weeklyReport: checked },
                  })
                }
                label="Weekly Revenue Report"
                description="Receive weekly revenue summary"
              />
            </div>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity">
              Save Preferences
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040]">
              Security
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#E8D5A3] mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#8B5E3C]">
                <ToggleSwitch
                  checked={settings.security.twoFactor}
                  onChange={(checked) =>
                    updateSettings({
                      security: { ...settings.security, twoFactor: checked },
                    })
                  }
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
              </div>
              <div className="pt-4">
                <label className="block text-sm font-semibold text-[#F0C040] mb-2">
                  Session Timeout
                </label>
                <select
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    updateSettings({
                      security: { ...settings.security, sessionTimeout: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity">
              Save Security Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
