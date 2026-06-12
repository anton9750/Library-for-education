import React from 'react';
import TailwindButton from '../atoms/TailwindButton';
import Badge from '../atoms/Badge';

export default function DataGrid({ headers = [], records = [], onActionClick }) {
  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {headers.map((h, i) => <th key={i} className="px-6 py-4">{h}</th>)}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {records.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">
                  <Badge type={row.status === 'Active' ? 'success' : 'danger'}>{row.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <TailwindButton variant="outline" size="sm" onClick={() => onActionClick(row)}>
                    Configure Node
                  </TailwindButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}