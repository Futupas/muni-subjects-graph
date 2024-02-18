import json


#f = open('input-small.json')
#data = json.load(f)
#print(data[0]["name"])


# need to fix
file_path = 'C:/Users/user/OneDrive/Документи/GitHub/muni-subjects-graph/input.json'


with open(file_path, 'r', encoding='utf-8') as file:
    original_data = json.load(file)

# Dict for faculties used in generated link
faculty_links = {
    "FI": "fi", 
    "PrF": "law",
    "FSS": "fss",
    "LF": "med",
    "PřF": "sci",
    "FF": "phil",
    "PdF": "ped",
    "FaF": "pharm",
    "ESF": "econ",
    "FSpS": "fsps"
}

transformed_data = []

for item in original_data:
    for subject in item["table"]:
        
        # Extract faculty abbreviation if code contains it, otherwise set faculty to "FI"
        if ":" in subject["kód"]:
            faculty, code = subject["kód"].split(":", 1)
        else:
            faculty = "FI"
            code = subject["kód"]

        # Get the corresponding link for the faculty
        link_faculty = faculty_links.get(faculty)

        transformed_subject = {
            "faculty": faculty,
            "code": code,
            "name": subject["název"],
            "conclusion": subject["ukon."],
            "credits": int(subject["kred."].split()[0]),
            "prerequisites": subject["prerekvizity"],
            "link": f"https://is.muni.cz/predmet/{link_faculty}/{code}",
            "additionalData": {
                "rozsah": subject["rozsah"],
                "garant": subject["garant"],
                "vyučující": subject["vyučující"]
            }
        }
        transformed_data.append(transformed_subject)

print(json.dumps(transformed_data, indent=2, ensure_ascii=False))
