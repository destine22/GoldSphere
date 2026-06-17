export default function AccountLoading() {
  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-[#3D2010] rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="h-80 bg-[#3D2010] rounded-xl border border-[#8B5E3C]" />
            </div>
            <div className="md:col-span-2">
              <div className="h-96 bg-[#3D2010] rounded-xl border border-[#8B5E3C]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
