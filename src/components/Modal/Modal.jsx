import './Modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal({ conteudo, close }) {
  return (
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={close}>
          <FiX size={23} color='#FFFFFF' />
          Voltar
        </button>

        <div>
          <h2>Recibo do pedido</h2>

          <div className='row'>
            <span>
              Cliente: {conteudo.nome}
            </span>
          </div>

          <div className='row'>
            <span>
              Telefone: {conteudo.telefone}
            </span>
          </div>

          <div className='row'>
            <span>
              Opção escolhida: {conteudo.opcao}
            </span>
          </div>

          <div className='row'>
            <span>
              Entrega: {conteudo.delivery === 'Entrega' ? 'R$ 5,00' : 'R$ 0,00'}
            </span>
          </div>

          <div className='row'>
            <span>
              Total: R$ {conteudo.total},00
            </span>
          </div>

          {conteudo.info && conteudo.info !== '' && (
            <>
              <h3>Complemento:</h3>
              <p>
                {conteudo.info}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}