import React from 'react';
import Plot from 'react-plotly.js';

const CustomizedPlot = (props) => {
    const {
        title,
        pastColor,
        predictionColor,
        pastData,
        predictionData,
        type
    } = props;

    const pastX = pastData.map((datum) => {
        return datum.date;
    });
    const pastY = pastData.map((datum) => {
        return datum[type];
    });
    const predictionX = [pastX[pastX.length - 1], ...predictionData.map((datum) => {
        return datum.date;
    })];
    const predictionY = [pastY[pastY.length - 1], ...predictionData.map((datum) => {
        return datum[type]
    })];

    return <Plot
        data={[
            {
                x: pastX,
                y: pastY,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: pastColor},
                name: "Actual",
                showlegend: true
            },
            {
                x: predictionX,
                y: predictionY,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: predictionColor},
                name: "Forecasted",
                showlegend: true
            },
        ]}
        layout={{
            title: title,
            autosize: true,
        }}
        useResizeHandler={true}
        style={{width: "100%", height: "100%"}}
    />
}

export default CustomizedPlot;