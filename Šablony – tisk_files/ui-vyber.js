var uiStavVyberu = new Object()
uiStavVyberu['fakulta'] = uiStavVyberu['studium'] = uiStavVyberu['obdobi'] = 'sbaleno'

function uiVyber(prvek) {
  if (uiStavVyberu[prvek] == 'sbaleno') {
    document.getElementById("id-vyber-"+prvek).style.display = 'block'
    uiStavVyberu[prvek] = 'rozbaleno'
  } else {
    document.getElementById("id-vyber-"+prvek).style.display = 'none'
    uiStavVyberu[prvek] = 'sbaleno'
    }
}
function uiPosli(prvek, hodnota) {
  var formular = document.forms["id-f-"+prvek]
  formular.firstChild.value = hodnota
  formular.submit()
}
