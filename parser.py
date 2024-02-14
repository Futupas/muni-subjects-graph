# from html.parser import HTMLParser
import urllib.request
from bs4 import BeautifulSoup

MUNI_URL = 'https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a'

opener = urllib.request.FancyURLopener({})
f = opener.open(MUNI_URL)
content = f.read()

# Parse the HTML content
soup = BeautifulSoup(content, 'html.parser')
main = soup.find('main', id='app_content')

# Find all elements inside the main tag
elements = main.find_all()

print(len(elements))

for element in elements:
    print("Tag name:", element.name)


exit(0)


# Find all <p> elements followed by <table> elements
sequences = []
paragraphs = soup.find_all('p')
for p in paragraphs:
    next_table = p.find_next_sibling('table')
    if next_table:
        sequences.append((p, next_table))

# Print or process the found sequences
for p, table in sequences:
    # print("Paragraph:", p.get_text(strip=True))
    print("Paragraph:", p.get_text())
    # print("Table:", table)
    print()
