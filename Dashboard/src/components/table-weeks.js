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
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
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
    const week = datum['week'];
    const active = datum['active'];
    const deceased = datum['deaths'];
    const confirmed = datum['confirmed'];

    return { week, active, deceased, confirmed };
  }
  const useStyles = makeStyles({
    table: {
      width: '100%',
    },
  });
  
const CustomizedTables = (props) => {
    const {
      showConfirmed = true,
      showActive = true,
      showDecesed = true
    } = props;

    const classes = useStyles();
    const confirmedOn = props.data.reduce((accumulator, currentValue) => {
      return accumulator || ((currentValue.hasOwnProperty('confirmed') && !isNaN(currentValue.confirmed)));
    }, false);
    const activeOn = props.data.reduce((accumulator, currentValue) => {
      return accumulator || ((currentValue.hasOwnProperty('active') && !isNaN(currentValue.active)));
    }, false);
    const deceasedOn = props.data.reduce((accumulator, currentValue) => {
      return accumulator || ((currentValue.hasOwnProperty('deaths') && !isNaN(currentValue.deaths)));
    }, false);
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Week #</StyledTableCell>
              { showConfirmed && confirmedOn && <StyledTableCell align="center">Confirmed</StyledTableCell> }
              { showActive && activeOn && <StyledTableCell align="center">Active</StyledTableCell> }
              { showDecesed && deceasedOn && <StyledTableCell align="center">Deceased</StyledTableCell> }
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data
            .map(datum => {
              return createData(datum);
            })
            .reduce((accumulator, currentValue) => {
              const index = currentValue.week - 1;
              if(accumulator[index]) {
                accumulator[index] = {
                  week: accumulator[index].week,
                  active: accumulator[index].active + currentValue.active,
                  deceased: accumulator[index].deceased + currentValue.deceased,
                  confirmed: accumulator[index].confirmed + currentValue.confirmed,
                }
              } else {
                accumulator[index] = currentValue;
              }
              return accumulator;
            }, [])
            .map(row => {
              return (
                <StyledTableRow key={row.week}>
                    <StyledTableCell align="center" component="th" scope="row">{row.week}</StyledTableCell>
                    { showConfirmed && confirmedOn && <StyledTableCell align="center" component="th" scope="row">{row.confirmed}</StyledTableCell> }
                    { showActive && activeOn && <StyledTableCell align="center" component="th" scope="row">{row.active}</StyledTableCell> }
                    { showDecesed && deceasedOn && <StyledTableCell align="center" component="th" scope="row">{row.deceased}</StyledTableCell> }
                </StyledTableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CustomizedTables; 