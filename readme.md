# MUNI Subjects graph

This is a project to create a graph of subjects at MUNI (some of them depend on others), and show it to make study easier.

Source: https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a



## Flow

1. Get data from the webpage(s)
    * \[HTML -> JSON\]
    * JavaScript
    * Manually
1. Process the data and get output JSON
    * \[JSON\] -> JSON
    * Python
    * Automatically
1. Visualize JSON
    * JSON -> HTML
    * JavaScript
    * Automatically



## Tasks

1. Write HTML to JSON parsers **(JavaScript)**
1. Write final JSON visualizer **(HTML+JavaScript)**
1. Make and implement design **(HTML+CSS+JavaScript)**
1. Make basic JSON processer that takes "raw" JSON, and makes a good useful JSON file with all the connections etc **(Python)**
1. Make prerequisites parser. It takes a text and returns a python/JSON object that represents graph. Basically it's a string-to-graph parser **(Python)**
1. Make HTML parser on Python to automatize manual processes **(Python)**



## Branches:

1. **master** - Main branch. Don't push your code here with no approval and no preparations
1. **parse-json** - raw JSON to processed JSON
1. **parse-prerequisites** - prerequisites parser
1. **rnd** - python HTNL parser

