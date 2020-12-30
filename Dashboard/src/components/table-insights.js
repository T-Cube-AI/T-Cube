import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.dark,
      fontWeight: 'bold'
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(datum) {
        const date = datum['date'];
        const active = datum['active'];
        const deceased = datum['deaths'];
        const confirmed = datum['confirmed'];
        const recovered = datum['recovered'];

        return { date, active, deceased, confirmed, recovered };
  }
  const useStyles = makeStyles({
    table: {
      width: '100%',
    },
  });
  
const CustomizedTables = (props) => {
    const {
      insights
    } = props;

    const classes = useStyles();
    // {"Current":{"cfr":0.93,"ifr":3.85}}
    // {"Projected":{"cfr":0.9,"ifr":4.46}}
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">CFR</StyledTableCell>
                <StyledTableCell align="center">IFR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              { 
                insights && insights.hasOwnProperty('Current') &&
                <StyledTableRow>
                  <StyledTableCell align="center" component="th" scope="row"><b>Current</b></StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{insights.Current.cfr}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{insights.Current.ifr}</StyledTableCell>
                </StyledTableRow>
              }
              { 
                insights && insights.hasOwnProperty('Projected') &&
                <StyledTableRow>
                  <StyledTableCell align="center" component="th" scope="row"><b>Projected</b></StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{insights.Projected.cfr}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{insights.Projected.ifr}</StyledTableCell>
              </StyledTableRow>
              }
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CustomizedTables; 