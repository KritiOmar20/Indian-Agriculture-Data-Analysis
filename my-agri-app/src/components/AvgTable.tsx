import React from 'react';
import { AvgData } from '../utils/dataProcessing';

interface AvgTableProps {
  data: AvgData[];
}

const AvgTable: React.FC<AvgTableProps> = ({ data }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield of the Crop between 1950-2020</th>
          <th>Average Cultivation Area of the Crop between 1950-2020</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.crop}</td>
            <td>{item.avgProduction}</td>
            <td>{item.avgArea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AvgTable;
