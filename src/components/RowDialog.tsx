import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { ConditionalTableCell } from './ConditionalTableCell';

interface Props {
  open :boolean
  toggle: () => void
  fields :string[]
  item :any
  tableName :string
}
export const RowDialog :React.FC<Props> = ({ open, toggle, tableName, fields, item }) => {

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  if (!item) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={toggle}
      fullWidth={true}
      maxWidth="md"
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{tableName}</DialogTitle>
      <DialogContent dividers={true}>
        <TableInDialog fields={fields} item={item} />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TableInDialog :React.FC<{ fields :string[], item :any }> = ({ fields, item }) => {

  const handleClickNothing = (event :React.MouseEvent, item :any) => {
    event.preventDefault();
  };

  return (
    <TableContainer>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableBody>
          {fields.map(field => (
            <TableRow key={field}>
              <TableCell variant="head">{field}</TableCell>
              <ConditionalTableCell
                item={item} field={field} isDetail={true}
                handleClickShowItem={handleClickNothing}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
