import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Alert, AlertTitle } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import api from '../api';
import Plot from '../components/plot-historical-projections';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    paper: {
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const HistoricalProjections = () => {
    const initDate = new Date();
    initDate.setDate(initDate.getDate()-1);

    const classes = useStyles();

    const [ country, setCountry ] = useState('India');
    const [ countries, setCountries ] = useState([]);

    const [ region, setRegion ] = useState();
    const [ regions, setRegions ] = useState([]);
    
    const [ districts, setDistricts ] = useState([]);
    const [ district, setDistrict ] = useState();

    const [ pastData, setPastData ] = useState([]);
    const [ predictionData, setPredictionData ] = useState([]);
  
    const [ selectedDate, setSelectedDate ] = React.useState(initDate);

    const [ searchBarRegion, setSearchBarRegion ] = useState(''); 
    const [ searchBarDistrict, setSearchBarDistrict] = useState(''); 

    const [ plot, setPlot ] = useState('Confirmed');

    const [ notContent, setNotContent ] = useState(false);

    useEffect(() => {
        const fetchGlobalData = async () => {
          try {
            // Por ahora solo son tres paises
            //const { data: { availableCountries: countries } } = await api.getCountries();
            //setCountries(countries);
            const regions = Object.values((await api.getRegions(country)).data)[0];

            setCountries(['India', 'US', 'Russia']);
            setRegions(regions);
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchGlobalData();
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            const regions = Object.values((await api.getRegions(country)).data)[0];
            setDistrict();
            setDistricts([]);
            setRegions(regions);
        }

        fetchData();
    }, [country]);

    useEffect(() => {
        const fetchData = async () => {
            const district = (await api.getDistricts(country, region)).data;
            setDistricts(district);
        }

        if(region) {
            fetchData();
        }
    }, [region]);

    useEffect(() => {
        const fetchData = async () => {

            let place = country;
            if(district) {
                place = district;
            } else if(region) {
                place = region;
            }

            const data = (await api.getData(selectedDate, country, place )).data.data;
            setNotContent(false);
            if(data && data.hasOwnProperty('actual_data') && data.hasOwnProperty('predictions')) {
                setPastData(data.actual_data);
                setPredictionData(data.predictions);
            } else {
                setPastData([]);
                setPredictionData([]);
                setNotContent(true);
            }
        }

        if(!!country && !!selectedDate) {
            fetchData();
        }
    }, [country, region, district, selectedDate]);

    const handleChange = (event) => {
        setSearchBarDistrict('');
        setSearchBarRegion('');
        setPastData([]);
        setPredictionData([]);
        setRegion();
        setRegions([]);
        setDistrict();
        setDistricts([]);
        setPastData([]);
        setPredictionData([]);
        setCountry(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const plotHandler = (plot) => {
        setPlot(plot);
    }

    const title = () => {
        if(region) {
          return region;
        }
        return country
    }


    const disableDays = (date) => {
        return initDate < date;
    }

    return <Container maxWidth="xl" component="main">
        <Grid container justify='center' style={{padding: '10px', paddingTop: '30px'}}>
            <Grid item xs={12} md={12}>
                <Paper>
                    <Typography component="h4" variant="h4" align="center" color="textPrimary">
                        Historical Projections
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Grid container justify='center' style={{padding: '10px'}} >
            <Grid item xs={12} md={12}>
                <Paper>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Grid container>
                                <Grid>
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        id="country"
                                        labelId="country-label"
                                        value={country}
                                        onChange={handleChange}
                                        label="Country"
                                    >
                                        {
                                        countries.map((item => {
                                            return <MenuItem key={item} value={item}>{item}</MenuItem>
                                        }))
                                        }
                                    </Select>
                                </Grid>
                                <Grid>
                                    <Autocomplete
                                        options={regions}
                                        getOptionLabel={(option) => option}
                                        value={region ? region : null}
                                        inputValue={searchBarRegion}
                                        onChange={(event, newValue) => {
                                            if(regions.includes(newValue) || !newValue) {
                                                setDistrict();
                                                setDistricts([]);
                                                setRegion(newValue ? newValue : undefined);
                                                setPastData([]);
                                                setPredictionData([]);
                                            }
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setSearchBarDistrict('');
                                            setSearchBarRegion(newInputValue);
            
                                        }}
                                        style={{ width: 200 }}
                                        renderInput={(params) => <TextField {...params} label={['Russia'].includes(country) ? 'Region' : 'State'} variant="outlined" />}
                                    />
                                </Grid>
                                { country === 'India' && districts.length > 0 && 
                                <Grid>
                                    <Autocomplete
                                        options={districts}
                                        getOptionLabel={(option) => option}
                                        inputValue={searchBarDistrict}
                                        value={district ? district : null}
                                        onChange={(event, newValue) => {
                                            if(districts.includes(newValue) || !newValue) {
                                                setDistrict(newValue ? newValue : undefined);
                                            }
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setSearchBarDistrict(newInputValue);
                                        }}
                                        style={{ width: 200 }}
                                        renderInput={(params) => <TextField {...params} label={'District'} variant="outlined" />}
                                        />
                                </Grid>
                                }
                                <Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            disableToolbar
                                            variant="inline"
                                            format="yyyy-MM-dd"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            shouldDisableDate={disableDays} 
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    { notContent ?
                    <Grid item xs={12} style={{height: '100%', padding: '40px'}}>
                        <Alert severity="warning" >
                        <AlertTitle>We don't have enough data</AlertTitle>
                        Note! We don't have enough data to make a prediction to {title()}. 
                        </Alert>
                    </Grid>
                    :
                        <>
                        <Grid item style={{height: '550px', padding: '5px'}}>
                            {
                            plot === 'Active' &&
                            <Plot 
                                title={`${title()} Active cases Forecast (next 21 days)`}
                                type="active"
                                pastColor="blue" 
                                predictionColor="orange" 
                                pastData={pastData} 
                                predictionData={predictionData} 
                                selectedDate={selectedDate}
                            />
                            }
                            {
                            plot === 'Recovered' &&
                            <Plot 
                                title={`${title()} Recovered cases Forecast (next 21 days)`}
                                type="recovered"
                                pastColor="blue" 
                                predictionColor="orange" 
                                pastData={pastData} 
                                predictionData={predictionData}
                                selectedDate={selectedDate}
                            />
                            }
                            {
                            plot === 'Confirmed' &&
                            <Plot 
                                title={`${title()} Confirmed cases Forecast (next 21 days)`}
                                type="confirmed"
                                pastColor="blue" 
                                predictionColor="orange" 
                                pastData={pastData} 
                                predictionData={predictionData}
                                selectedDate={selectedDate}
                            />
                            }
                            {
                            plot === 'Deceased' &&
                            <Plot 
                                title={`${title()} Deceased cases Forecast (next 21 days)`}
                                type="deaths"
                                pastColor="blue" 
                                predictionColor="orange" 
                                pastData={pastData} 
                                predictionData={predictionData}
                                selectedDate={selectedDate}
                            />
                            }
                        </Grid>
                        </>
                    }
                    {
                        predictionData.length > 0 && 
                        <Grid item xs={12} style={{padding: '20px', paddingTop:'40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ButtonGroup size="large">
                                <Button variant={plot === 'Confirmed'  ? "contained" : "outlined"} color={plot === 'Confirmed' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Confirmed')}>Confirmed</Button>
                                <Button variant={plot === 'Active'  ? "contained" : "outlined"} color={plot === 'Active' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Active')}>Active</Button>
                                <Button variant={plot === 'Recovered'  ? "contained" : "outlined"} color={plot === 'Recovered' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Recovered')}>Recovered</Button>
                                <Button variant={plot === 'Deceased'  ? "contained" : "outlined"} color={plot === 'Deceased' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Deceased')}>Deceased</Button>
                            </ButtonGroup>
                        </Grid>
                    }
                </Paper>
            </Grid>
        </Grid>
    </Container>;
}

export default HistoricalProjections;