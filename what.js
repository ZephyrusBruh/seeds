function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

var seed = cyrb128("butt"); 

// Or... only one 32-bit component hash is needed for splitmix32.
var rand = splitmix32(seed[0]);

function splitmix32(a) {
   return function() { //yippee
   a |= 0;
   a = a + 0x9e3779b9 | 0;
   let t = a ^ a >>> 16;
   t = Math.imul(t, 0x21f0aaad);
   t = t ^ t >>> 15;
   t = Math.imul(t, 0x735a2d97);
   return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
  }
}
var yes = 8; //this gets randomed
const prng = splitmix32((yes*2**32)>>>0)
for(let i=0; i<10; i++) console.log(prng());


function setSeed(){
  let textStuff = document.getElementById("seedStart");
  let currentText = textStuff.value;
  var seed = cyrb128(currentText); 
  // Or... only one 32-bit component hash is needed for splitmix32.
  rand = splitmix32(seed[0]);
}


function updateText(){
  
    let varNameYes = document.getElementById("testNumbersTeeHee");
    for(let i=0; i<10; i++) {
      varNameYes.innerHTML += "<br>"+ rand() + "<br>";
    };
    
}