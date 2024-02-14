from bs4 import BeautifulSoup
import requests

MUNI_URL = 'https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a'

# Fetch the HTML content of the webpage
response = requests.get(MUNI_URL)
content = response.content

# Parse the HTML content
soup = BeautifulSoup(content, 'html.parser')
main = soup.find('main', id='app_content')

# Find all elements inside the main tag
elements = main.find_all()

blocks = []

for index, element in enumerate(elements):
    if element.name != 'table':
        continue

    # Get the previous element
    prev_element = elements[index - 1] if index > 0 else None

    # Extract block name
    block_name = prev_element.get_text().strip() if prev_element and \
        prev_element.name != 'table' else None

    # Extract table rows and column names
    table = []
    trs = element.find_all('tr')
    column_names = [td.get_text() for td in trs[0].find_all('td')]

    # Iterate through table rows
    for tr in trs[1:]:
        row = {}
        cols = [td.get_text() for td in tr.find_all('td')]
        for col_name, col_value in zip(column_names[1:], cols[1:]):
            row[col_name] = col_value
        table.append(row)

    # Extract block name's bold text and regular text
    if block_name:
        bold_text = prev_element.find('b')
        if bold_text:
            bold_text = bold_text.get_text().strip()
            all_text = prev_element.get_text().strip()
            regular_text = all_text[len(bold_text):].strip()
            block_name_bold = bold_text
            block_name_regular = regular_text
        else:
            block_name_bold = None
            block_name_regular = None
    else:
        block_name_bold = None
        block_name_regular = None

    # Construct block dictionary
    block = {
        'name': block_name,
        'tableEl': element,
        'prevEl': prev_element,
        'table': table,
        'nameBald': block_name_bold,
        'nameRegular': block_name_regular
    }
    blocks.append(block)

print(blocks)
