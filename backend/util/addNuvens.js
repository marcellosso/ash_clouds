'use strict';

const Point = require('../models/point/index');

function addNuvens(qtdLinhas, qtdColunas, qtdNuvens, map) {
    while (qtdNuvens > 0) {
        let linhaAleatoria = Math.floor(Math.random() * qtdLinhas);
        let colunaAleatoria = Math.floor(Math.random() * qtdColunas);
        let point = map[linhaAleatoria][colunaAleatoria];
        if (point.tipo === Point.VAZIO) {
            point.tipo = Point.NUVEM;
            qtdNuvens--;
        }
    }
    return map;
}

function addNuvensExact(x, y, map) {
    let point = map[x][y];
    if(point.tipo === Point.VAZIO) {
        point.tipo = Point.NUVEM;
    }

    return map;
}

module.exports = { addNuvens, addNuvensExact };
