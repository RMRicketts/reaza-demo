import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  corners: {
    borderRadius: 0
  }
});

function getRepresenting(row, memberKey) {
  if (
    (row.ListAgentKey === memberKey || row.CoListAgentKey === memberKey) &&
    row.BuyerAgentKey !== memberKey &&
    row.CoBuyerAgentKey !== memberKey
  ) {
    return "SELLER";
  }
  if (
    row.ListAgentKey !== memberKey &&
    row.CoListAgentKey !== memberKey &&
    (row.BuyerAgentKey === memberKey || row.CoBuyerAgentKey === memberKey)
  ) {
    return "BUYER";
  }
  if (
    (row.ListAgentKey === memberKey || row.CoListAgentKey === memberKey) &&
    (row.BuyerAgentKey === memberKey || row.CoBuyerAgentKey === memberKey)
  ) {
    return "BOTH";
  }
}

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
            <StyledTableCell>ZIP</StyledTableCell>
            <StyledTableCell>ADDRESS</StyledTableCell>
            <StyledTableCell>LIST DATE</StyledTableCell>
            <StyledTableCell>SOLD DATE</StyledTableCell>
            <StyledTableCell>DAYS TO SELL</StyledTableCell>
            <StyledTableCell>PRICE TARGET</StyledTableCell>
            <StyledTableCell>REPRESENTED</StyledTableCell>
            <StyledTableCell>REAZA INDEX</StyledTableCell>
            <StyledTableCell>COMMENTS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.properties.map(row => {
            let dsell = new Date(row.CloseDate) - new Date(row.OnMarketDate);
            let closeDate = new Date(row.CloseDate).toLocaleDateString();
            if (dsell < 0) {
              dsell = "";
              closeDate = "";
            } else {
              dsell = Math.Floor(dsell / (24 * 60 * 60 * 1000));
            }
            return (
              <StyledTableRow key={row.ListingId}>
                <StyledTableCell component="th" scope="row">
                  {row.PostalCode}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.StreetNumber} {row.StreetName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(row.OnMarketDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">{closeDate}</StyledTableCell>
                <StyledTableCell align="right">{dsell}</StyledTableCell>
                <StyledTableCell align="right">
                  {formatter.format(row.ListPrice)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {getRepresenting(row)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {50 + Math.round(Math.random() * 50)}
                </StyledTableCell>
                <StyledTableCell align="right">
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
