import numpy as np
import pandas as pd
import keras
from flask import Flask, request, jsonify, send_from_directory
from keras.preprocessing import image
from keras.applications.densenet import preprocess_input
from sklearn.metrics.pairwise import linear_kernel
import matplotlib.image as mpimg
from io import BytesIO

app = Flask(__name__)

import os

current_directory = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(current_directory, 'embeddings_data.csv')

model_architecture_path = "model_architecture.json"
model_weights_path = "model_weights.h5"
df_embedding = pd.read_csv(csv_file_path)
df = pd.read_csv(os.path.join(current_directory, 'styles-updated.csv'))

with open(os.path.join(current_directory, model_architecture_path), "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model = keras.models.model_from_json(loaded_model_json)
loaded_model.load_weights(os.path.join(current_directory, model_weights_path))

img_width, img_height, chnl = 200, 200, 3

@app.route('/upload', methods=['POST'])
def upload_image():
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

        recommended_images = []
        for idx in top_indices:
            recommended_image_path = "../fashion-dataset/images/" + df['image'].iloc[idx]
            recommended_images.append(recommended_image_path)

        return jsonify({'recommended_images': recommended_images}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/search', methods=['POST'])
def search_products():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        uploaded_image = request.files['image']

        if uploaded_image.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        img_bytes = BytesIO(uploaded_image.read())
        img = image.load_img(img_bytes, target_size=(img_width, img_height))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        recommendations = loaded_model.predict(x)
        cosine_sim = linear_kernel(recommendations, df_embedding)

        top_indices = [i for i, sim in enumerate(cosine_sim[0]) if 0.0 <= sim <= 1.0]

        if top_indices:
            top_indices.sort(key=lambda i: cosine_sim[0][i], reverse=True)

            top_indices = top_indices[:5]

            recommended_images = []
            for idx in top_indices:
                recommended_image_path = "../fashion-dataset/images/" + df['image'].iloc[idx]
                recommended_images.append(recommended_image_path)

            return jsonify({'recommended_images': recommended_images}), 200
        else:
            return jsonify({'message': 'No similar products found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
