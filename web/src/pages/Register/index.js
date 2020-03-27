import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import LogoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Register() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const newOng = {
            name,
            email,
            whatsapp,
            city,
            state
        };

        try {
            const response = await api.post('ongs', newOng);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //retorna para a tela de logon
        } catch (error) {
            alert('Erro ao tentar cadastrar a sua ONG. Tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={LogoImg} alt="Be The Heroes" />
                    <h1>Cadastro</h1>

                    <p>
                        Faça seu cadastro, entre na plataforma e ajude
                        pessoas a encontrarem os casos da sua ONG.
                    </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já tenho cadastro
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type="text"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input
                            type="text"
                            placeholder="UF"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            style={{ width: 80 }} />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>



                </form>
            </div>




        </div>
    );
}