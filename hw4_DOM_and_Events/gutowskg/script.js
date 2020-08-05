/*
function createAndAppend (newElement, parent) {
  var element = document.createElement(newElement);
  parent.appendChild(element);
}

function createAndAppendwText (newElement, parent, text) {
  var element = document.createElement(newElement);
  element.textContent = text;
  parent.appendChild(element);
}
*/

function createTable() {
  var table = document.createElement("table");
  table.setAttribute("id", "newTable");
  table.style.border = "1px solid black";
  document.body.appendChild(table);

  var thead = document.createElement("thead");
  table.appendChild(thead);

  var row = document.createElement("tr");
  thead.appendChild(row);

  for (var j = 1; j < 5; j++) {
    var hcell = document.createElement("th");
    row.appendChild(hcell);

    var cellText = document.createTextNode("cell");
    cellText.textContent = "Header " + j;
    hcell.appendChild(cellText);
  }

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  var k = 1;

  for (var i = 0; i < 3; i++) {
    var row = document.createElement("tr");
    tbody.appendChild(row);

    for (var j = 1; j < 5; j++) {
      var cell = document.createElement("td");
      row.appendChild(cell);

      var cellText = document.createTextNode("cell");
      cellText.textContent = k + "," + j;
      cell.appendChild(cellText);
    }

    k++;
  }
}

function createButtons(){
  var up = document.createElement("button");
  up.setAttribute("id", "up");
  up.textContent = "↑";
  document.body.appendChild(up);

  var div = document.createElement("div");
  document.body.appendChild(div);

  var left = document.createElement("button");
  left.setAttribute("id", "left");
  left.textContent = "←";
  document.body.appendChild(left);

  var right = document.createElement("button");
  right.setAttribute("id", "right");
  right.textContent = "→";
  document.body.appendChild(right);

  var div = document.createElement("div");
  document.body.appendChild(div);

  var down = document.createElement("button");
  down.setAttribute("id", "down");
  down.textContent = "↓";
  document.body.appendChild(down);

  var div = document.createElement("div");
  document.body.appendChild(div);

  var markCell = document.createElement("button");
  markCell.setAttribute("id", "markCell");
  markCell.textContent = "Mark Cell";
  document.body.appendChild(markCell);
}

function addStyles() {
  var parent = document.getElementById("newTable").firstElementChild;

  for (var i = 0; i < 4; i++) {
    if (i == 0) {
      var elements = parent.firstElementChild.children;
    } else {
      var elements = parent.children;
    }
    for (var j = 0; j < 4; j++) {
      if (j == 0 && i == 1){
        elements[j].style.border = "5px solid black";
      } else {
        elements[j].style.border = "1px solid black";
      }
    }
    if (i == 0) {
      parent = parent.nextElementSibling.firstElementChild;
    } else {
      parent = parent.nextElementSibling;
    }
  }

  var buttons = Array.from(document.querySelectorAll("button"));
  buttons.forEach(function(button, idx) {
    button.style.width = "40px";
    button.style.height = "40px";
    if (idx == 0 || idx == 3) {
      button.style.marginLeft = "40px";
    } else if (idx == 1) {
      button.style.marginRight = "40px"
    } else if (idx == 4) {
      button.style.width = "120px";
      button.style.height = "40px";
      button.style.marginTop = "10px";
    }
  });
}

function mark(){
  let cells = Array.from(document.querySelectorAll("td"));
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].style.border == "5px solid black") {
      cells[i].style.backgroundColor = "yellow";
      return;
    }
  }
}

function move_down(){
  var cells = Array.from(document.querySelectorAll("td"));
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].style.border == "5px solid black") {
      var marked = i;
    }
  }

  let down = marked + 4;
  if (down > 11) {
    return;
  } else {
    cells[down].style.border = "5px solid black"
    cells[marked].style.border = "1px solid black"
    return;
  }
}

function move_up(){
  var cells = Array.from(document.querySelectorAll("td"));
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].style.border == "5px solid black") {
      var marked = i;
    }
  }

  let above = marked - 4;
  if (above < 0) {
    return;
  } else {
    cells[above].style.border = "5px solid black"
    cells[marked].style.border = "1px solid black"
    return;
  }
}

function move_left(){
  var cells = Array.from(document.querySelectorAll("td"));
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].style.border == "5px solid black") {
      var marked = i;
      break;
    }
  }

  let left = marked - 1;
  if (marked%4 == 0 || left < 0) {
    return;
  } else {
    cells[left].style.border = "5px solid black"
    cells[marked].style.border = "1px solid black"
    return;
  }
}

function move_right(){
  var cells = Array.from(document.querySelectorAll("td"));
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].style.border == "5px solid black") {
      var marked = i;
    }
  }

  let right = marked + 1;
  if (right%4 == 0) {
    return;
  } else {
    cells[right].style.border = "5px solid black"
    cells[marked].style.border = "1px solid black"
    return;
  }
}

function addButtonFunctions() {
  document.addEventListener("DOMContentLoaded", function(event) {
      document.getElementById("markCell").addEventListener("click", mark);
      document.getElementById("up").addEventListener("click", move_up);
      document.getElementById("left").addEventListener("click", move_left);
      document.getElementById("right").addEventListener("click", move_right);
      document.getElementById("down").addEventListener("click", move_down);
  });
}

createTable();
createButtons();
addStyles();
addButtonFunctions();
