import React from 'react';
import Dashboard from './pages/dashboard';
import AboutTheModel from './pages/about-the-model';
import MedicalInventory from './pages/medical-inventory';
import OwnForecast from './pages/own-forecast';
import MeetTheTeam from './pages/meet-the-team';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import HistoricalProjections from './pages/historical-projections';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#353839'
  },
  toolbar: {
    flexWrap: 'wrap',
    color: 'goldenrod'
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  link: {
    color: 'goldenrod',
    fontWeight: 'bold',
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
    '&:hover': {
      color: "white",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <Router>
        <CssBaseline />
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              #CodeforCovid19
            </Typography>
            <nav>
              <Link to="/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <Link to="/historical-projections" className={classes.link}>
                Historical Projections
              </Link> 
              <Link to="/forecasting-tool" className={classes.link}>
                Forecasting Tool
              </Link> 
              <Link to="/medical-inventory" className={classes.link}>
                Medical Inventory
              </Link>
              <Link to="/about-the-model" className={classes.link}>
                About the Model
              </Link>
              <Link to="/meet-the-team" className={classes.link}>
                Meet the team
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/dashboard' exact>
            <Dashboard />
          </Route>
          <Route path='/historical-projections' exact>
            <HistoricalProjections />
          </Route>
          <Route path='/forecasting-tool' exact>
            <OwnForecast />
          </Route>
          <Route path='/medical-inventory' exact>
            <MedicalInventory />
          </Route>
          <Route path='/about-the-model' exact>
            <AboutTheModel />
          </Route>
          <Route path='/meet-the-team' exact>
            <MeetTheTeam />
          </Route>
          <Redirect path='/' to='/dashboard' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
