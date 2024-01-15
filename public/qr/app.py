from flask import Flask, render_template, jsonify
import cv2
import numpy as np
from pyzbar import pyzbar
import urllib.request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_data():
    url = 'http://192.168.137.129/'
    img_resp = urllib.request.urlopen(url + 'cam-hi.jpg')
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    frame = cv2.imdecode(imgnp, -1)

    decoded_objects = pyzbar.decode(frame)
    data_list = [obj.data.decode('utf-8') for obj in decoded_objects]

    return jsonify(data=data_list)

if __name__ == '__main__':
    app.run(debug=True)
