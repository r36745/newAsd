$(document).ready(function() {

function makeCats() {
	var formTag = $('form'),
	/*$('#select') grabs <li>  */
		selectLi = $('#select'),
		makeSelect = $('<select></select>');
		makeSelect.attr('id', 'groups');
	for(var i=0, j=contactGrps.length; i<j; i++) {
		var makeOption = $('<option></option>');
		var optText = contactGrps[i];
		makeOption.attr("value", optText);
		makeOption.html(optText);
		makeSelect.append(makeOption);
	}
	selectLi.append(makeSelect);
}

function getSelectedRadio() {
	var radios = document.forms[0].sex;
	for(var i=0; i<radios.length; i++) {
		if(radios[i].checked) {
			sexValue = radios[i].value;
		}
	}
}
function getCheckboxValue() {
	if($('#fav').checked) {
		favoriteValue = $('#fav').val();
	} else {
		favoriteValue = "No";
	}
}

function toggleControls(n) {
	switch(n){
		case "on":
			$('#lifeForm').css('display', 'none');
			$('#displayLink').css('display', 'none');
			$('#clearLink').css('display', 'inline');
			$('#update').css('display', 'inline');
			break;
		case "off":
			$('#lifeForm').css('display', 'block');
			$('#clearLink').css('display', 'inline');
			$('#displayLink').css('display', 'inline');
			$('#update').css('display', 'none');
			$('#items').css('display', 'none');
			break;
		default:
			return false;
	}
}

function storeData() {

	var id 					= Math.floor(Math.random()* 100000001);
	getSelectedRadio();
	getCheckboxValue();

	var item 				={};
		item.group 			=['Groups:', $('#groups').val()];
		item.fname			=['First Name:', $('#fname').val()];
		item.sex 			=['Sex:', sexValue];
		/*item.favorite 		=['Favorite:', favoriteValue];*/
	localStorage.setItem(id, JSON.stringify(item));
	alert('contact saved!');
}

function getData() {
	toggleControls('on');
	if(localStorage.length === 0) {
		alert("no data in local storage");
	}
	var makeDiv = $('<div></div>');
	makeDiv.attr("id", "items");
	var makeList = $('<ul></ul>');
	makeDiv.append(makeList);
	$('#formPage').append(makeDiv);
	$('#items').css('display', 'block');
	for(var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('<li></li>');
		var linksLi = $('<li></li>');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = $('<ul></ul>');
		makeLi.append(makeSubList);
		for(var n in obj) {
			var makeSubLi = $('<li></li>');
			makeSubList.append(makeSubLi);
			var optSubText = obj[n][0]+ " "+obj[n][1];
			makeSubLi.html(optSubText);
			makeSubList.append(linksLi);
		}
		makeItemLinks(localStorage.key(i),linksLi);
	}
}


function makeItemLinks(key, linksLi) {
	var editLink = $('<a></a>');
		editLink.attr("href", "#");
	editLink.key = key;
	var editText = "Edit Profile";
	$(editLink).click(function() {

		editItem(key);
	});
	editLink.html(editText);
	linksLi.append(editLink);

	var breakTag = $('<br/>');
	linksLi.append(breakTag);

	var deleteLink = $('<a></a>');
	deleteLink.attr("href", "#");
	deleteLink.key = key;
	var deleteText = "Delete Profile";
	$(deleteLink).click(function() {
		deleteItem();
	});
	deleteLink.html(deleteText);
	linksLi.append(deleteLink);
}

function editItem(key) {
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);

	toggleControls('off');
	
	$('#groups').val("");
	$('fname').val("steve");
	var radios = document.forms[0].sex;
	for(var i=0; i<radios.length; i++) {
		if(radios[i].value == "Male" && item.sex[1] == "Male") {
			radios[i].attr("checked", "checked");
		} else if(radios[i].value == "Female" && item.sex[1] == "Female") {
			radios[i].attr("checked", "checked");
		}
	}
}


function clearLocal() {
	if(localStorage.length === 0) {
		alert("No data");
	} else {
		localStorage.clear();
		alert("All Info is deleted");
		window.location.reload();
		return false;
	}
}


function newItem(){}







	var contactGrps = ['--choose a group--', 'family', 'friends', 'work'],
		sexValue,
		favoriteValue = "No"
		;
	makeCats();


	
	$('#displayLink').click(function() {
		getData();

		
	});
	
	$('#clearLink').click(function() {
		clearLocal();
	});
	
	$('#submit').click(function() {
		storeData();
		
	});

});