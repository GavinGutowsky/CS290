/* I initially attempted to add / remove elements using DOM but realized that was
very tedious and prone to many errors and complications and eventually branched out*/
function reveal(options) {
  var section = document.getElementById(options);
  if (section.style.display === "block") {
    section.style.display = "none";
    console.log(options);
  } else {
    section.style.display = "block";
  }
}
