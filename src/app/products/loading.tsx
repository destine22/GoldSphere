export default function ProductsLoading() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <div className="mb-12">
        <div className="h-10 w-64 mx-auto bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/20 to-[#2C1A0E] rounded animate-pulse mb-6" />
        <div className="h-6 w-96 mx-auto bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/10 to-[#2C1A0E] rounded animate-pulse mb-8" />
        <div className="h-12 w-96 mx-auto bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/10 to-[#2C1A0E] rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-[#8B5E3C]">
            <div className="h-64 bg-gradient-to-r from-[#3D2010] via-[#D4A017]/20 to-[#3D2010] animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 w-3/4 bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/10 to-[#2C1A0E] rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/10 to-[#2C1A0E] rounded animate-pulse" />
              <div className="h-8 w-1/3 bg-gradient-to-r from-[#2C1A0E] via-[#D4A017]/10 to-[#2C1A0E] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
