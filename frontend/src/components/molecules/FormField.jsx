import React from 'react';
import Badge from '../atoms/Badge';

export default function FormField({ label, error, required, type = 'text', ...props }) {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {error && <Badge type="danger">Required</Badge>}
      </div>
      <input
        type={type}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm text-sm transition-colors duration-150 focus:outline-none focus:ring-2 ${
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...props}
      />
    </div>
  );
}