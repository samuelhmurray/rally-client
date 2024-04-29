import React from 'react';

interface TableData {
  [key: string]: string | number;
}

interface TableProps {
  data: TableData[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td
                  key={index}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
