import { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata: Metadata = {
  title: 'GoldSphere Admin',
  description: 'Admin dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A0800]">
      <AdminSidebar />
      <AdminHeader />
      <main className="ml-[260px] pt-[64px] min-h-screen bg-[#2C1A0E]">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
