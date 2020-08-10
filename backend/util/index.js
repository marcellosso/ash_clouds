const { addAeroportos, addAeroportosExact } = require('./addAeroportos');
const { addNuvens, addNuvensExact } = require('./addNuvens');
const { criarMapa } = require('./criarMapa');
const { resolverProblema, avancarDiaExact } = require('./problema');

module.exports = { addAeroportos, addNuvens, criarMapa, resolverProblema, avancarDiaExact, addNuvensExact, addAeroportosExact };
