# import section
import os
import os.path as path
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import pickle as pk
import nltk
nltk.download(['punkt', 'wordnet', 'averaged_perceptron_tagger', 'stopwords'])
import re


# the tokenization function to be used, in order to tokeinze the message inputted.
def tokenize(text):
    x = 0
    # normalize the text
    preprocessed_text = re.sub(r"[^a-zA-Z0-9]", " ", text.lower())
    # tokenize sentence
    tokens = word_tokenize(preprocessed_text)
    # remove the
    x = x + 1
    tokens = [w for w in tokens if w not in stopwords.words("english")]
    lemmatizer = WordNetLemmatizer()

    clean_tokens = []
    for tok in tokens:
        clean_tok = lemmatizer.lemmatize(tok).lower().strip()
        clean_tokens.append(clean_tok)
    return clean_tokens



# This function takes care of fetching the prediction from
# the ML model
def prediction_handler(message):
    print("FROM prediction :    " + message)
    # load the model from the pickle file
    cwd = os.getcwd()  # Get the current working directory (cwd)
    files = os.listdir(cwd)  # Get all the files in that directory
    print("jsjsks" + str(path.exists("finalized_model.pkl")))
    print("Files in %r: %s" % (cwd, files))
    loaded_model = pk.load(open("finalized_model.pkl", 'rb'))
    # tokenize the message
    tokenized_message = tokenize(message)
    # generate the prediction
    prediction = loaded_model.predict(tokenized_message)[0]
    # the 'prediction' variable contains a vector of 36 element. we need to return its corresponding nominal category
    return convert_to_dictionary(prediction)


# This function receives a list, and it converts it to a dictionary, to return it to the js file
def convert_to_dictionary(list):
    # this list holds the number of indices of the dictionary
    m = []
    for i in range(len(list)):
        m.append(i)
    print("LENGTH:   " + str(len(list)))
    it = iter(list)
    res_dct = dict(zip(m, it))
    print(res_dct[0])
    return res_dct
