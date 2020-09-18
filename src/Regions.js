import React from "react";

import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import RegionsDialog from "./RegionsDialog";

function Regions() {
  const [open, setOpen] = React.useState(true);
  const [regionList, setRegionList] = React.useState([]);
  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }
  const onAdd = (newRegions) => {
    setRegionList((prevRegions) => [...prevRegions, ...newRegions]);
  };

  const onRemove = (id) => {
    setRegionList(regionList.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <header>
        <Typography variant="h5">Regions</Typography>
      </header>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>County</TableCell>
            <TableCell align="right">
              <Button onClick={openDialog}>+ Add</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {regionList.map((item) => (
            <TableRow key={`${item.county}, ${item.state}, ${item.id}`}>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.county}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ marginTop: -12, marginBottom: -12 }}
                  onClick={() => onRemove(item.id)}
                >
                  x
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RegionsDialog open={open} onClose={closeDialog} onAdd={onAdd} />
    </Container>
  );
}

export default Regions;
