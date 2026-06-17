'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { Eye, Ban, CheckCircle, Trash2 } from 'lucide-react';
import { getUsers, updateUserStatus, deleteUser } from '@/actions/users';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const activeUsers = users.filter((u) => u.status === 'active').length;
  const bannedUsers = users.filter((u) => u.status === 'banned').length;
  const now = new Date();
  const newThisMonth = users.filter((u) => {
    const joined = new Date(u.created_at);
    return joined.getFullYear() === now.getFullYear() && joined.getMonth() === now.getMonth();
  }).length;

  let filteredUsers = [...users];
  if (searchQuery) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (roleFilter) {
    filteredUsers = filteredUsers.filter((u) => u.role === roleFilter);
  }
  if (statusFilter) {
    filteredUsers = filteredUsers.filter((u) => u.status === statusFilter);
  }

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    await updateUserStatus(userId, newStatus);
    const data = await getUsers();
    setUsers(data);
  };

  const handleDeleteUser = async (userId: string, fullName: string) => {
    if (confirm(`Are you sure you want to delete ${fullName}?`)) {
      await deleteUser(userId);
      const data = await getUsers();
      setUsers(data);
    }
  };

  const getInitials = (fullName: string) => {
    return fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  if (loading) {
    return <div className="text-[#F0C040]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
            Customers
          </h1>
          <span className="px-3 py-1 rounded-full bg-[#3D2010] text-[#C8A882] text-sm font-semibold">
            {users.length}
          </span>
        </div>
        <p className="text-[#C8A882] mt-1">Manage user accounts</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3D2010] border border-[#8B5E3C]">
          <span className="text-[#C8A882] text-sm">Total:</span>
          <span className="text-[#F0C040] font-semibold">{users.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3D2010] border border-[#6A9A5A]">
          <span className="text-[#6A9A5A] text-sm">Active:</span>
          <span className="text-[#8BC87A] font-semibold">{activeUsers}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3D2010] border border-[#C1440E]">
          <span className="text-[#C1440E] text-sm">Banned:</span>
          <span className="text-[#E8638A] font-semibold">{bannedUsers}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3D2010] border border-[#D4A017]">
          <span className="text-[#D4A017] text-sm">New This Month:</span>
          <span className="text-[#F0C040] font-semibold">{newThisMonth}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-[#3D2010] p-4 rounded-xl border border-[#8B5E3C]">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      <DataTable
        columns={[
          {
            key: 'avatar',
            header: '',
            width: '60px',
            render: (_: any, user: any) => (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4A017] to-[#E8780C] flex items-center justify-center">
                <span className="text-[#1A0800] font-bold text-sm">{getInitials(user.full_name)}</span>
              </div>
            ),
          },
          {
            key: 'full_name',
            header: 'Name',
            render: (name: string) => <span className="text-[#F0C040] font-semibold">{name || 'N/A'}</span>,
          },
          {
            key: 'email',
            header: 'Email',
            render: (email: string) => <span className="text-[#C8A882]">{email}</span>,
          },
          {
            key: 'role',
            header: 'Role',
            render: (role: string) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  role === 'admin'
                    ? 'bg-[#C1440E]/20 text-[#E8780C] border border-[#C1440E]'
                    : 'bg-[#8B5E3C]/20 text-[#C8A882] border border-[#8B5E3C]'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            ),
          },
          { key: 'country', header: 'Country' },
          { key: 'created_at', header: 'Join Date' },
          {
            key: 'status',
            header: 'Status',
            render: (status: string) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  status === 'active'
                    ? 'bg-[#6A9A5A]/20 text-[#8BC87A] border border-[#6A9A5A]'
                    : 'bg-[#C1440E]/20 text-[#E8638A] border border-[#C1440E]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            ),
          },
        ]}
        data={filteredUsers}
        actions={[
          {
            label: 'View',
            icon: <Eye className="w-4 h-4" />,
            variant: 'secondary',
            onClick: (user: any) => router.push(`/admin/users/${user.id}`),
          },
          {
            label: 'Toggle Status',
            icon: (user: any) => user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />,
            variant: 'primary',
            onClick: (user: any) => handleToggleStatus(user.id, user.status),
          },
          {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            variant: 'danger',
            onClick: (user: any) => handleDeleteUser(user.id, user.full_name || 'user'),
          },
        ]}
      />
    </div>
  );
}
