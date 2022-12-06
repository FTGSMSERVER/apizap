const cfonts = require('cfonts')




var cores = ["red","green","yellow","blue","magenta","cyan","white","gray","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright","whiteBright"]
const cor1 = cores[Math.floor(Math.random() * (cores.length))]	
const cor2 = cores[Math.floor(Math.random() * (cores.length))]	
const cor3 = cores[Math.floor(Math.random() * (cores.length))]	
const cor4 = cores[Math.floor(Math.random() * (cores.length))]	
const cor5 = cores[Math.floor(Math.random() * (cores.length))]	

const banner = cfonts.render(('   APIZAP \n 1.0'), {
    font: 'block',
    align: 'center',
    colors: [`${cor1}`,`${cor3}`,`${cor4}`,`${cor2}`],
    lineHeight: 4
  });


module.exports = { banner }
