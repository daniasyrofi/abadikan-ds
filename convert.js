const { formatHex, oklch } = require('culori');
console.log('Neutral 50 (Bg L)      :', formatHex(oklch({l: 0.98, c: 0.005, h: 80})));
console.log('Neutral 900 (Text L)   :', formatHex(oklch({l: 0.20, c: 0.010, h: 80})));
console.log('Pink Base (Pri/Sec L)  :', formatHex(oklch({l: 0.60, c: 0.18, h: 350})));
console.log('Neutral 800 (Bg D)     :', formatHex(oklch({l: 0.28, c: 0.010, h: 80})));
console.log('Pink Light (Pri/Sec D) :', formatHex(oklch({l: 0.68, c: 0.16, h: 350})));
