import './TaskTable.css';
import { TaskTableProps } from './TaskTable.types';
import { Table, TablePagination } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function TaskTable(props: TaskTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    e?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const sliceText = (text: string, dim: number): string => {
    return text.slice(0, dim) + (text.length >= dim ? '...' : '');
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Required Time</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>People</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((t) => (
              <TableRow
                key={t.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {sliceText(t.title, 30)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sliceText(t.notes, 30)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sliceText(t.requiredTime, 30)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sliceText(t.tagsList.join(', '), 30)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sliceText(t.peopleList.join(', '), 30)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sliceText(t.status, 30)}
                </TableCell>
                <TableCell>
                  <div className="linkBtn">
                    <Link to={`/task/${t.id}`}>Read more</Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
