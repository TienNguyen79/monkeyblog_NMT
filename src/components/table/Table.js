import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  /* height: 300px; */
  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    /* Mobile styles */
    width: 330px;
  }
  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 640px) and (max-width: 1023px) {
    width: 800px;
  }
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
