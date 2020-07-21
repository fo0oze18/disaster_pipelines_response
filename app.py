import sqlite3

from flask import Flask, url_for, send_from_directory, request
# import section
import os

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import pickle as pk
import nltk
nltk.download(['punkt', 'wordnet', 'averaged_perceptron_tagger', 'stopwords'])
import re
from machine_learning.prediction_handler import prediction_handler

app = Flask(__name__, static_url_path="/static", static_folder='/Users/fo0oz/PycharmProjects/disaster_pipeline_project/static')
import pandas
import plotly
app._static_folder = 'static'


# the tokenization function to be used, in order to tokeinze the message inputted.
def tokenize(text):
    """
    Input
    A sentence (string)
    Output
    A list of tokenized string
    """
    # normalize the text
    preprocessed_text = re.sub(r"[^a-zA-Z0-9]", " ", text.lower())
    # tokenize sentence
    tokens = word_tokenize(preprocessed_text)
    tokens = [w for w in tokens if w not in stopwords.words("english")]
    lemmatizer = WordNetLemmatizer()

    clean_tokens = []
    for tok in tokens:
        clean_tok = lemmatizer.lemmatize(tok).lower().strip()
        clean_tokens.append(clean_tok)
    return clean_tokens


@app.route('/')
def root():
    """
    Input
    Nothing
    Output
    The main page of the web app (i.e., index.html)
    """
    return app.send_static_file('web_page.html')


# This function is invoked when the page loads. It sends
# the information to the js file, in order to plot the
# figures
@app.route('/load', methods=['GET', 'POST'])
def load_dataset():
    """
    Input
    Nothing
    Output
    The dataset is read from the sqlite library, then returned as
    a dictionary to the UI
    """
    conn = None
    try:
        # open the database
        conn = sqlite3.connect("DisasterResponse.db")
    except sqlite3.Error as e:
        print("ERROR:      "+e)
    cur = conn.cursor()
    cur.execute('SELECT * FROM "Message"')
    # parse the content
    rows = cur.fetchall()
    list = []
    for row in rows:
        list.append(row)
    # convert the list to dictionary, in order to send it
    # withe JSON response
    return convert_to_dict(list)


# This function parses a list to a dictionary
def convert_to_dict(a):
    """
    Input
    A list of numbers
    Output
    The data of the list is represented in a form of dictionary,
    so that it can be returned to the js file
    """

    m = [] # holds the indices (according to the size of the input)
    for i in range(len(a)):
        m.append(i)
    it = iter(a)
    res_dct = dict(zip(m, it))
    return res_dct

# This function is invoked whenever the user presses on
# the 'predict' button in the UI
@app.route('/predict' , methods=['POST'])
# This function receives the input from the Ajax function, and passes it to the prediction_handler function
def serve_prediction():
    """
    Input
    - String (fetched from the POST request)
    - Invoked when the user presses on the predict button
    Output
    The final prediction is returned to the UI
    """
    final_prediction = None
    if request.method == "POST":
        # input the message received from the POST request to tbe prediction_handler function
        final_prediction = prediction_handler(request.values['message'])
    return final_prediction


if __name__ == '__main__':
    app.run(debug=True)
