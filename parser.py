import json


#f = open('input-small.json')
#data = json.load(f)
#print(data[0]["name"])


# need to fix
file_path = 'C:/Users/user/OneDrive/Документи/GitHub/muni-subjects-graph/input.json'


with open(file_path, 'r', encoding='utf-8') as file:
    original_data = json.load(file)

# store transformed data
transformed_data = []

for item in original_data:
    for subject in item["table"]:
        # Extract faculty abbreviation if code contains it, otherwise set faculty to "FI"
        if ":" in subject["kód"]:
            faculty, code = subject["kód"].split(":", 1)
        else:
            faculty = "FI"
            code = subject["kód"]

        transformed_subject = {
            "faculty": faculty,
            "code": code,
            "name": subject["název"],
            "conclusion": subject["ukon."],
            "credits": int(subject["kred."].split()[0]),  
            "prerequisites": subject["prerekvizity"],
            "link": f"https://is.muni.cz/predmet/{faculty.lower()}/{code}", # need to fix so it'll work for all faculties
            "additionalData": {
                "rozsah": subject["rozsah"],
                "garant": subject["garant"],
                "vyučující": subject["vyučující"]
            }
        }
        transformed_data.append(transformed_subject)

print(json.dumps(transformed_data, indent=2, ensure_ascii=False))
