function mul(...args) {
    //var m = 1
    //args.forEach(x => m = m * x)
    var result = args.reduce(function(m, current) {
        return m * current;
      }, 1);
    return result
}

console.log(mul(2, 3, 4));
console.log(mul(4, 3, 4));
//console.log(mul(2)(3)(4));
/*
 
console.log(mul(2)(3)(4)); // output : 24
console.log(mul(4)(3)(4)); // output : 48
 
*/
