import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const StyledTableCell = withStyles((theme) => ({
    head: {
      //backgroundColor: theme.palette.primary.dark,
      backgroundColor: '#353839',
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

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

const MedicalInventory = () => {
    const classes = useStyles();
    
    return <>
        <Container maxWidth="xl" component="main">
            <Grid container style={{padding: '25px'}} justify='center'>
                <Grid item xs={12} align="center">
                    <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    	Estimation of Medical Resources for Mumbai for the next three weeks
                    </Typography>    
                </Grid>
            </Grid>   
            <Grid container style={{padding: '10px', paddingTop: '40px'}} justify='center'>
                <Grid item xs={12} md={6}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                    <StyledTableCell align="center">Confirmed</StyledTableCell>
                                    <StyledTableCell align="center">Active</StyledTableCell>
                                    <StyledTableCell align="center">Deceased</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-14</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">127635</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">20175</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">7093</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-21</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">134470</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">20020</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">7475</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-28</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">141561</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">20131</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">7857</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={12} md={5} style={{padding: '10px'}}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                    <StyledTableCell align="center">ICU Beds</StyledTableCell>
                                    <StyledTableCell align="center">Ventilators</StyledTableCell>
                                    <StyledTableCell align="center">Oxygen Beds</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-14</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">1415</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">861</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">5426</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-21</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">1404</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">854</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">5384</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-28</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">1412</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">859</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">5414</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={5} style={{padding: '10px'}}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                    <StyledTableCell align="center">Testing Kits</StyledTableCell>
                                    <StyledTableCell align="center">Masks for HCW</StyledTableCell>
                                    <StyledTableCell align="center">Masks for Patients</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-14</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">644570</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">43179</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">21590</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-21</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">707947</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">42847</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">21424</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell align="center" component="th" scope="row">2020-08-28</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">773697</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">43085</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">21543</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>  
            <Grid item xs={12} align="center">
                  <Typography component="p" variant="p" align="justify" color="textPrimary" style={{paddingTop: '15px',  fontSize: '14px'}}>
                      <Link href="https://bit.ly/3kpz8rz">Click here to view the Calculations behind these Estimates</Link><br />
                  </Typography>
	    </Grid>
        </Container>
    </>;
}

export default MedicalInventory;
