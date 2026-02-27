
import React from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

interface Column {
    label: string;
    field: string;
    sortable?: boolean;
    type?: 'text' | 'date' | 'badge';
    format?: string;
    view?: React.ComponentType<{ value: any; item: any }>;
}

interface DynamicTableProps {
    data: any[];
    columns: Column[];
    loading?: boolean;
    total?: number;
    perPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onSearchChange?: (search: string) => void;
    searchPlaceholder?: string;
    statusFilterOptions?: Record<string, string>;
    onStatusFilterChange?: (status: string) => void;
}

export default function DynamicTable({
    data,
    columns,
    loading = false,
    total = 0,
    perPage = 10,
    currentPage = 1,
    onPageChange,
    onSearchChange,
    searchPlaceholder = "Search...",
    statusFilterOptions,
    onStatusFilterChange
}: DynamicTableProps) {
    const totalPages = Math.ceil(total / perPage);

    const renderCell = (item: any, column: Column) => {
        const value = item[column.field];

        if (column.view) {
            const ViewComponent = column.view;
            return <ViewComponent value={value} item={item} />;
        }

        if (column.type === 'date') {
            return new Date(value).toLocaleString();
        }

        if (column.type === 'badge') {
            return (
                <span className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wide bg-slate-800 border border-slate-700 text-slate-400">
                    {value}
                </span>
            );
        }

        return value;
    };

    return (
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-sm overflow-hidden text-slate-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1e293b]/50">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-slate-800 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="flex items-center gap-3">
                    {statusFilterOptions && (
                        <select
                            onChange={(e) => onStatusFilterChange?.(e.target.value)}
                            className="bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-all"
                        >
                            <option value="">All Statuses</option>
                            {Object.entries(statusFilterOptions).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto relative min-h-[200px]">
                {loading && (
                    <div className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-indigo-500" size={32} />
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e293b] border-b border-slate-800">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-6 py-4 text-xs font-mono text-slate-500 uppercase font-medium tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {data.map((item, rowIdx) => (
                            <tr key={item.id || rowIdx} className="group hover:bg-slate-800/30 transition-colors">
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4 text-sm">
                                        {renderCell(item, col)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && !loading && (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500 font-mono italic">
                                    NO RECORDS FOUND. ACCESS PROTOCOL EMPTY.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                <div className="text-xs text-slate-500 font-mono">
                    Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, total)} of {total} results
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange?.(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className="p-2 bg-[#0f172a] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 transition-colors group"
                    >
                        <ChevronLeft size={16} className="group-active:scale-95 transition-transform" />
                    </button>
                    <div className="flex items-center px-4 bg-[#0f172a] border border-slate-800 rounded-lg text-xs font-mono font-bold">
                        {currentPage} / {totalPages || 1}
                    </div>
                    <button
                        onClick={() => onPageChange?.(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="p-2 bg-[#0f172a] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 transition-colors group"
                    >
                        <ChevronRight size={16} className="group-active:scale-95 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
