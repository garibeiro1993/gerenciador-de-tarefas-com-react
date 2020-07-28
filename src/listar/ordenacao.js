import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const Ordenacao = props => {

  const handleAscDesc = () => props.ordenarAsc || props.ordenarDesc ? 'hidden' : ''
  const handleAsc = () => props.ordenarAsc ? '' : 'hidden'
  const handleDesc = () => props.ordenarDesc ? '' : 'hidden'

  return (
    <span>
      <FontAwesomeIcon
        icon={faSort}
        className={handleAscDesc()}
        data-testid='faSort' />
      <FontAwesomeIcon
        icon={faSortUp}
        className={handleAsc()}
        data-testid='faSortUp' />
      <FontAwesomeIcon
        icon={faSortDown}
        className={handleDesc()}
        data-testid='faSortDown' />
    </span>
  )

}

Ordenacao.propTypes = {
  ordenarAsc: PropTypes.bool.isRequired,
  ordenarDesc: PropTypes.bool.isRequired
}

export default Ordenacao