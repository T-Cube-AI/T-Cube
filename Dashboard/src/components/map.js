import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson-client";

const countries = {
    Russia: {
        map: 'russia/russia-region.json',
        width: 1000,
        height: 600,
        objectName: 'collection',
        propertyName: 'en_native_nam'
    },
    India: {
        map: 'india/india.json',
        width: 1000,
        height: 600,
        objectName: 'india',
        propertyName: 'st_nm'
    },
    US: {
        map: 'united-states/us-albers.json',
        width: 1000,
        height: 600,
        objectName: 'us',
        propertyName: 'name'
    },
  }

const Map = (props) => {
    const {
        country,
        region,
        regionHandler,
        heatFactors,
        districtHandler,
        district
    } = props;

    const mapRef = useRef();

    useEffect(() => {
        const drawMap = async () => {
            let pathFile = countries[country].map;
            let w = countries[country].width;
            let h = countries[country].height;
            let objectName = countries[country].objectName;
            let propertyName = countries[country].propertyName;

            if(country === 'India' && region) {
                const fileRegion = region.toLowerCase().replace(/ /g, '');
                pathFile = `india/states/${fileRegion}.json`;
                objectName = fileRegion;
                propertyName = 'district';
            }
            const mapJson = await d3.json(`/topojson/countries/${pathFile}`);
            const color = d3
            .scaleThreshold()
            .domain([0, 10, 20, 40, 60, 70, 80, 90, 100])
            .range(d3.schemePuBu[9]);

            function centerZoom(data, objectName, projection, path, width, height) {
                const o = topojson.mesh(data, data.objects[objectName], function(a, b) { return a === b; });
          
                projection
                    .scale(1)
                    .translate([0, 0]);
          
                const b = path.bounds(o),
                    s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
          
                projection
                    .scale(s)
                    .translate(t);
            }
            
             function drawStates(g, data, objectName, tooltip){
                const states = g.selectAll(".state")
                    .data(topojson.feature(data, data.objects[objectName]).features)
                    .enter().append("path")
                    .attr("class", "state")
                    .attr("d", path)
                    .style("fill", function(item) {
                        const currentArea = item.properties[propertyName];
                        const chosenArea = (country === 'India' && region) ? district: region;

                        if(currentArea === chosenArea) {
                            return "darkorange";
                        } else if (heatFactors.hasOwnProperty(currentArea)) {
                            const percentage = heatFactors[currentArea];
                            return color(percentage);
                        } else {
                            return color(0);
                        }
                    })
                    .style("stroke", "#3a403d")
                    .style("stroke-width", "1px")
                    .attr("cursor", "pointer")
                    .on("click", function (item) {
                        const currentArea = item.properties[propertyName];
                        if(d3.select(this).style("fill") === 'darkorange') {
                            if(country === 'India' && region) {
                                districtHandler(undefined);
                            } else {
                                regionHandler(undefined);
                            }
                        } else {
                            d3.select(this).attr("r", 10).style("fill", "darkorange");
                            if(country === 'India' && region) {
                                districtHandler(currentArea);
                            } else {
                                regionHandler(currentArea);
                            }
                        }
                    })
                    .on("mouseover", function (item) { 
                        if(d3.select(this).style("fill") !== 'darkorange') {
                            d3.select(this).attr("r", 10).style("fill", "grey");
                        }
                        return tooltip
                        .style("opacity", 1)  
                        .html(item.properties[propertyName]);
                    })
                    .on("mousemove",function(item) {
                        tooltip.classed("hidden", false)
                       .style("top", (d3.event.pageY) + "px")
                       .style("left", (d3.event.pageX + 10) + "px")
                       .html(item.properties[propertyName]);
                    })
                    .on("mouseout", function (item) {
                        if(d3.select(this).style("fill") !== 'darkorange') {
                            const currentArea = item.properties[propertyName];
                            let currentColor = color(0);
                            if(heatFactors.hasOwnProperty(currentArea)) {
                                const percentage = heatFactors[currentArea];
                                currentColor = color(percentage);
                            } 
                            d3.select(this).attr("r", 10).style("fill", currentColor);
                        }
                        tooltip.style("opacity", 0);
                    });
                return states;
            }
            
            const projection = d3
              .geoMercator()
              .rotate([-11, 0]);
            
            const path = d3.geoPath()
              .projection(projection)
              .pointRadius(2);
            
            d3.selectAll("#map").remove();
            const svg = d3.select(mapRef.current)
              .append("svg")
              .attr("id", "map")
              .attr("viewBox", [0, 0, w, h]);

            d3.selectAll(".tooltip").remove();
            const tooltip = d3.select(mapRef.current)
                .append("div")
                .attr("class", "tooltip");
    
            const g = svg.append("g");
            centerZoom(mapJson, objectName, projection, path, w, h);
            drawStates(g, mapJson, objectName, tooltip);
        }

        drawMap();
    }, [country, region, district, heatFactors]);

    return <>
        <div ref={mapRef} style={{width: '100%', height:'100%'}}></div>
    </>;
}

export default Map;