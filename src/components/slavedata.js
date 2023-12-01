const simulator = require("./simulator");

const fs = require("fs");

/* try {
   const data = fs.readFileSync('./profiles/AB_PM500.json', 'utf8');
   profile =JSON.parse(data); 
   // console.log(profile);
} catch (err) {
   console.error(err);
} 

raiz3 = Math.sqrt(3);
vnominal = 110;
inominal = 300;
fnominal = 60;
v1 = simulator.getVoltageValue(vnominal * raiz3);
v2 = simulator.getVoltageValue(vnominal * raiz3);
v3 = simulator.getVoltageValue(vnominal * raiz3);
v12 = simulator.getVoltageValue(vnominal);
v23 = simulator.getVoltageValue(vnominal);
v31 = simulator.getVoltageValue(vnominal);
i1 = simulator.getCurrentValue(inominal);
i2 = simulator.getCurrentValue(inominal);
i3 = simulator.getCurrentValue(inominal);
pf = simulator.getPFValue();
f = simulator.getFrecuencyValue(fnominal);
pac = simulator.getPowerValue(i1, v12, pf);
pre = pac / pf;
pap = Math.sqrt(pac * pac + pre * pre);
console.log(`v1:${v1}, v2: ${v2}, v3: ${v3}`);
console.log(`i1:${i1}, i2: ${i2}, i3: ${i3}`);
console.log(`pf:${pf}, f: ${f}`);
console.log(`P activa:${pac}, P reactiva: ${pre}, P aparente: ${pap}`);
*/

ef = simulator.getEnergyConsumed(100);
eb = simulator.getEnergyProduced(100);
console.log(`E+${ef}, E-: ${eb}`);
