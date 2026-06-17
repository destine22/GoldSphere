interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative';
  description?: string;
  color: 'gold' | 'orange' | 'green' | 'red';
}

export default function StatCard({ title, value, icon, change, changeType, description, color }: StatCardProps) {
  const colorClasses = {
    gold: 'from-[#D4A017] to-[#E8780C]',
    orange: 'from-[#E8780C] to-[#C1440E]',
    green: 'from-[#6A9A5A] to-[#8BC34A]',
    red: 'from-[#C1440E] to-[#E8638A]',
  };

  return (
    <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C] hover:shadow-xl hover:shadow-[#D4A017]/20 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#C8A882] text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}/20`}>
          <div className="text-[#F0C040]">{icon}</div>
        </div>
      </div>
      <p className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040] mb-2">{value}</p>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          changeType === 'positive'
            ? 'bg-[#6A9A5A]/20 text-[#8BC34A]'
            : 'bg-[#C1440E]/20 text-[#E8638A]'
        }`}>
          {change}
        </span>
        {description && (
          <span className="text-[#C8A882] text-sm">{description}</span>
        )}
      </div>
    </div>
  );
}
