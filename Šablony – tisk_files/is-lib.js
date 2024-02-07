/* Spolecne funkce pro vsechny stranky v ISu */

/*
 * vice onload veci v jedne strance - prevzato z
 * http://simonwillison.net/2004/May/26/addLoadEvent/
 */

function add_load_event(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

function location_replace(anchor) {
	add_load_event(function() {
		if (location.hash != anchor) {
			location.hash = anchor;
		} 
	} );
}

function switchDiv(id) {
	if (document.getElementById(id)) {
		div = document.getElementById(id);
		if (div.style.display == 'none') { div.style.display = 'block'; }
		else { div.style.display = 'none' }
	}
}

function switchSpan(id) {
	if (document.getElementById(id)) {
		span = document.getElementById(id);
		if (span.style.display == 'none') { span.style.display = 'inline'; }
		else { span.style.display = 'none' }
	}
}

function switchDivs(ids) {
  for (var i = 0, l = ids.length; i < l; i++) {
    switchDiv(ids[i]);
  }
}

function closeDiv(id) {
	if (document.getElementById(id)) {
		element = document.getElementById(id);
		element.style.display = 'none';
	}
}

function show(elementId) {
        document.getElementById(elementId).style.visibility = "visible";
}

function hide(elementId) {
        document.getElementById(elementId).style.visibility = "hidden";
}


function openDiv(id, ids) {
  switchDiv(id);
  for (var i = 0, l = ids.length; i < l; i++) {
    closeDiv(ids[i]);
  }	
}

function jqueryShift(el) {
  if (el.css("position") == "absolute") {
    // IE neumi fixed, pro absolute scrolovani
    skok = document.body.scrollTop + $(window).height() * 0.125;
    el.css("top", skok + "px");
  }
}

function jqueryCloseJSwifr() {
  ($.expose || { close : $.noop }).close();
  $("#jswifr").filter('iframe').remove();
// TODO: focus
//  document.getElementById('CILSL').focus();
}

function redirect_by_form (sec, $form, $time_left) {
	$form = $form || $('#redirect_form');
	$time_left = $time_left || $('#redirect_time_left');
	sec = sec || 8;

	(function loop () {
		$time_left.text(sec);

		if (sec <= 0) {
			$form.submit();
			return;
		}

		setTimeout(loop, 1000);
		--sec;
	}());
}
