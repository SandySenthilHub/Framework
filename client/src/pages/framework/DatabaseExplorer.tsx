import React, { useState } from 'react';
import { Database, Table, Eye, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

const DatabaseExplorer = () => {
  const [selectedTable, setSelectedTable] = useState<string>('');

  // Fetch all tables
  const { data: tablesData, isLoading: tablesLoading, refetch: refetchTables } = useQuery({
    queryKey: ['/api/database/tables'],
    queryFn: async () => {
      const response = await fetch('/api/database/tables');
      if (!response.ok) throw new Error('Failed to fetch tables');
      return response.json();
    },
  });

  // Fetch table structure
  const { data: tableStructure, isLoading: structureLoading, refetch: refetchStructure } = useQuery({
    queryKey: ['/api/database/table-structure', selectedTable],
    queryFn: async () => {
      if (!selectedTable) return null;
      const response = await fetch(`/api/database/table-structure/${selectedTable}`);
      if (!response.ok) throw new Error('Failed to fetch table structure');
      return response.json();
    },
    enabled: !!selectedTable,
  });

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Database Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Explore Call_Center database structure</p>
        </div>
        <Button onClick={() => refetchTables()} className="bg-orange-600 hover:bg-orange-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tables List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database Tables ({tablesData?.tables?.length || 0})
            </h2>
          </div>
          <div className="p-4">
            {tablesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tables...</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {tablesData?.tables?.map((table: any) => (
                  <div
                    key={table.tableName}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTable === table.tableName
                        ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedTable(table.tableName)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Table className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {table.tableName}
                        </span>
                      </div>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Schema: {table.tableSchema}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Structure */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedTable ? `Table: ${selectedTable}` : 'Select a table to view structure'}
            </h2>
          </div>
          <div className="p-4">
            {!selectedTable ? (
              <div className="text-center py-8">
                <Table className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Click on a table from the left to view its structure
                </p>
              </div>
            ) : structureLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading table structure...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Columns */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Columns ({tableStructure?.columns?.length || 0})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Column
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Type
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Nullable
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Max Length
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {tableStructure?.columns?.map((column: any) => (
                          <tr key={column.columnName}>
                            <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                              {column.columnName}
                            </td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                              {column.dataType}
                            </td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                              {column.isNullable}
                            </td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                              {column.maxLength || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sample Data */}
                {tableStructure?.sampleData?.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                      Sample Data (Top 5 rows)
                    </h3>
                    <div className="overflow-x-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <pre className="text-xs text-gray-800 dark:text-gray-200">
                        {JSON.stringify(tableStructure.sampleData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseExplorer;