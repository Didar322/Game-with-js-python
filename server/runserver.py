from flask import Flask
from flask import render_template
from flask import request, redirect
from flask import Response
from flask import send_from_directory
import json
import os
import pandas as pd
app = Flask(__name__)
gamers = 0       # I know those are awful 
                # I know about OOP 

@app.route('/')
def home():

    return render_template(
        'index.html',
    )

@app.route('/Game')
def Game():
    return render_template(
        'Game.html'
    )


@app.route('/ScoreBoard', methods=["GET", "POST"])
def ScoreBoard():
    data = {}
    data['score'] = []

    with open('data.json', 'r') as json_file:
        data = json.load(json_file)
    
    if request.method == "POST":

        req = request.form
        nickscore = req.to_dict()
        
        data['score'].append(nickscore)
        with open('data.json', 'w') as outfile:
            json.dump(data, outfile)

        return redirect(request.url)


    df = to_dataframe(data)
    dt = df.sort_values(by=['score'], ascending=False)

    return render_template(
        'ScoreBoard.html',
        data=data,
        df=dt
        )


def to_dataframe(data):
    df = {}
    df['nickname'] = []
    df['score'] = []
    
    for p in data['score']:
        df['nickname'].append(p['nickname'])
        df['score'].append(int(p['score']))

    return pd.DataFrame(df)
    

    


if __name__ == "__main__":
    app.run(debug=True)