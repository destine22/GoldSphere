import { ReactNode } from 'react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => ReactNode;
  width?: string;
}

interface Action {
  label: string;
  icon?: ReactNode | ((item: any) => ReactNode);
  onClick: (item: any) => void;
  variant?: 'primary' | 'danger' | 'secondary';
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (item: any) => void;
  actions?: Action[];
  idKey?: string;
}

export default function DataTable({ columns, data, onRowClick, actions, idKey = 'id' }: DataTableProps) {
  if (!data.length) {
    return (
      <div className="rounded-xl shadow-lg border border-[#8B5E3C] p-12 text-center" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
        <p className="text-[#C8A882]">No data found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-lg border border-[#8B5E3C] overflow-hidden" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#3D2010] border-b border-[#8B5E3C]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-[#F0C040] uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right text-sm font-semibold text-[#F0C040] uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8B5E3C]">
            {data.map((item, index) => (
              <tr
                key={item[idKey] || index}
                className={`transition-colors duration-200 cursor-pointer ${
                  index % 2 === 0 ? 'bg-[#2C1A0E]' : 'bg-[#2C1A0E]/50'
                } hover:bg-[#3D2010]`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-[#E8D5A3]">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {actions.map((action, i) => (
                        <button
                          key={`action-${item[idKey] || index}-${i}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(item);
                          }}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            action.variant === 'danger'
                              ? 'hover:bg-[#C1440E]/20 text-[#C1440E]'
                              : action.variant === 'primary'
                              ? 'hover:bg-[#D4A017]/20 text-[#D4A017]'
                              : 'hover:bg-[#8B5E3C]/20 text-[#C8A882]'
                          }`}
                        >
                          {typeof action.icon === 'function' ? action.icon(item) : action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
