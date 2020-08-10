'use strict';

const Point = require('../models/point/index');

function addAeroportos(qtdLinhas, qtdColunas, qtdAeroportos, map) {
    
    while (qtdAeroportos > 0) {
        let linhaAleatoria = Math.floor(Math.random() * qtdLinhas);
        let colunaAleatoria = Math.floor(Math.random() * qtdColunas);
        let point = map[linhaAleatoria][colunaAleatoria];
        if (point.tipo === Point.VAZIO) {
            point.tipo = Point.AEROPORTO;
            qtdAeroportos--;
        }
    }
    return map;
}

function addAeroportosExact(x, y, map) {
    let point = map[x][y];
    if(point.tipo === Point.VAZIO) {
        point.tipo = Point.AEROPORTO;
    }

    return map;
}

module.exports = { addAeroportos, addAeroportosExact };
