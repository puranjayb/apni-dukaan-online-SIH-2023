import numpy as np
import pandas as pd
import keras.api._v2.keras as keras
from keras.preprocessing import image
from keras.applications.densenet import preprocess_input
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from sklearn.metrics.pairwise import linear_kernel

model_architecture_path = "model_architecture.json"
with open(model_architecture_path, "r") as json_file:
    loaded_model_json = json_file.read()

loaded_model = keras.models.model_from_json(loaded_model_json)

model_weights_path = "model_weights.h5"
loaded_model.load_weights(model_weights_path)

img_width, img_height, chnl = 200, 200, 3

test_image_path = "test_image.jpg"
img = image.load_img(test_image_path, target_size=(img_width, img_height))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

recommendations = loaded_model.predict(x)

df_embedding = pd.read_csv('embeddings_data.csv')
cosine_sim = linear_kernel(recommendations, df_embedding)

top_indices = cosine_sim.argsort()[0][-5:][::-1]

plt.title("Test Image")
plt.imshow(mpimg.imread(test_image_path))
plt.axis("off")
plt.show()

df = pd.read_csv('styles-updated.csv', nrows=6000)

plt.figure(figsize=(20, 4))
for i, idx in enumerate(top_indices):
    plt.subplot(1, 5, i + 1)
    recommended_image_path = "../Fashion-Dataset/images/" + df['image'].iloc[idx]
    recommended_img = mpimg.imread(recommended_image_path)
    plt.imshow(recommended_img)
    plt.axis("off")

plt.suptitle("Recommended Images")
plt.show()
