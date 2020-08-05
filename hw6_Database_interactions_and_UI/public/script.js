const baseUrl = `http://flip2.engr.oregonstate.edu:9159/`;

window.addEventListener('load', (event) => {
  var req = new XMLHttpRequest();
  req.open('GET', `http://flip2.engr.oregonstate.edu:9159/`, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var res = JSON.parse(req.responseText);
      makeTable(res.rows);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
    req.send(null);
    event.preventDefault();
});

document.getElementById('submit').addEventListener('click', function(event){
  var req = new XMLHttpRequest();
  var name = document.getElementById('name').value;
  if(name == "") {
    return;
  }
  var reps = document.getElementById('reps').value;
  if(reps == "") {
    return;
  }
  var weight = document.getElementById('weight').value;
  if(weight == "") {
    return;
  }
  var unit = document.getElementById('unit').value;
  var date = document.getElementById('date').value;
  if(date == "") {
    return;
  }
  var payload = {"name":name, "reps":reps, "weight":weight, "unit":unit, "date":date};
  req.open('POST', baseUrl, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var res = JSON.parse(req.responseText);
      makeTable(res.rows);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
});

const table = document.getElementById("workouts");
table.addEventListener('click', (event) => {
  var req = new XMLHttpRequest();
  let target = event.target.previousSibling.value;
  var payload = {"id":target};
  req.open('DELETE', `http://flip2.engr.oregonstate.edu:9159/`, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var res = JSON.parse(req.responseText);
      makeTable(res.rows);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
});

const makeTable = (rows) => {
  var old_tbody = document.getElementById('content');
  var new_tbody = document.createElement('tbody');
  new_tbody.setAttribute('id', 'content');
  rows.forEach(row => {
    new_tbody.appendChild(makeRow(row));
  });
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

const makeRow = (rowData) => {
  var tr = document.createElement('tr');
  tr.appendChild(makeCell(tr, rowData.name));
  tr.appendChild(makeCell(tr, rowData.reps));
  tr.appendChild(makeCell(tr, rowData.weight));
  if(rowData.unit == 0){
    tr.appendChild(makeCell(tr, "pounds"));
  } else if(rowData.unit == 1) {
    tr.appendChild(makeCell(tr, "kilograms"));
  }
  var date = rowData.date.slice(0,10);
  tr.appendChild(makeCell(tr, date));
  tr.appendChild(makeCell(tr, "delete", rowData));
  return tr;
}

const makeCell = (tr, data, rowData) => {
  var cell = document.createElement("td");
  tr.appendChild(cell);

  if(data == "delete"){
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "id");
    input.setAttribute("value", rowData.id);
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = data;
    form.appendChild(input);
    form.appendChild(button);
    cell.appendChild(form);
  } else {
    var cellText = document.createTextNode("cell");
    cellText.textContent = data;
    cell.appendChild(cellText);
  }
  return cell;
}
