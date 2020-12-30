import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';
import TableDays from '../components/table-days';

import api from '../api';
import Plot from '../components/plot';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    paper: {
      position: 'absolute',
      width: '90%',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const OwnForecast = () => {
    const classes = useStyles();

    const [ population, setPopulation ] = useState();
    const [ file, setFile ] = useState();

    const [ pastData, setPastData ] = useState([]);
    const [ predictionData, setPredictionData ] = useState([]);

    const [ plot, setPlot ] = useState('Confirmed');

    const [ open, setOpen ] = useState(false);

    const handleOpen = (state) => {
        setOpen(state);
    };

    const plotHandler = (plot) => {
        setPlot(plot);
    }

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    const populationHandler = (event) => {
        const population = event.target.value;
        setPopulation(population);
    }

    const onSubmit = () => {
        const fetchData = async () => {
            try {
                const result = (await api.getOwnPrediction(population, file)).data;
                const data = result.data;
                setPastData(data.actual_data);
                setPredictionData(data.predictions);
            } catch (error) {
              console.log(error);
            }
          }
      
        fetchData();
    }

    return <Container maxWidth="xl" component="main">
        <Grid container justify='center' style={{padding: '10px', paddingTop: '30px'}}>
            <Grid item xs={12} md={12}>
                <Paper>
                    <Typography component="h4" variant="h4" align="center" color="textPrimary">
                        Forecasting Tool
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Grid container justify='center' >
            <Grid item xs={12} md={12} style={{padding: '5px'}}>
                <Paper>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Grid container>
                                <Button 
                                    style={{margin: '5px'}}
                                    variant="contained"
                                    color="primary"
                                    href="/template.csv">
                                    Download Template
                                </Button>
                                <Button
                                    style={{margin: '5px'}}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    Upload CSV
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={uploadHandler}
                                    />
                                </Button>
                                <TextField 
                                    style={{margin: '5px'}}
                                    type="number"
                                    inputProps={{ min: "1" }}
                                    label="Population" 
                                    variant="outlined"
                                    onChange={populationHandler}
                                />
                                {
                                    population && file &&
                                    <Button
                                        style={{margin: '5px'}}
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                }
                                
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item style={{height: '550px', padding: '5px'}}>
                        {
                        plot === 'Active' &&
                        <Plot 
                            title={`Active cases Forecast (next 21 days)`}
                            type="active"
                            pastColor="blue" 
                            predictionColor="orange" 
                            pastData={pastData} 
                            predictionData={predictionData} 
                        />
                        }
                        {
                        plot === 'Recovered' &&
                        <Plot 
                            title={`Recovered cases Forecast (next 21 days)`}
                            type="recovered"
                            pastColor="blue" 
                            predictionColor="orange" 
                            pastData={pastData} 
                            predictionData={predictionData} 
                        />
                        }
                        {
                        plot === 'Confirmed' &&
                        <Plot 
                            title={`Confirmed cases Forecast (next 21 days)`}
                            type="confirmed"
                            pastColor="blue" 
                            predictionColor="orange" 
                            pastData={pastData} 
                            predictionData={predictionData} 
                        />
                        }
                        {
                        plot === 'Deceased' &&
                        <Plot 
                            title={`Deceased cases Forecast (next 21 days)`}
                            type="deaths"
                            pastColor="blue" 
                            predictionColor="orange" 
                            pastData={pastData} 
                            predictionData={predictionData} 
                        />
                        }
                    </Grid>
                    {
                        predictionData.length > 0 &&
                        <>
                            <Grid item xs={12} style={{padding: '20px', paddingTop:'40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <ButtonGroup size="large">
                                    <Button variant={plot === 'Confirmed'  ? "contained" : "outlined"} color={plot === 'Confirmed' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Confirmed')}>Confirmed</Button>
                                    <Button variant={plot === 'Active'  ? "contained" : "outlined"} color={plot === 'Active' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Active')}>Active</Button>
                                    <Button variant={plot === 'Recovered'  ? "contained" : "outlined"} color={plot === 'Recovered' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Recovered')}>Recovered</Button>
                                    <Button variant={plot === 'Deceased'  ? "contained" : "outlined"} color={plot === 'Deceased' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Deceased')}>Deceased</Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button size="large" variant={"outlined"} color={"primary"} onClick={handleOpen.bind(this, true)}>
                                    See the Complete Forecast!
                                </Button>
                                <Modal
                                open={open}
                                onClose={handleOpen.bind(this, false)}
                                >
                                    <Grid style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
                                        <Grid container>
                                            <Grid item xs={12} style={{padding: '5px'}}>
                                                <Paper>
                                                    <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                                        Forecast (next 21 days)
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                        <Grid item xs={4} md={4} style={{padding: '5px'}}>
                                            <TableDays data={predictionData.slice(0, 7)} />
                                        </Grid>
                                        <Grid item xs={4} md={4} style={{padding: '5px'}}>
                                            <TableDays data={predictionData.slice(7, 14)} />
                                        </Grid>
                                        <Grid item xs={4} md={4} style={{padding: '5px'}}>
                                            <TableDays data={predictionData.slice(14)} />
                                        </Grid>
                                        </Grid>
                                        <Grid>
                                        <Grid item xs={6} style={{padding: '5px'}}>
                                            <Typography component="p" variant="body2" align="left" color="textPrimary">
                                            Note: These values are cumulative
                                            </Typography>
                                        </Grid>
                                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                            <Button size="large" variant={"contained"} color={"primary"} onClick={handleOpen.bind(this, false)}>
                                            Close
                                            </Button>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>
                            </Grid>
                        </>
                    }
                </Paper>
            </Grid>
        </Grid>
    </Container>;
}

export default OwnForecast;