from html.parser import HTMLParser
import urllib.request
from bs4 import BeautifulSoup

MUNI_URL = 'https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a'

opener = urllib.request.FancyURLopener({})
f = opener.open(MUNI_URL)
content = f.read()

# print(content)

# Parse the HTML content
soup = BeautifulSoup(content, 'html.parser')

# Find the table with class 'class1'
# table = soup.find('table')
# table = soup.find('div', class_='class1').find('table')


main = soup.find('main', id='app_content')
# ch1 = main.children
# children = [child for child in main.children if child.name is not None]
#
# for child in ch1:
#     print(child.name)

print(len(list(main.children)))

for child in list(main.children):
    # Check if the child is a tag (element)
    print("Tag name:", child.name)
    # if child.name is not None:
    #     # Print the tag name
    #     print("Tag name:", child.name)



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


