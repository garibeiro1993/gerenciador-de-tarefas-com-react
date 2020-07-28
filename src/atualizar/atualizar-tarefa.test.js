import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';

describe('Teste do componente de atualização de tarefas', () => {

    it('deve renderizar o componente de atualização de tarefas', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefa id={1}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

});