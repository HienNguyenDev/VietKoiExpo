import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, Typography } from '@mui/material';

const RankingTable = ({ data, theme }) => {
  // Define table columns
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Fish Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Win',
      dataIndex: 'win',
      key: 'win',
    },
  ];

  // Custom table styles based on theme
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  };

  const thStyle = {
    padding: '10px',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  };

  const evenRowStyle = {
    backgroundColor: theme.palette.background.default,
  };

  const oddRowStyle = {
    backgroundColor: theme.palette.background.paper,
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={thStyle}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={record.key} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
            {columns.map((column) => (
              <td key={column.key} style={tdStyle}>
                {record[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;