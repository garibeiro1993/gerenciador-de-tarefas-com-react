import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const RemoverTarefas = props => {

  const [exibirModal, setExibirModal] = useState(false)

  const handleAbrirModal = event => {
    event.preventDefault()
    setExibirModal(true)

  }

  const handleFecharModal = () => setExibirModal(false)

  const handleRemoverTarefa = event => {
    event.preventDefault()
    const tarefasDb = localStorage['tarefas']
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : []
    tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id)
    localStorage['tarefas'] = JSON.stringify(tarefas)
    setExibirModal(false)
    props.recarregarTarefas(true)
  }

  return (
    <span>
      <Button variant='danger'
        className='btn-sm'
        onClick={handleAbrirModal}
        data-testid='btn-abrir-modal'>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal}
        data-testid='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Remover tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover a seguinte tarefa?
            <br />
          <strong>{props.tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleRemoverTarefa}
            data-testid='btn-remover'>
            Sim
            </Button>
          <Button variant='light' onClick={handleFecharModal}
            data-testid='btn-fechar-modal'>
            Não
              </Button>
        </Modal.Footer>
      </Modal>
    </span>
  )

}

RemoverTarefas.propTypes = {
  tarefa: PropTypes.object.isRequired,
  recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefas