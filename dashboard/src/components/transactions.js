import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Transactions = ({ transactions ,address}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    // Sort transactions by timeStamp in descending order
    const sorted = [...transactions].sort((a, b) => b.timeStamp - a.timeStamp);
    setSortedTransactions(sorted);
  }, [transactions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderEllipsis = (text) => {
    if (text.length > 15) {
      return text.slice(0, 15) + '...';
    }
    return text;
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Txn Hash</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.slice(startIndex, endIndex).map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    {renderEllipsis(transaction.hash)}
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={() => copyToClipboard(transaction.hash)}>Copy</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{transaction.from == address ? "Send" : "Receive"}</TableCell>
              <TableCell>{transaction.blockNumber}</TableCell>
              <TableCell>{(new Date(transaction.timeStamp*1000)).toLocaleString()}</TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    {renderEllipsis(transaction.from)}
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={() => copyToClipboard(transaction.from)}>Copy</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    {renderEllipsis(transaction.to)}
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={() => copyToClipboard(transaction.to)}>Copy</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{transaction.value/1000000000000000000} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={sortedTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default Transactions;
