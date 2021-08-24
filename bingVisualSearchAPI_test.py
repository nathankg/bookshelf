#!/usr/bin/env python
import requests, json
import config as config

BASE_URI = 'https://api.bing.microsoft.com/v7.0/images/visualsearch'
SUBSCRIPTION_KEY = config.subscription_key
# IMG_4405_compressed
imagePath = '/Users/nathangupta/Desktop/Bookshelf/compressed/IMG_4405_compressed_resized.jpeg'

def print_json(obj):
    """Print the object as json"""
    print(json.dumps(obj, sort_keys=True, indent=2, separators=(',', ': ')))


HEADERS = {
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    'Content-Disposition': 'form-data',
}

file = {'image' : ('myfile', open(imagePath, 'rb'))}


try:
    response = requests.post(BASE_URI, headers=HEADERS, files=file)
    response.raise_for_status()
    print_json(response.json())
    
except Exception as ex:
    raise ex
