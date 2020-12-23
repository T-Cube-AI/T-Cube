![[T-CUBE Logo]](https://github.com/T-Cube-AI/T-Cube/blob/main/README-Cover%202.png)
# T-Cube
An award-winning Time-dependent SEIRD model for predicting the transmission dynamics of COVID-19.

[![Build Status](https://github.com/T-Cube-AI/T-Cube/workflows/Build%20Status/badge.svg)](https://github.com/T-Cube-AI/T-Cube/actions)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# ⚠️ Problem Statement

The rapid increase in the COVID-19 cases has resulted in severe shortage of essential medical resources and threatens to overwhelm the health care infrastructure.

<i>How can we prepare in advance to deal with the shortage and demand for resources?</i>

# 💡 The Solution
A data-driven model and dashboard for forecasting the confirmed, active and deceased COVID-19 cases for the next 21 days, and using them to estimate essential medical resources, as well as an identification tool for tracking upcoming COVID-19 hotspots to help with resource allocation.

**A Time-Dependent SEIRD Model for Forecasting the COVID-19 Transmission Dynamics**  
Taarak Rapolu, Brahmani Nutakki, T. Sobha Rani, S. Durga Bhavani  
doi: https://doi.org/10.1101/2020.05.29.20113571

# 💻 Epidemic Modelling
We built a time-dependent SEIRD model that:
* Will capture the propagation of the disease
* Derives the parameters that are dynamic from the historical cases data
* Uses Statistical methods for validation to avoid overfitting

# Assumptions
The following assumptions are made while building the model:
* Reinfection of recovered person is considered negligible.
* The growth of testing capabilities is same as that of the previous week.
* The effects of interventions are reflected in the observed data.

# Important Notice
T-CUBE (including any and all technology, assets, use-cases, contributors, and team members) are not responsible for your actions with and surrounding the model. You, your teams, and interested parties are solely responsible for your/their actions, moves, and decisions, and the evaluation of, interest in, and/or incorporation of this technology should be based on your own due diligence (please do your own research). You agree that T-CUBE is not liable to you, your teams, or organizations in any way for any and all results stemming from using this technology. We make no guarantees of past, current, or future performance, nor promise of results in the future.

Also, the model is dependent upon the data inputs and quality/quantity of data available, which can affect how the model behaves and performs under certain parameters.

T-CUBE was created as a hackathon project in response to the scary times surrounding the COVID-19 pandemic, and should be treated as such. We are a passionate team of social innovators and hope that this codebase can be a window to spur on further innovation to address this global health crisis.

# Licensing
This repository and all contributions herein are licensed under the [MIT license](https://github.com/T-Cube-AI/T-Cube/blob/main/LICENSE). Please note that, by contributing to this repository, whether via commit, pull request, issue, comment, or in any other fashion, you are explicitly agreeing that all of your contributions will fall under the same permissive license.
