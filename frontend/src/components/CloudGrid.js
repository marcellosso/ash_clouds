import React, { useState, useEffect } from 'react';

import Grid from './Grid';
import Legenda from './Legenda';
import Modal from 'react-modal';

import api from '../services/api';

import './Styles.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
        width: '70vw',
        height: '70vh'
    }
};

export default function CloudGrid() {

    const [modalOpen, setOpen] = useState(false);
    const [linhas, setLinhas] = useState();
    const [colunas, setColunas] = useState();
    const [aero, setAero] = useState();
    const [nuvem, setNuvem] = useState();
    const [map, setMap] = useState({});
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [message, setMessage] = useState('');

    async function handleUpdateModal(e) {
        e.preventDefault();

        const response = await api.get(
            `/create/?nuvens=${nuvem}&aeroportos=${aero}&colunas=${colunas}&linhas=${linhas}`
        );

        setMap(response.data);
        //console.log(response.data);
        setOpen(false);
        setFirst();
        setLast();
    }

    async function handleNextDayClick(e) {
        e.preventDefault();

        const mapa = map.mapa;
        const firstA = map.primeiroDia;
        const lastA = map.ultimoDia;

        let pointsNuvemX = [];
        let pointsNuvemY = [];
        let pointsAeroX = [];
        let pointsAeroY = [];

        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                let temp = mapa[i][j];

                if (temp.tipo == "A") {
                    pointsAeroX.push(temp.x);
                    pointsAeroY.push(temp.y);
                } else if (temp.tipo == "N") {
                    pointsNuvemX.push(temp.x);
                    pointsNuvemY.push(temp.y);
                }
            }
        }

        // var response = '';


        const response = await api.get(
            `/nextDay/?linhas=${linhas}&colunas=${colunas}&aeroX=${pointsAeroX}&aeroY=${pointsAeroY}&nuvemX=${pointsNuvemX}&nuvemY=${pointsNuvemY}&first=${firstA}&last=${lastA}`
        );


        pointsAeroX = [];
        pointsAeroY = [];
        pointsNuvemX = [];
        pointsNuvemY = [];

        // console.log(response.data);
        setMap(response.data);
    }

    function handleSimularClick(e) {
        setFirst(map.primeiroDia);
        setLast(map.ultimoDia);

    }

    function handleModalClick() {
        setOpen(true);
    }

    function handleCloseModalClick() {
        setOpen(false);
    }

    // function handleUpdateModalClick() {
    //     setOpen(false);
    // }

    return (
        <div className="container">
            <Modal
                isOpen={modalOpen}
                onRequestClose={handleCloseModalClick}
                style={customStyles}
                contentLabel="Configs"
            >
                <form onSubmit={handleUpdateModal}>
                    <h1 style={{ textAlign: 'center' }}>Configurações</h1>
                    <div>
                        <input placeholder="Linhas"
                            value={linhas}
                            onChange={e => setLinhas(e.target.value)}
                            style={{ marginRight: 10 }}
                        />

                        <input placeholder="Colunas"
                            value={colunas}
                            onChange={e => setColunas(e.target.value)}
                        />
                    </div>

                    <div>
                        <input placeholder="Aeroportos"
                            value={aero}
                            onChange={e => setAero(e.target.value)}
                            style={{ marginRight: 10 }}
                        />

                        <input placeholder="Nuvem"
                            value={nuvem}
                            onChange={e => setNuvem(e.target.value)}
                        />
                    </div>

                    <div className="buttonContainer">
                        <button type="submit">Aplicar</button>
                    </div>
                </form>

            </Modal>
            <h1>Nuvem de Cinzas</h1>
            <h3>{message}</h3>

            <div className="subContainer">
                <h3 style={{ marginRight: '2rem' }} >Linhas {linhas}</h3>
                <h3>Colunas {colunas}</h3>
            </div>

            {map.mapa ? (

                map.mapa.map((linha, i) => {
                    const col = Object.keys(linha);
                    const key = col + i;

                    return (
                        <div key={key} className="gridRow">
                            {col.map((coluna, j) => {
                                const keyCol = col + j;

                                return (
                                    <div key={keyCol} className="gridCol">
                                        {map.mapa[i][j].tipo == 'A' ? <i className="fas fa-plane"></i> : map.mapa[i][j].tipo == 'N' ? <i className="fas fa-cloud"></i> : <i className="fas fa-sun"></i>}
                                    </div>
                                );

                            })}
                        </div>
                    )
                })
            ) : (
                    <></>
                )}

            <Legenda />
            {first ? <h3 style={{ fontFamily: 'Roboto' }}>Dias até o primeiro aeroporto ser coberto: {first}</h3> : <></>}
            {last ? <h3 style={{ fontFamily: 'Roboto' }}>Dias até o ultimo aeroporto ser coberto: {last}</h3> : <></>}
            <div className="buttonRow">
                <button type="button" onClick={handleSimularClick} >
                    Simular
                </button>
                <button type="button" onClick={handleModalClick} >
                    <i className="fas fa-cog" style={{ marginRight: 5 }}></i>
                    Config
                </button>
                <button type="button" onClick={handleNextDayClick} >
                    Próximo dia
                </button>

            </div>

        </div>
    )
}
