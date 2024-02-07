import json
f = open('input-small.json')
data = json.load(f)

print(data[0]["name"])
