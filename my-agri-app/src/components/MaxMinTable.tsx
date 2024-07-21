import React from 'react';
import { MaxMinProduction } from '../utils/dataProcessing';

interface MaxMinTableProps {
  data: MaxMinProduction[];
}

const MaxMinTable: React.FC<MaxMinTableProps> = ({ data }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production</th>
          <th>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.year}</td>
            <td>{item.maxCrop.crop} ({item.maxCrop.production})</td>
            <td>{item.minCrop.crop} ({item.minCrop.production})</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaxMinTable;
