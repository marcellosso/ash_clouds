"use strict";

const Point = require("../models/point/Point");

function resolverProblema(linhas, colunas, aeroportos, map) {
  let totalAeroportosAbertos = aeroportos;
  let primeiroDia = 0;
  let ultimoDia = 0;
  let dias = 0;
  let newMap = JSON.parse(JSON.stringify(map)); //

  while (totalAeroportosAbertos > 0) {

    avancarDia(linhas, colunas, newMap);

    totalAeroportosAbertos = getTotalAeroportosAbertos(linhas, colunas, newMap);
    // console.log(totalAeroportosAbertos);
    // console.log('----------');
    // console.log(dias);
    dias++;


    //console.log(totalAeroportosAbertos + " - " + aeroportos);
    if (totalAeroportosAbertos != aeroportos && primeiroDia <= 0) {

      primeiroDia = dias;
    } else if (totalAeroportosAbertos === 0) {
      ultimoDia = dias;
    }
    
  }

  if (ultimoDia === 0 && primeiroDia > 0) {
    ultimoDia = primeiroDia;
  }

  return { primeiroDia, ultimoDia, map };
}

function avancarDia(linhas, colunas, map) {

  console.log(linhas);
  console.log(colunas);
  console.log(map);
  var points = [];
 // let size = Object.keys(map[0]).length;

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      let point = map[i][j];
      if (point && point.tipo === Point.NUVEM) {
        //console.log(point);
        // moverNuvem(linhas, colunas, map, point);
        points.push(point);
      }
    }
  }

  //console.log(points);

  points.forEach(point => {
    moverNuvem(linhas, colunas, map, point);
  });



  points = [];

}

function avancarDiaExact(linhas, colunas, map) {

  var points = [];

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      let point = map[i][j];
      if (point && point.tipo === Point.NUVEM) {

        points.push(point);
      }
    }
  }

  //console.log(points);

  points.forEach(point => {
    moverNuvem(linhas, colunas, map, point);
  });



  points = [];
  return map;
}

function moverNuvem(linhas, colunas, map, point) {
  moverParaCima(linhas, colunas, map, point);
  moverParaDireita(linhas, colunas, map, point);
  moverParaBaixo(linhas, colunas, map, point);
  moverParaEsquerda(linhas, colunas, map, point);
}

function moverParaCima(linhas, colunas, map, point) {
  let x = point.x + 1;
  // console.log(map[x]);
  if (map[x]) {
    let newPoint = map[x][point.y];
    if (x >= 0 && newPoint.tipo !== Point.NUVEM) {
      let novaNuvem = new Point(x, point.y, Point.NUVEM);
      map[x][point.y] = novaNuvem;
    }
  }
}

function moverParaDireita(linhas, colunas, map, point) {
  let y = point.y + 1;
  if (map[point.x][y]) {
    let newPoint = map[point.x][y];
    if (y <= colunas && newPoint.tipo !== Point.NUVEM) {
      let novaNuvem = new Point(point.x, y, Point.NUVEM);
      map[point.x][y] = novaNuvem;
    }
  }
}

function moverParaBaixo(linhas, colunas, map, point) {
  let x = point.x - 1;
  if (map[x]) {
    let newPoint = map[x][point.y];
    if (x <= linhas && newPoint.tipo !== Point.NUVEM) {
      let novaNuvem = new Point(x, point.y, Point.NUVEM);
      map[x][point.y] = novaNuvem;
    }
  }
}

function moverParaEsquerda(linhas, colunas, map, point) {
  let y = point.y - 1;
  if (map[point.x][y]) {
    let newPoint = map[point.x][y];
    if (y <= colunas && newPoint.tipo !== Point.NUVEM) {
      let novaNuvem = new Point(point.x, y, Point.NUVEM);
      map[point.x][y] = novaNuvem;
    }
  }
}

function getTotalAeroportosAbertos(linhas, colunas, map) {
  let total = 0;
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      let point = map[i][j];
      if (point && point.tipo === Point.AEROPORTO) {
        total++;
      }
    }
  }
  return total;
  
}

module.exports = { resolverProblema, avancarDiaExact };
