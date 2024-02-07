{
    'use strict';

    // URL: 'https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a'

    const elements = 
        Array.from(document.querySelectorAll('#app_content > *'))
        .filter(x => (x.tagName === 'P' || x.tagName === 'TABLE' || x.tagName === 'FONT') && x.innerText);

    console.log(elements);

    
    const blocks = [];

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName !== 'TABLE') continue;
        
        const prevElement = i === 0 ? null : elements[i-1];
        
        const blockName = prevElement?.tagName !== 'TABLE' ? prevElement.innerText : null;

        const table = [];
        

        const trs = Array.from(elements[i].querySelectorAll('tr'));
        const columnNames = Array.from(trs[0].querySelectorAll('td')).map(x => x.innerText);

        for (let rowI = 1; rowI < trs.length; rowI++) {
            const row = {};
            const cols = Array.from(trs[rowI].querySelectorAll('td')).map(x => x.innerText);
            for (let colI = 1; colI < columnNames.length; colI++) {
                row[columnNames[colI]] = cols[colI];
            }
            table.push(row);
        }

        blocks.push({
            name: blockName,
            tableEl: elements[i],
            prevEl: prevElement,
            table
        });
        
    }

    console.log(blocks);

}

