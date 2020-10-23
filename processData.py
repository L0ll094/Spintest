import flask
from flask import Flask,request, jsonify, render_template,request,flash
app=flask.Flask(__name__, static_url_path='', static_folder='../spintest/dist/spintest')
app.config["DEBUG"]=True



@app.route('/', methods=['GET'])
def root():
    return app.send_static_file('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    densityParticle=request.form['densityParticle']
    densityParticle=densityParticle*3
    print("This is what we found"+ densityParticle)
    return jsonify(property=densityParticle)



app.run()
