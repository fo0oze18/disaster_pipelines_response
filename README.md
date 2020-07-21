# Disaster Pipelines Response 

## Table of Contents
* Technologies
* Project Motivation
* File Descriptions
* How to run the program
* Results
* Acknowledgements

## Technologies
The outcomes done with:
* Python 3.8 . 
* Jupyter Notebook.
* Pandas Library.
* Numpy Library.
* Flask Python web framework
* Ajax
* Java Script for Charts
* HTML, CSS, and JS.
* SQLite
# Project Motivation
Apply machine learning  skills  to analyze disaster data from Figure Eight to build a model for an API that classifies disaster messages. so that during crisis it can be send these messeges to the designated party/authority, without wasting valuable time during such a critical time.
## File Descriptions:
#### jupyter_notebooks
There are 2 notebooks available: 
* ETL pipeline. 
* ML pipeline. 

#### machine_learning
One Flask python File:
* prediction_handler

#### node_modules
I downloded for ChartJS.

#### static
I reside all static files, such as html, js, and CSS.

#### app.py
for the execution

#### core_db.db
The database generated at the end of the ETL pipeline
#### DisasterResponse.db
The database downloaded from the jupyter notebook of the project in Udacity
## Methodology:
The framework Flask was used to accomplish this project. Also, i I used Ajax  to avoid reloading of the same page while contacting the ML model.
For display the charts, I read the data from the database when the page first loads (from Python), then the result is forwarded to the js file, to be displayed with the help of ChartJs. When the button is pressed, the model is used to classify the meseges. 
You can check the model [here](https://drive.google.com/drive/u/0/folders/19xfhAuTmxaVrorhT9UWawyLAZwKk-TAj).
 ## How to Run the Project
#### Flask project, 
It should be ran from the app.py file for the web app by using Pycharm.

#### jupyter notebooks
you can download the notebooks from my github, and run them as normal notebooks from your device. 

#### Final Model
Make sure you put the model in the root directory of the project.You can download the model from [here](https://drive.google.com/drive/u/0/folders/19xfhAuTmxaVrorhT9UWawyLAZwKk-TAj).

## Obstacles
* It's my first time dealing with projects related to machine learning.
* It's my first time dealing with Flask.
* Preparing the and optmize the model.

## Acknowledgements
I would thank Udacity for thier support.
