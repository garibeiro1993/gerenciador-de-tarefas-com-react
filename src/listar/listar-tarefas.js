import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ItensListaTarefas from './itens-lista-tarefas'
import Paginacao from './paginacao'
import Ordenacao from './ordenacao'

const ListarTarefas = () => {

  const ITENS_POR_PAG = 3

const [tarefas, setTarefas] = useState([])
const [carregarTarefas, setCarregarTarefas] = useState(true)
const [totalItems, setTotalItems] = useState(0)
const [paginaAtual, setPaginalAtual] = useState(1)
const [ordenarAsc, setOrdenarAsc] = useState(false)
const [ordenarDesc, setOrdenarDesc] = useState(false)
const [filtroTarefa, setFiltroTarefa] = useState('')

useEffect(() => {
  const obterTarefas = () => {
    const tarefasDb = localStorage['tarefas']
    let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : []
    // filtrar
    listaTarefas = listaTarefas.filter(
      t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
    )
    //ordenar
    if (ordenarAsc) {
      listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1 )
    } else if (ordenarDesc) {
      listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1 )
    }
    // paginar
    setTotalItems(listaTarefas.length)
    setTarefas(listaTarefas.splice((paginaAtual -1) * ITENS_POR_PAG, ITENS_POR_PAG))
  }

 //se nao foi carregado 
  if (carregarTarefas) { 
    obterTarefas()
    setCarregarTarefas(false)
   }
}, [carregarTarefas, paginaAtual, ordenarDesc, ordenarAsc, filtroTarefa])


const handleMudarPagina = pagina => { 
  setPaginalAtual(pagina)
  setCarregarTarefas(true)
}

const handleOrdernar = event => {
  event.preventDefault()
  if (!ordenarAsc && !ordenarDesc) {
    setOrdenarAsc(true)
    setOrdenarDesc(false)
  } else if (ordenarAsc) {
    setOrdenarAsc(false)
    setOrdenarDesc(true)
  } else {
    setOrdenarAsc(false)
    setOrdenarDesc(false)
  }
  setCarregarTarefas(true)
}

const handleFiltrar = event => {
  setFiltroTarefa(event.target.value)
  setCarregarTarefas(true)
}

  return (
    <div className='text-center'>
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid='tabela'>
        <thead>
          <tr>
            <th>
            <a href='/' onClick={handleOrdernar}>
              Tarefa
              &nbsp;
              <Ordenacao
                ordenarAsc={ordenarAsc}
                ordenarDesc={ordenarDesc} />
            </a>
            </th>
            <th>
              <A href='/cadastrar'
                className='btn btn-success btn-sm'
                data-testeid='btn-nova-tarefa'>
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;
                  Nova tarefa
                </A>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type='text'
                value={filtroTarefa}
                onChange={handleFiltrar}
                data-testid='txt-tarefa'
                className='filtro-tarefa' />
            </th>
            <th>
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas 
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas} />
        </tbody>
      </Table>
      <Paginacao
        totalItems={totalItems}
        itemsPorPagina={ITENS_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina} />
    </div>
	)
}

export default ListarTarefas