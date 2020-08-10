'use scrict';
class Grid {

    constructor(
        linhas,
        colunas,
        primeiroDia,
        ultimoDia,
        mapa
    ) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.primeiroDia = primeiroDia;
        this.ultimoDia = ultimoDia;
        this.mapa = mapa;
    }
}

module.exports = Grid;
