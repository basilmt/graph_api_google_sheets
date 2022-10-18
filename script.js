function CreateUrl(key, gql) {
	var gq = gql;
	var encodedgg = encodeURIComponent(gq);
	// If you want from a particular sheet use this one
	// var url = 'https://docs.google.com/spreadsheets/d/' + key + '/gviz/tq?sheet=Sheet2&tq=' + encodedgg;
    var url = 'https://docs.google.com/spreadsheets/d/' + key + '/gviz/tq?tq=' + encodedgg;
	return url;
}

function Request(url, responseFunction) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText.substring(this.responseText.IndexOf("(")+1, this.responseText.lastIndexOf(")"));
			var responseJSON = JSON.parse(response);
			responseFunction(responseJSON);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function draw_tables(elm, json_res, gql) {
    container = document.createElement('div');
    gql_text = document.createElement('div');
    gql_text.innerHTML = gql;
    container.appendChild(gql_text);
	if(json_res.status !== "ok"){
        err_text = document.createElement('div');
        err_text.innerHTML = "Something Went Wrong";
        container.appendChild(err_text);
        elm.appendChild(container)
		return
	}

    table = json_res.table
	
	tbl = document.createElement('table');
    if(json_res.table.parsedNumHeaders != 0){
		// draw headers
		row = document.createElement('tr');
        for (let i = 0; i < table.cols.length; i++) {
			cell = document.createElement('th');
			cell.innerHTML = table.cols[i].label;
			row.appendChild(cell)
        }
		tbl.appendChild(row)
	}
	// draw table
    rows = table.rows
    for (let i = 0; i < rows.length; i++) {
		row = document.createElement('tr');
		temp_row = rows[i].c
        for (let j = 0; j < temp_row.length; j++) {
			cell = document.createElement('td');
            cell.innerHTML = temp_row[j].v;
			row.appendChild(cell)
        }   
		tbl.appendChild(row)
    }
	container.appendChild(tbl)
    elm.appendChild(container)
}

async function preview(elm, url,gql) {
	await fetch(url)
		.then(data => data.text())
		.then(function(response) {
			var responseText = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));
			var response = JSON.parse(responseText);
            console.log(JSON.stringify(response, null, 2));
			draw_tables(elm, response, gql);
		})
}

function sep(ele){
    ele.appendChild(document.createElement('br'));
    ele.appendChild(document.createElement('hr'));
    ele.appendChild(document.createElement('br'));
}

var previewElement = document.getElementById('preview');
var gsKey = '18XF7jOBaUOMoN5KuTi5NNzq-HgAV-7Rmt1-V3H674HA';


var gql = "SELECT *";
var url = CreateUrl(gsKey, gql);
await preview(previewElement, url, gql);
sep(previewElement)

var gql = "SELECT A, C, D";
var url = CreateUrl(gsKey, gql);
await preview(previewElement, url, gql);
sep(previewElement)



