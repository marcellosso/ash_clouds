"use strict";

const {
  addAeroportos,
  addAeroportosExact,
  addNuvens,
  criarMapa,
  resolverProblema,
  avancarDiaExact,
  addNuvensExact
} = require("../util/index");

const Grid = require("../models/grid/index");

module.exports = function (router) {
  router.get("/create", function (req, res) {

    let {
      nuvens,
      aeroportos,
      linhas,
      colunas
    } = req.query;


    // nuvens = nuvens || Grid.minimoNuvens;
    // aeroportos = aeroportos || Grid.minimoAeroportos;
    // linhas = linhas || Grid.minimoLinhas;
    // colunas = colunas || Grid.minimoColunas;

    // console.log(linhas);

    let map = criarMapa(linhas, colunas);
    map = addAeroportos(linhas, colunas, aeroportos, map);
    map = addNuvens(linhas, colunas, nuvens, map);

    let resultados = resolverProblema(linhas, colunas, aeroportos, map);

    res.json(
      new Grid(
        linhas,
        colunas,
        resultados.primeiroDia,
        resultados.ultimoDia,
        resultados.map
      )
    );
  });

  router.get("/nextDay", function (req, res) {
    // console.log(req.query);
    // console.log(req.query.map);
    let { linhas, colunas, nuvemX, nuvemY, aeroX, aeroY, first, last } = req.query;

    let map = criarMapa(linhas, colunas);

    nuvemX = nuvemX.split(',');
    nuvemY = nuvemY.split(',');

    aeroX = aeroX.split(',');
    aeroY = aeroY.split(',');

    for(let i = 0; i < nuvemX.length; i++) {
      map = addNuvensExact(parseInt(nuvemX[i], 10), parseInt(nuvemY[i], 10), map);
    }

    
    for(let i = 0; i < aeroX.length; i++) {
      map = addAeroportosExact(parseInt(aeroX[i], 10), parseInt(aeroY[i], 10), map);
    }

    let result = avancarDiaExact(linhas, colunas, map);

    res.json(
      new Grid(
        linhas,
        colunas,
        first,
        last,
        result
      )
    )
    0
  })
};
