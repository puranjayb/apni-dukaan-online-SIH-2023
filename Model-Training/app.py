from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
import keras.api._v2.keras as keras
from keras.preprocessing import image
from keras.applications.densenet import preprocess_input
from sklearn.metrics.pairwise import linear_kernel
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

app = Flask(__name__)

@app.route('/api/recommend', methods=['POST'])
def recommend_images():
    try:
        # if the image is submitted in a form such that the image has name='test_image'
        test_image = request.files['test_image']

        if not test_image:
            return jsonify({"error": "Test image not provided"}), 400

        model_architecture_path = "model_architecture.json"
        with open(model_architecture_path, "r") as json_file:
            loaded_model_json = json_file.read()

        loaded_model = keras.models.model_from_json(loaded_model_json)

        model_weights_path = "model_weights.h5"
        loaded_model.load_weights(model_weights_path)

        img_width, img_height, chnl = 200, 200, 3
        img = image.load_img(test_image, target_size=(img_width, img_height))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        recommendations = loaded_model.predict(x)

        df_embedding = pd.read_csv('embeddings_data.csv')
        cosine_sim = linear_kernel(recommendations, df_embedding)

        top_indices = cosine_sim.argsort()[0][-5:][::-1]

        df = pd.read_csv('styles-updated.csv', nrows=6000)

        recommended_images = []
        for idx in top_indices:
            recommended_image_path = "../Fashion-Dataset/images/" + df['image'].iloc[idx]
            recommended_images.append(recommended_image_path)

        return jsonify({"recommended_images": recommended_images})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
