var myDirectory = (function() {
	
	//Retrieve JSON object from git
	var xmlhttp = new XMLHttpRequest();
	var url = "https://gist.githubusercontent.com/anonymous/d3b470b271c39a70fada/raw/1665d41dfe70ab12981b737a71263b33c93dbf55/people.json";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var myArr = JSON.parse(this.responseText);
	        buildList(myArr);
	    }
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//Parse JSON object
	function buildList(arr) {
		var build = "";
		var i;
		for (i = 0; i < arr.length; i++) {
			build += '<div class="entry"><div class="inner"><p><strong>ID: </strong>' + arr[i].id + 
			         '<br /><strong>First Name: </strong>' + arr[i].firstName + 
			         '<br /><strong>Last Name: </strong>' + arr[i].lastName + 
			         '<br /><strong>Birthday: </strong>' + arr[i].birthday + 
			         '</p>' + '<p><strong>Bio: </strong>' + arr[i].bio + 
			         '</p></div></div>';
		}
		document.getElementById("result").innerHTML = build;
	}

	//Trigger form to display on button click
	var element = document.getElementsByClassName('addButton')[0];
	element.addEventListener("click", function(e) {
	    document.getElementById('form').style.display = "block";
	}, false);

	//Retrieve data from form
	var saveMe = document.getElementById("save");
	var cancelMe = document.getElementById("cancel");

	//Save new entries to page when save button is clicked
	function save() {
	    var id = document.getElementById("id").value;
	    var firstName = document.getElementById("firstName").value;
	    var lastName = document.getElementById("lastName").value;
	    var birthday = document.getElementById("birthday").value;
	    var bio = document.getElementById("bio").value;
	    // Create new div for new entry
		var result = document.createElement('div');
		result.className = 'entry';
		result.innerHTML = '<div class="inner"><p><strong>ID: </strong>' + id + 
		                   '<br /><strong>First Name: </strong>' + firstName +
		                   '<br /><strong>Last Name: </strong>' + lastName + 
		                   '<br /><strong>Birthday: </strong>' + birthday + '</p>' + 
		                   '<p><strong>Bio: </strong>' + bio + '</p></div>';
		// Append the div to the result div
	    var div = document.getElementById("result");
	    div.appendChild(result);
	    div.insertBefore(result, div.childNodes[0]);
	}

	//Reset form when cancel button is clicked
	function cancel () {
	    var id = document.getElementById("id");
	    var firstName = document.getElementById("firstName");
	    var lastName = document.getElementById("lastName");
	    var birthday = document.getElementById("birthday");
	    var bio = document.getElementById("bio");
	    var fields = [id, firstName, lastName, birthday, bio];
		for (i = 0; i < fields.length; i++) {
			fields[i].value = "";
		}
	}

	//Listen for save and cancel button clicks
	saveMe.addEventListener('click', save, true);
	cancelMe.addEventListener('click', cancel, true);

	//Search form (time for jQuery)
	var $ = jQuery.noConflict();
	/*$('#search').keyup(function () {
        var searchterm = $(this).val();
        //Use css to display or hide items based on search term
        if (searchterm.length > 0) {
		    var match = $('.entry:contains("' + searchterm + '")');
		    console.log(match);
		    var nomatch = $('.entry:not(:contains("' + searchterm + '"))');
		    match.addClass('selected');
		    match.css("display", "");
            nomatch.css("display", "none");
        } else {
			$('.entry').css("display", "block");
			$('.entry').removeClass('selected');
        }
    });*/
    $('#search').keyup(function(e) {
	    //Create regular expression
	    var regEx = new RegExp($.map($(this).val().trim().split(' '), function(v) {
	        return '[a-zA-Z0-9](?=.*?' + v + ')';
	    }).join(''), 'i');
	    //Filter list items with regEx
	    $('#result .entry').hide().filter(function() {
	        return regEx.exec($(this).text());
	    }).show();
	})
})()