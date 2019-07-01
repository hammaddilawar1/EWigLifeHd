function bookSearch(){
	var search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
		dataType: "json",
		success: function(data) {
			
			for(i=0;i<data.items.length;i++){
				var jdata = data.items[i].volumeInfo	

				document.getElementById("results").innerHTML += "<div class='row bookWrap'><div class='col-sm-4 col-sm-offset-2'><h2>" + jdata.title + "</h2>" + "<h3>" + jdata.authors[0] + "</h3>" + "<h4>" + jdata.publishedDate + "</h4><a  target='_blank' href='" + jdata.infoLink + "'><button class='btn btn-primary'>Learn More</button></a></div>" + "<div class='col-sm-4'><img src='" + jdata.imageLinks.thumbnail + "'></div></div>"
			}
		},
		type: 'GET'
	});
}

document.getElementById('button').addEventListener('click', bookSearch, false)