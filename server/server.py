from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/classify_image', methods=['GET','POST'])
def classify_image():
    imageData = request.form['imageData']

    response = jsonify(util.classify_image(image_data))
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    print("Starting server")
    util.load_saved_artifacts()
    app.run(port=5000)