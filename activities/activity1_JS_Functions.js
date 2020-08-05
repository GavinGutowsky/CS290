console.log(square(8));

function square(x) {
  return x * x;
}

console.log(callSquare(10));

var callSquare = function(x){
    return square(x);
}
