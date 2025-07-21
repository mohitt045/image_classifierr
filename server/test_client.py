import requests

with open("b64.txt", "r") as f:
    b64_image = f.read()

response = requests.post("http://127.0.0.1:5000/classify_image", data={'image_data': b64_image})
print(response.json())
