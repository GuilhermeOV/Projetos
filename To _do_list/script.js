document.addEventListener('DOMContentLoaded', function() {
    const add = document.getElementById('add');
    const remove = document.getElementById('remove');
    const edit = document.getElementById('edit');
    const finish = document.getElementById('finish');
    const newtarefa = document.getElementById('ler-tarefa');
    const tarefas = document.getElementById('main');
    const buttons = document.getElementById('buttons');
    const enviar = document.createElement('input');
                enviar.type = 'submit';
    let paginaAtual = 1;
    let numeroTotalPaginas = 1;
    let box = 0;

    document.getElementById('formulario').addEventListener('submit',function(e){
        if ((e.submitter===remove) || (e.submitter===edit) ||(e.submitter===finish))
            e.preventDefault();
    })

    function verificarAltura(Pagina) {
        const altura = tarefas.clientHeight;
        const alturaScroll = Pagina.scrollHeight;
        return alturaScroll > altura;
    }

    function CriarNovaPagina(NumeroDaPagina) {
        const Pagina = document.createElement('div');
        Pagina.id = `Pagina-${NumeroDaPagina}`;
        Pagina.className = 'Pagina';
        Pagina.style.display = 'none';
        tarefas.appendChild(Pagina);
        
        const botoes = document.createElement('button');
        botoes.textContent = NumeroDaPagina;
        botoes.id = `Botoes-${NumeroDaPagina}`;
        buttons.appendChild(botoes);
        botoes.addEventListener('click', function(e) {
            e.preventDefault();
            const numeroPagina = parseInt(this.textContent);
            NavegarParaPagina(numeroPagina);
        });
    
        // Verifica se há tarefas suficientes para criar a próxima página
        if (NumeroDaPagina < numeroTotalPaginas) {
            const proximaPaginaElementos = document.getElementById(`Pagina-${NumeroDaPagina + 1}`);
            if (!proximaPaginaElementos.querySelector('.tarefas')) {
                proximaPaginaElementos.remove(); // Remove a próxima página se estiver vazia
                const proximoBotao = document.getElementById(`Botoes-${NumeroDaPagina + 1}`);
                proximoBotao.remove(); // Remove o botão da próxima página
            }
        }
    
        return Pagina;
    }
    

    function NavegarParaPagina(NumeroDaPagina) {
        const Paginas = document.querySelectorAll('.Pagina');
        Paginas.forEach(Pagina => {
            Pagina.style.display = 'none';
        });
        const PaginaAtualElementos = document.getElementById(`Pagina-${NumeroDaPagina}`);
        if (PaginaAtualElementos) {
            PaginaAtualElementos.style.display = 'block';
            paginaAtual = NumeroDaPagina;
        } else {
            CriarNovaPagina(NumeroDaPagina);
            NavegarParaPagina(NumeroDaPagina);
        }
    }

    CriarNovaPagina(1);
    NavegarParaPagina(1);

    function excluirTarefa(tarefa) {
        const paginaAtualElementos = document.getElementById(`Pagina-${paginaAtual}`);
        tarefa.parentElement.remove(); // Remove a tarefa da página atual
    
        // Move as tarefas restantes das páginas seguintes para o final da página anterior
        const paginasSeguintes = document.querySelectorAll(`.Pagina`);
        for (let i = paginaAtual + 1; i <= paginasSeguintes.length; i++) {
            const proximaPaginaElementos = document.getElementById(`Pagina-${i}`);
            if (!proximaPaginaElementos) break; // Se não houver próxima página, sai do loop
    
            const tarefasProximaPagina = proximaPaginaElementos.querySelectorAll('.tarefas');
            if (tarefasProximaPagina.length > 0) {
                const primeiraTarefaProximaPagina = tarefasProximaPagina[0];
                paginaAtualElementos.appendChild(primeiraTarefaProximaPagina);
            } else {
                const proximoBotao = document.getElementById(`Botoes-${i}`);
                proximaPaginaElementos.remove();
                proximoBotao.remove(); // Remove o botão da próxima página
            }
        }
    
        // Verifica se a página seguinte está vazia após o movimento de tarefas
        const proximaPaginaElementos = document.getElementById(`Pagina-${paginaAtual + 1}`);
        if (proximaPaginaElementos) {
            const tarefasProximaPagina = proximaPaginaElementos.querySelectorAll('.tarefas');
            if (tarefasProximaPagina.length === 0) {
                const proximoBotao = document.getElementById(`Botoes-${paginaAtual + 1}`);
                proximaPaginaElementos.remove();
                proximoBotao.remove(); // Remove o botão da próxima página
            }
        }
    
        // Atualiza a paginação
        numeroTotalPaginas = document.querySelectorAll('.Pagina').length;
        if (paginaAtual > numeroTotalPaginas) {
            paginaAtual--;
        }
        NavegarParaPagina(paginaAtual);
    }
    
    

    function selecionarcheckbox(event) {
        const checkbox = event.target;
        const paragrafo = checkbox.nextElementSibling;
        const divselec = checkbox.parentElement;

        if (checkbox.checked) {
            divselec.style.backgroundColor = "rgba(200, 255, 0, 0.274)";
        } else {
            divselec.style.backgroundColor = "";
        }

        remove.addEventListener('click', function(e) {
            e.preventDefault();
            const tarefasSelecionadas = document.querySelectorAll('input[type="checkbox"]:checked');
    tarefasSelecionadas.forEach(tarefa => {
        excluirTarefa(tarefa);
    })
        });

        edit.addEventListener('click', function(a) {
            a.preventDefault();
            const verificarcheckbox = document.querySelectorAll('input[type="checkbox"]');
            let quantidade = 0;
            verificarcheckbox.forEach(function(e) {
                if (e.checked) {
                    quantidade++;
                }
            });
            if (quantidade > 1) {
                alert("Selecione apenas uma tarefa para ser editada");
            } else if (checkbox.checked) {
                
                header = document.querySelector('header');
                header.appendChild(enviar);
                newtarefa.value = paragrafo.textContent;

                enviar.addEventListener('click',function(e){
                    e.preventDefault();
                    paragrafo.textContent = newtarefa.value;
                    header.removeChild(enviar);
                    
                })
    
            }
        });

        finish.addEventListener('click', function(e) {
            e.preventDefault();
            if (checkbox.checked) {
                const fin = document.createElement('del');
                fin.textContent = paragrafo.textContent;
                paragrafo.textContent = '';
                paragrafo.appendChild(fin);
            }
        });
    }

    add.addEventListener('click', function(e) {
        e.preventDefault();
        const div = document.createElement('div');
        div.className = 'tarefas';

        const check = document.createElement('input');
        check.type = 'checkbox';
        box++;
        check.id = `check${box}`;
        const tarefa = document.createElement('p');
        tarefa.textContent = newtarefa.value;
        tarefa.id = `tarefa${box}`;
        div.appendChild(check);
        div.appendChild(tarefa);

        check.addEventListener('click', selecionarcheckbox);

        let ultimaPagina = document.getElementById(`Pagina-${numeroTotalPaginas}`);

        if (verificarAltura(ultimaPagina)) {
            numeroTotalPaginas++;
            ultimaPagina = CriarNovaPagina(numeroTotalPaginas);
        }

        ultimaPagina.appendChild(div);

        newtarefa.value = '';
    });
});
