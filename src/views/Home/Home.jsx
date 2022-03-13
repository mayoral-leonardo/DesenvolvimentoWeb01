import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Home.css';
import Modal from '../../components/Modal/Modal';
import Clock from '../../components/Clock/Clock';

export default function Home() {
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [opcao, setOpcao] = useState('');
  const [delivery, setDelivery] = useState('Retirada');
  const [info, setInfo] = useState();
  const [total, setTotal] = useState();
  const [pedido, setPedido] = useState({ nome: '', telefone: '', opcao: '', delivery: '', info: '', total: 0 });

  function totalCalculation() {
    let total = 0;
    let valorPrato = 0;
    let valorEntrega = 0;

    if (opcao === 'Prato do dia + Suco - R$ 20,00') valorPrato = 20;
    if (opcao === 'Prato do dia + Refrigerante - R$ 22,00') valorPrato = 22;
    if (opcao === 'Prato do dia - R$ 16,00') valorPrato = 16;
    if (opcao === '') valorPrato = 0;

    if (delivery === 'Entrega') valorEntrega = 5;
    if (delivery === 'Retirada') valorEntrega = 0;

    if (valorPrato !== 0) {
      total = valorPrato + valorEntrega;
    } else total = 0;
    setTotal(total);
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!nome || nome === '') throw new Error('Digite seu nome!');
      if (!telefone || telefone === '') throw new Error('Digite seu telefone!');
      if (!opcao || opcao === '') throw new Error('Selecione uma opção!');
      setPedido({
        nome: nome,
        telefone: telefone,
        opcao: opcao,
        delivery: delivery,
        info: info,
        total: total
      });
      toast.success('Pedido registrado com sucesso!');
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    totalCalculation();
  }, [opcao, delivery]);

  function resetFields() {
    setNome('');
    setTelefone('');
    setDelivery('');
    setOpcao('');
    setInfo('');
    setTotal(0);

    setPedido({
      nome: '',
      telefone: '',
      opcao: '',
      delivery: '',
      info: '',
      total: 0
    });
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  return (
    <div className='home-container-center'>
      <div className='main-content-container'>
        <div className='main-content-container-header'>
          <h1>Restaurante Shapiusky</h1>
          <Clock />
        </div>

        <form onSubmit={handleSubmit}>

          <div className='main-content-container-grid'>
            <div className='main-content-container-grid-item'>
              <div className='input-container'>
                <label className='input-container-label'>Nome: </label>
                <input type="text" name='Nome' value={nome} onChange={(value) => setNome(value.target.value)} />
              </div>
            </div>

            <div className='main-content-container-grid-item'>
              <div className='input-container'>
                <label className='input-container-label'>Telefone: </label>
                <input type="text" name='Telefone' placeholder='(xx) 00000-0000' value={telefone} onChange={(value) => setTelefone(value.target.value)} />
              </div>
            </div>

            <div className='main-content-container-grid-item'>
              <div className='input-container'>
                <label className='input-container-label'>Opções: </label>
                <select value={opcao} onChange={(value) => setOpcao(value.target.value)}>
                  <option value=''></option>
                  <option value='Prato do dia + Suco - R$ 20,00'>Prato do dia + Suco - R$ 20,00</option>
                  <option value='Prato do dia + Refrigerante - R$ 22,00'>Prato do dia + Refrigerante - R$ 22,00</option>
                  <option value='Prato do dia - R$ 16,00'>Prato do dia - R$ 16,00</option>
                </select>
              </div>
            </div>

            <div className='main-content-container-grid-item'>
              <div className='input-container'>
                <label className='input-container-label'>Delivery? </label>
                <select value={delivery} onChange={(value) => setDelivery(value.target.value)}>
                  <option value='Retirada'>Retirada no balcão</option>
                  <option value='Entrega'>Sim (Taxa de R$ 5,00)</option>
                </select>
              </div>
            </div>
          </div>

          <div className='main-content-container-additional-infos'>
            <label>Complemento</label>
            <textarea value={info} onChange={(value) => setInfo(value.target.value)}
              type='text'
              placeholder='Exemplo: sem tomate, cebola, etc'
            />
          </div>

          <div className='main-content-container-total'>
            <label>Total do pedido: </label>
            <span>{total && total !== 0 ? `R$ ${total},00` : 'R$ 00,00'}</span>
          </div>

          <div className='main-content-container-buttons'>
            <button className='submit-button' type='submit'>Confirmar Pedido</button>
          </div>
        </form>
        <div className='responsive-buttons'>
          <div className='main-content-container-buttons'>
            <button className='buttons' onClick={() => togglePostModal(pedido)}>Recibo</button>
          </div>
          <div className='main-content-container-buttons'>
            <button className='buttons' onClick={() => resetFields()}>Novo pedido</button>
          </div>
        </div>
      </div>
      {showPostModal && (
        <Modal
          conteudo={detail}
          close={togglePostModal}
        />
      )}
    </div>
  );

}