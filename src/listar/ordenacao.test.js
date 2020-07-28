import React from 'react'
import ReactDOM from 'react-dom'
import Ordenacao from './ordenacao'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { faItalic } from '@fortawesome/free-solid-svg-icons'

describe('Teste do componente de ordenação', () => {

  it('Deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Ordenacao
        ordenarAsc={false}
        ordenarDesc={false} />, div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('deve exibir a ordenacao padrao', () => {
    const { getByTestId } = render(
      <Ordenacao ordenarAsc={false} ordenarDesc={false} />
    )
    expect(getByTestId('faSort')).not.toHaveClass('hidden')
    expect(getByTestId('faSortUp')).toHaveClass('hidden')
    expect(getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir a ordenacao ASC', () => {
    const { getByTestId } = render(
      <Ordenacao ordenarAsc={true} ordenarDesc={false} />
    )
    expect(getByTestId('faSortUp')).not.toHaveClass('hidden')
    expect(getByTestId('faSort')).toHaveClass('hidden')
    expect(getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir a ordenacao DESC', () => {
    const { getByTestId } = render(
      <Ordenacao ordenarAsc={false} ordenarDesc={true} />
    )
    expect(getByTestId('faSortDown')).not.toHaveClass('hidden')
    expect(getByTestId('faSortUp')).toHaveClass('hidden')
    expect(getByTestId('faSort')).toHaveClass('hidden')
  })
})
