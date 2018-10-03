// Creating the necessary variables for later use
var i, mousex, mousey, num, justClickedID,
	lastClickedID, popup, justClosed = false;
const eventTable = document.getElementById('hoverTable');
const url = 'https://api.github.com/events';

// Pulls the necessary data using the GitHub API
fetch(url)
	.then(response => response.json())
	.then(function(data) {
		
		// Iterates through each event returned by GitHub and populates the event table
		for(i in data)
		{
			num = +i + 1;
			
			// Creates the tooltip/popup and populates the event table
			eventTable.innerHTML += '<tr class="tooltip" id="' + data[i].id
									+ '"><td>' + num + '</td><td>'
									
									// This is the tooltip/popup itself
									+ '<span class="tooltiptext" id="tt' + data[i].id
									+ '"><img src="' + data[i].actor.avatar_url
									+ '">Username: ' + data[i].actor.login + '<br>'
									+ 'Event Type: ' + data[i].type + '<br>'
									+ 'Repo: ' + data[i].repo.name + '<br>'
									+ 'Created: ' + data[i].created_at + '</span>'

									// Populates the event table itself						
									+ '<a href="https://github.com/'
									+ data[i].actor.login + '">'
									+ data[i].actor.login + '</a></td><td>'
									+ data[i].type + '</td><td>'
									+ '<a href="https://github.com/'
									+ data[i].repo.name + '">'
									+ data[i].repo.name + '</a></td></tr>';
		}
	})	
	.catch(function(error) {
		console.log(error);
	});

// Refresh button
function refreshPage(){
	location.reload()
}

// Function that makes the event-details tooltip/popup work
$("#eventTable").on('click', 'tr', function(e) {
	
	lastClickedID = justClickedID;
	justClickedID = $(this).attr('id');
	
	// This makes sure that after closing one popup, opening a popup from a different
	// table row doesn't toggle the previously opened popup to re-open
	if (popup != null && !justClosed && lastClickedID != justClickedID) {
		popup.classList.toggle("show");
	}

	// Toggles between 'hidden' and 'visible' tooltips/popups
	if (lastClickedID === justClickedID) {
		if (popup != null) popup.classList.toggle("show");
		justClosed = !justClosed;
	} else {
		popup = document.getElementById("tt" + justClickedID);
		if (popup != null) popup.classList.toggle("show");
		justClosed = false;
	}

	// Sets the tooltip/popup's coordinates to be near the mouse when clicked
	if (popup != null) {
		
		mousex = (e.clientX + 10);
		mousey = (e.clientY + 10);
		
		// If the tooltip/popup would be cutoff by the side or bottom of the
		// window, it will be positioned in such a way that it won't be cutoff
		if (mousex + popup.offsetWidth > $(window).width()) {
			mousex = $(window).width() - popup.offsetWidth - 10;
		}
		if (mousey + popup.offsetHeight > $(window).height()) {
			mousey = $(window).height() - popup.offsetHeight - 10;
		}
		
		popup.style.top = mousey + 'px';
		popup.style.left = mousex + 'px';
	}
});