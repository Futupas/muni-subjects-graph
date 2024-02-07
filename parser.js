{
    'use strict';

    // URL: 'https://is.muni.cz/predmety/sablony_tisk?fakulta=1433;obdobi=9224;uzel=2592713;rek=a'

    const elements = 
        Array.from(document.querySelectorAll('#app_content > *'))
        .filter(x => (x.tagName === 'P' || x.tagName === 'TABLE' || x.tagName === 'FONT') && x.innerText);

    console.log(elements);
}

