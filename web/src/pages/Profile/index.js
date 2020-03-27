import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';

import './styles.css';

import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function Profile() {

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('ong-incidents', {
            headers: {
                ong_id: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    ong_id: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('Erro ao deletar');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroe" />
                <span>
                    Bem vinda, {ongName}
                </span>
                <Link to="incidents/new" className="button"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>


            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p> {incident.title} </p>
                        <strong>DESCRIÇÃO:</strong>
                        <p> {incident.description} </p>
                        <strong>VALOR:</strong>
                        <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </p>
                        <button onClick={() => handleDelete(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}