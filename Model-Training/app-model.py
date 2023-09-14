import numpy as np
import pandas as pd
import keras
from flask import Flask, request, jsonify, send_from_directory
from keras.preprocessing import image
from keras.applications.densenet import preprocess_input
from sklearn.metrics.pairwise import linear_kernel
import matplotlib.image as mpimg
from io import BytesIO
import os
import requests

current_directory = os.path.dirname(os.path.abspath(__file__))
parent_directory = os.path.abspath(os.path.join(current_directory, os.pardir))

app = Flask(__name__)

model_architecture_path = "model_architecture-new.json"
model_weights_path = "model_weights-new.h5"
df_embedding = pd.read_csv(os.path.join(current_directory, "embeddings_data_new.csv"))
df = pd.read_csv(os.path.join(parent_directory, "data\small-new.csv"))

with open(os.path.join(current_directory, model_architecture_path), "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model = keras.models.model_from_json(loaded_model_json)
loaded_model.load_weights(os.path.join(current_directory, model_weights_path))

img_width, img_height, chnl = 200, 200, 3

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        data = request.get_json()
        image_url = data.get('image_url')

        if not image_url:
            return jsonify({'error': 'No image URL provided'}), 400

        response = requests.get(image_url)
        with open('temp_image.jpg', 'wb') as f:
            f.write(response.content)

        img = image.load_img('temp_image.jpg', target_size=(img_width, img_height))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        recommendations = loaded_model.predict(x)
        cosine_sim = linear_kernel(recommendations, df_embedding)
        top_indices = cosine_sim.argsort()[0][-5:][::-1]

        recommended_product_ids = []
        for idx in top_indices:
            product_id = df['ProductId'].iloc[idx]
            recommended_product_ids.append(str(product_id))

        return jsonify({'recommended_product_ids': recommended_product_ids}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search', methods=['POST'])
def search_products():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    uploaded_image = request.files['image']

    if uploaded_image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img_bytes = BytesIO(uploaded_image.read())
        img = image.load_img(img_bytes, target_size=(img_width, img_height))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        recommendations = loaded_model.predict(x)
        cosine_sim = linear_kernel(recommendations, df_embedding)
        top_indices = cosine_sim.argsort()[0][-5:][::-1]

        recommended_product_ids = []
        for idx in top_indices:
            product_id = df['ProductId'].iloc[idx]
            recommended_product_ids.append(str(product_id))

        return jsonify({'recommended_product_ids': recommended_product_ids}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)

