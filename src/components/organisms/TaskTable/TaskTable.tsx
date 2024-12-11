import { TaskTableProps } from './TaskTable.types';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export default function TaskTable(props: TaskTableProps) {
  const sliceText = (text: string, dim: number): string => {
    return text.slice(0, dim) + (text.length >= dim ? '...' : '');
  };

  return (
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
                <Link to={`/task/${t.id}`}>{t.title}</Link>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
