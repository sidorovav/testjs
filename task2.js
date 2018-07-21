function mul1(...args) {
    //var m = 1
    //args.forEach(x => m = m * x)
    var result = args.reduce(function(m, current) {
        return m * current;
      }, 1);
    return result
}
function mul (a) {
    return function (b) 
    { 
      return function (c) 
      { 
        return a * b * c;
      };
    };
}
console.log(mul1(2, 3, 4));
console.log(mul1(4, 3, 4));
 
console.log(mul(2)(3)(4)); // output : 24
console.log(mul(4)(3)(4)); // output : 48
 
