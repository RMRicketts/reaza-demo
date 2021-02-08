import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  corners: {
    borderRadius: 0
  }
});

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  return (
    <TableContainer className={classes.corners}>
      <Table
        className={classes.table}
        aria-label="customized table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell width="25%">ADDRESS</TableCell>
            <TableCell width="10%">PRICE</TableCell>
            <TableCell width="15%">LISTED DATE</TableCell>
            <TableCell width="10%">MLS#</TableCell>
            <TableCell width="40%">DESCRIPTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.properties.map(row => {
            return (
              <TableRow key={row.ListingId}>
                <TableCell component="th" scope="row">
                  {row.UnparsedAddress}
                </TableCell>
                <TableCell>{formatter.format(row.ListPrice)}</TableCell>
                <TableCell>
                  {new Date(row.OnMarketDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.ListingId}</TableCell>
                <TableCell>{row.SyndicationRemarks}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
