document.addEventListener('DOMContentLoaded', function() {
    const cor = document.getElementById('cor');  // Obter o input de cor
    const imagem = document.getElementById('imagem');  // Obter o input de imagem
    const body = document.querySelector('body');  // Obter o body do documento
    const lertitulo = document.getElementById('ler-titulo');  // Obter o input de título
    const submit = document.getElementById('submit');  // Obter o botão de submit
    const reset = document.getElementById('reset');  // Obter o botão de reset
    const span = document.querySelector('span');  // Obter o span que mostra a cor selecionada
    const formulario = document.querySelector('form');  // Obter o formulário
    const conteiner = document.getElementById('conteiner');  // Obter o contêiner para a imagem e título
    const image = document.getElementById('image');  // Obter a div de imagem dentro do contêiner
    const back = document.getElementById('back');
    let imageSrc = null;  // Variável para armazenar o caminho da imagem selecionada
    let backgroundColor = null;  // Variável para armazenar a cor de fundo

    // Atualizar a cor do span e armazenar a cor selecionada
    cor.addEventListener('input', function() {
        span.style.backgroundColor = cor.value;
        span.textContent = "";
        backgroundColor = cor.value;
    });

    // Manusear o evento de submit do formulário
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        if (imageSrc && backgroundColor) {
            const titulo = document.createElement('h1');  // Criar um elemento h1 para o título
            titulo.textContent = lertitulo.value;
            body.style.backgroundColor = backgroundColor;  // Alterar a cor de fundo do body
            const addimagem = document.createElement('img');  // Criar um elemento img para a imagem
            addimagem.src = imageSrc;
            addimagem.alt = 'Imagem selecionada';

            // Limpar o conteúdo anterior da div image
            image.innerHTML = '';
            image.appendChild(titulo);
            image.appendChild(addimagem);

            conteiner.classList.remove('hiden');  // Mostrar o contêiner
            formulario.classList.add('hiden');  // Esconder o formulário
        }
    });

    // Manusear o evento de reset do formulário
    function resetar(){
        image.innerHTML = '';
        body.style.backgroundColor = '';
        imageSrc= null;
        formulario.classList.remove('hiden');
        conteiner.classList.add('hiden')
        span.style.backgroundColor = ''
        lertitulo.value = '';
    }
    reset.addEventListener('click', function() {
        image.innerHTML = '';  // Limpar o conteúdo da div image
        body.style.backgroundColor = '';  // Resetar a cor de fundo do body
        imageSrc = null;  // Resetar a variável de caminho da imagem
        formulario.classList.remove('hiden');  // Mostrar o formulário
        conteiner.classList.add('hiden');  // Esconder o contêiner
    });
    
    // Manusear o evento de mudança de arquivo do input de imagem
    imagem.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageSrc = e.target.result;  // Armazenar o caminho da imagem
            };
            reader.readAsDataURL(file);
        }
    });

    back.addEventListener('click',function(){
        resetar();
    })
});
