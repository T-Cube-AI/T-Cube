import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import api from '../api';
import Map from '../components/map';
import TableDays from '../components/table-days';
import TableInsights from '../components/table-insights';
import Loading from '../components/loading';
import Plot from '../components/plot';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  Typography: {
	fontFamily: [
		'Pacifico'
	]
  },
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [ loaded, setLoaded ] = useState(false);

  const [ country, setCountry ] = useState('India');
  const [ countries, setCountries ] = useState([]);

  const [ regions, setRegions ] = useState([]);
  const [ region, setRegion ] = useState();

  const [ districts, setDistricts ] = useState([]);
  const [ district, setDistrict ] = useState();

  const [ pastData, setPastData ] = useState([]);
  const [ predictionData, setPredictionData ] = useState([]);

  const [ , setSearchBarRegion ] = useState(null); 
  const [ , setSearchBarDistrict] = useState(null); 
  const [ heatFactorData, setHeatFactorData ] = useState({});
  const [ insights, setInsights ] = useState({});

  const [ plot, setPlot ] = useState('Confirmed');
  const [ openForecast, setOpenForecast ] = useState(false);
  const [ openInsights, setOpenInsights ] = useState(false);
  const [ notContent, setNotContent ] = useState(false);

  const handleChange = (event) => {
    setDistrict();
    setRegion();
    setCountry(event.target.value);
  };


  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        // Por ahora solo son tres paises
        //const { data: { availableCountries: countries } } = await api.getCountries();
        //setCountries(countries);
        const regions = Object.values((await api.getRegions(country)).data)[0];

        let pastData = (await api.getPastCountry(country)).data;
        pastData = Array.isArray(pastData) ? pastData : [];
        pastData = pastData.filter((value, index, self) => self.map(item => item.date).indexOf(value.date) === index);

        let predictionData = Object.values((await api.getPredictionCountry(country)).data)[0];
        if(Array.isArray(predictionData) && predictionData.length > 0) {
          predictionData = predictionData
          .reduce((accumulator, currentValue) => {
            const week = +Object.keys(currentValue)[0].split('-')[1];
            const days = Object.values(Object.values(currentValue)[0])[0].map(day => {
              return {
                ...day,
                week
              }
            });
            return [...accumulator, ...days];
          }, []);   
        } else {
          predictionData = [];
        }

        const insights = (await api.getInsights(country)).data;

        if(pastData.length === 0 || predictionData.length === 0){
          setNotContent(true);
        } else {
          setNotContent(false);
        }

        setInsights(insights);
        setCountries(['India', 'US', 'Russia']);
        setRegions(regions);
        setPastData(pastData);
        setPredictionData(predictionData);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetchGlobalData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getHeatFactorsCountry(country);
      const heatFactor = result.data.hasOwnProperty('heatFactors') ? result.data.heatFactors : result.data;
      const regions = Object.values((await api.getRegions(country)).data)[0];
      setRegions(regions);
      setHeatFactorData(heatFactor);
    }

    
    setPlot('Confirmed');

    fetchData();
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      // Caso particular India
      if(country === 'India') {
        let result;
        if(region) {
          result = await api.getHeatFactorsRegion(country, region);
        } else {
          result = await api.getHeatFactorsCountry(country);
        }
        const heatFactor = result.data.hasOwnProperty('heatFactors') ? result.data.heatFactors : result.data;
        console.log(heatFactor);
        setHeatFactorData(heatFactor);
      }
    }

    fetchData();
  }, [region]);

  useEffect(() => {
    setLoaded(false);
    setNotContent(false);
    const fetchData = async () => {
      if(district) {
        try {
          let pastData = (await api.getPastDistrict(country, region, district)).data;
          pastData = Array.isArray(pastData) ? pastData : [];
          pastData = pastData.filter((value, index, self) => self.map(item => item.date).indexOf(value.date) === index);
  
          let predictionData = Object.values((await api.getPredictionDistrict(country, region, district)).data)[0];
          if(Array.isArray(predictionData) && predictionData.length > 0) {
            predictionData = predictionData
            .reduce((accumulator, currentValue) => {
              const week = +Object.keys(currentValue)[0].split('-')[1];
              const days = Object.values(Object.values(currentValue)[0])[0].map(day => {
                return {
                  ...day,
                  week
                }
              });
              return [...accumulator, ...days];
            }, []);   
          } else {
            predictionData = [];
          }
  
          const insights = (await api.getInsights(country, region, district)).data;
  
          if(pastData.length === 0 || predictionData.length === 0){
            setNotContent(true);
          } else {
            setNotContent(false);
          }
  
          setInsights(insights);
          setPastData(pastData);
          setPredictionData(predictionData);
          setLoaded(true); 
        } catch {
          setInsights({});
          setPastData([]);
          setPredictionData([]);
          setNotContent(true);
          setLoaded(true); 
        }
      } else if (region) {
        try {
          let pastData = (await api.getPastRegion(country, region)).data;
          pastData = Array.isArray(pastData) ? pastData : [];
          pastData = pastData.filter((value, index, self) => self.map(item => item.date).indexOf(value.date) === index);
  
          let predictionData = Object.values((await api.getPredictionRegion(country, region)).data)[0];
          if(Array.isArray(predictionData) && predictionData.length > 0) {
            predictionData = predictionData
            .reduce((accumulator, currentValue) => {
              const week = +Object.keys(currentValue)[0].split('-')[1];
              const days = Object.values(Object.values(currentValue)[0])[0].map(day => {
                return {
                  ...day,
                  week
                }
              });
              return [...accumulator, ...days];
            }, []);   
          } else {
            predictionData = [];
          }
  
          const insights = (await api.getInsights(country, region)).data;
  
          if(pastData.length === 0 || predictionData.length === 0){
            setNotContent(true);
          } else {
            setNotContent(false);
          }

          const districts = (await api.getDistricts(country, region)).data;
  
          setInsights(insights);
          setDistricts(districts);
          setPastData(pastData);
          setPredictionData(predictionData);
          setLoaded(true);
        } catch {
          setNotContent(true);
          setInsights({});
          setDistricts([]);
          setPastData([]);
          setPredictionData([]);
          setLoaded(true);
        }
      } else {
        try {
          let pastData = (await api.getPastCountry(country)).data;
          pastData = Array.isArray(pastData) ? pastData : [];
          pastData = pastData.filter((value, index, self) => self.map(item => item.date).indexOf(value.date) === index);
  
          let predictionData = Object.values((await api.getPredictionCountry(country)).data)[0];
          if(Array.isArray(predictionData) && predictionData.length > 0) {
            predictionData = predictionData
            .reduce((accumulator, currentValue) => {
              const week = +Object.keys(currentValue)[0].split('-')[1];
              const days = Object.values(Object.values(currentValue)[0])[0].map(day => {
                return {
                  ...day,
                  week
                }
              });
              return [...accumulator, ...days];
            }, []);   
          } else {
            predictionData = [];
          }
  
          const insights = (await api.getInsights(country)).data;
  
          if(pastData.length === 0 || predictionData.length === 0){
            setNotContent(true);
          } else {
            setNotContent(false);
          }
  
          setInsights(insights);
          setPastData(pastData);
          setPredictionData(predictionData);
          setDistricts([]);
          setLoaded(true);
        } catch {
          setNotContent(true);
          setInsights({});
          setPastData([]);
          setPredictionData([]);
          setDistricts([]);
          setLoaded(true);
        }
      }
    }

    fetchData();
  }, [country, region, district]);

  const regionHandler = (region) => {
    setDistrict();
    setRegion(region);
  }

  const districtHandler = (district) => {
    setDistrict(district);
  }

  const plotHandler = (plot) => {
    setPlot(plot);
  }

  const handleOpenForecast = (state) => {
    setOpenForecast(state);
  };

  const handleOpenInsights = (state) => {
    setOpenInsights(state);
  };

  const title = () => {
    if(district) {
      return district;
    } else if(region) {
      return region;
    }
    return country
  }

  return (
    <>
    <Grid item xs={12} style={{padding: '5px', backgroundImage: 'linear-gradient(to right, #00c6ff , #0072ff)', color:'white'}}>
        <Typography component="h5" variant="h5" align="center" color="inherit">
	        T-CUBE
        </Typography>
        <Typography component="h6" variant="h6" align="center" color="inherit">
          Track the Trajectory
        </Typography>
      </Grid>
      <Container maxWidth="xl" component="main">
        <Grid container style={{padding: '10px'}}>
          <Grid item xs={12}>
            <Paper>
              <Typography component="h4" variant="h4" align="center" color="textPrimary">
                {title()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" component="main">
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} style={{height: '100%', padding: '5px'}}>
              <Paper style={{height: '100%'}}>
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
                        onInputChange={(event, newInputValue) => {
                          setSearchBarRegion(newInputValue);
                          if(regions.includes(newInputValue)) {
                            setDistrict();
                            setRegion(newInputValue);
                          }
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
                            onInputChange={(event, newInputValue) => {
                              setSearchBarDistrict(newInputValue);
                              if(districts.includes(newInputValue)) {
                                setDistrict(newInputValue);
                              }
                            }}
                            style={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label={'District'} variant="outlined" />}
                        />
                    </Grid>
                    }
                    { (country === 'India' && region) &&
                      <Grid>
                        <Button onClick={regionHandler.bind(this, undefined)} style={{ height: 56 }} variant="outlined">Back</Button>
                      </Grid>
                    }
                  </Grid>
                </FormControl>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row" style={{padding: '40px'}}>
                  <div>
                    0
                  </div>
                  <div className="heatscale">
                  </div>
                  <div>
                    100
                  </div>
                </Grid>
                <Map 
                  heatFactors={heatFactorData}
                  country={country}
                  region={region}
                  regionHandler={regionHandler} 
                  district={district}
                  districtHandler={districtHandler}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} style={{height: '100%', padding: '5px'}}>
              <Paper style={{height: '100%'}}>
                { notContent ?
                  <Grid item xs={12} style={{height: '100%', padding: '40px'}}>
                    <Alert severity="warning" >
                      <AlertTitle>We don't have enough data</AlertTitle>
                      Note! We don't have enough data to make a prediction to {title()}. 
                    </Alert>
                  </Grid>
                  :
                  <Loading loaded={loaded}>
                  <Grid item style={{height: '550px', padding: '5px'}} xs={12}>
                    {
                      plot === 'Active' &&
                      <Plot 
                        title={`${title()} Active cases Forecast (next 21 days)`}
                        type="active"
                        pastColor="blue" 
                        predictionColor="orange" 
                        pastData={pastData} 
                        predictionData={predictionData} 
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
                      />
                    }
                  </Grid>
                  <Grid item xs={12} style={{padding: '20px', paddingTop:'40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <ButtonGroup size="large">
                        <Button variant={plot === 'Confirmed'  ? "contained" : "outlined"} color={plot === 'Confirmed' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Confirmed')}>Confirmed</Button>
                        {
                          country !== 'US' && <Button variant={plot === 'Active'  ? "contained" : "outlined"} color={plot === 'Active' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Active')}>Active</Button>
                        }
                        <Button variant={plot === 'Deceased'  ? "contained" : "outlined"} color={plot === 'Deceased' ? "primary" : "default"} onClick={plotHandler.bind(this, 'Deceased')}>Deceased</Button>
                      </ButtonGroup>
                  </Grid>
                  <Grid item xs={12} style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <ButtonGroup size="large">
                      <Button size="large" variant={"outlined"} color={"primary"} onClick={handleOpenForecast.bind(this, true)}>
                        See the Forecasts!
                      </Button>
                      <Button size="large" variant={"outlined"} color={"primary"} onClick={handleOpenInsights.bind(this, true)}>
                        Insights
                      </Button>
                    </ButtonGroup>
                    <Modal
                      open={openForecast}
                      onClose={handleOpenForecast.bind(this, false)}
                    >
                      <Grid style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
                        <Grid container>
                          <Grid item xs={4} md={4}>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <Paper>
                                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                  Week 1 
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <TableDays showActive={country !== 'US'} data={predictionData.filter(datum => datum.week === 1)} />
                            </Grid>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <Paper>
                                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                  Week 2
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <TableDays showActive={country !== 'US'} data={predictionData.filter(datum => datum.week === 2)} />
                            </Grid>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <Paper>
                                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                  Week 3 
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <TableDays showActive={country !== 'US'} data={predictionData.filter(datum => datum.week === 3)} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Grid item xs={12} style={{padding: '5px'}}>
                            <Typography component="p" variant="body2" align="left" color="textPrimary">
                              Note: These values are cumulative
                            </Typography>
                          </Grid>
                          <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button size="large" variant={"contained"} color={"primary"} onClick={handleOpenForecast.bind(this, false)}>
                              Close
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Modal>
                    <Modal
                      open={openInsights}
                      onClose={handleOpenInsights.bind(this, false)}
                    >
                      <Grid style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper2}>
                        <Grid container>
                          <Grid item xs={12} md={12}>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <Paper>
                                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                                  Insights
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} style={{padding: '5px'}}>
                              <TableInsights  insights={insights} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Grid item xs={12} style={{padding: '5px'}}>
                            <Typography component="p" variant="body2" align="left" color="textPrimary">
                              CFR - Case Fatality Ratio, IFR - Infection fatality ratio
                            </Typography>
                            <a href="https://www.who.int/news-room/commentaries/detail/estimating-mortality-from-covid-19">https://www.who.int/news-room/commentaries/detail/estimating-mortality-from-covid-19</a>
                          </Grid>
                          <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button size="large" variant={"contained"} color={"primary"} onClick={handleOpenInsights.bind(this, false)}>
                              Close
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Modal>
                  </Grid>
                  </Loading>
                }
                </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
