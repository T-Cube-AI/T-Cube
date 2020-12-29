import axios from 'axios';

const api = axios.create({
    baseURL: 'http://152.67.162.241:3000'
});

const api2 = axios.create({
    baseURL: 'http://152.67.162.241:800'
});

const getData = async ( date, country, region) => {
    const data = {
        date: date.toISOString().split('T')[0],
        region,
        country
    };

    return await api2.post(`/get_data/`, data);
}

const getCountries = async () => {
    return await api.get('/countries');
}

const getRegions = async (country) => {
    let nameDivision = 'states';
    if(['Russia'].includes(country)) {
        nameDivision = 'regions'
    }
    return await api.get(`/countries/${country}/${nameDivision}`);
}

const getDistricts = async (country, region) => {
    return await api.get(`/countries/${country}/districts/${region}`);
}

// Country 
const getPredictionCountry = async (country) => {
    return await api.get(`/countries/${country}/predict`);
}

const getPastCountry = async (country) => {
    return await api.get(`/countries/${country}/past`);
}

// Regions
const getPredictionRegion = async (country, region) => {
    return await api.get(`/countries/${country}/predict/${region}`);
}

const getPastRegion = async (country, region) => {
    return await api.get(`/countries/${country}/past/${region}`);
}

// District
const getPredictionDistrict = async (country, region, district) => {
    return await api.get(`/countries/${country}/predict/${region}/${district}`);
}

const getPastDistrict = async (country, region, district) => {
    return await api.get(`/countries/${country}/past/${region}/${district}`);
}

// Factors
const getHeatFactorsCountry = async (country) => {
    return await api.get(`/countries/${country}/heatfactors`);
}

const getHeatFactorsRegion = async (country, region) => {
    return await api.get(`/countries/${country}/heatfactors/${region}`);
}

const getOwnPrediction = async (population, file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('population', population);
    return api2.post('/upload/', data);
}

const getInsights = async (country, region, district) => {
    if(district) {
        return await api.get(`/countries/${country}/insights/${region}/${district}`);
    } else if(region) {
        return await api.get(`/countries/${country}/insights/${region}`);
    } else {
        return await api.get(`/countries/${country}/insights/`);
    }
}


export default {
    getCountries,
    getRegions,
    getDistricts,
    getPastCountry,
    getPredictionCountry,
    getPastRegion,
    getPredictionRegion,
    getPastDistrict,
    getPredictionDistrict,
    getHeatFactorsCountry,
    getHeatFactorsRegion,
    getData,
    getOwnPrediction,
    getInsights
}
