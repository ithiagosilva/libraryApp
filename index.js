let btnAddNovoLivro = document.getElementById('btnAddNovoLivro')
let formulario = document.getElementById('formulario')
let inputTitulo = document.getElementById('titulo')
let inputCapa = document.getElementById('capa')
let inputSinopse = document.getElementById('sinopse')
let inputPaginas = document.getElementById('paginas')
let inputAno = document.getElementById('ano')
let inputLido = document.getElementById('lido')
let btnAdicionar = document.getElementById('btnAdicionar')
let btnFechar = document.getElementById('btnFechar')
let livros = document.getElementById('livros')
let containerAddLivro = document.querySelector('.container-addLivro')
let pVazio = document.querySelector('.msg-vazio')
const myLibrary = [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
});

function isEmpty() {
    myLibrary.length === 0 ? pVazio.style.display = "block" : pVazio.style.display = "none"
}

function addNovoLivro() {
    document.querySelectorAll('input').forEach((item) => {
            item.style.border = "unset";
        });
    btnAddNovoLivro.style.display = "none";
    formulario.style.display = "block";
    document.getElementById('titulo-mbiblioteca').style.display = "none";
    livros.style.display = "none";
    pVazio.style.display = "none";
    document.querySelectorAll('input').forEach((input) => {
        input.value = "";
    });
    document.querySelector('textarea').value = '';
}

btnAddNovoLivro.addEventListener('click', addNovoLivro);


btnFechar.addEventListener('click', () => {
    btnAddNovoLivro.style.display = "block";
    formulario.style.display = "none";
    document.getElementById('titulo-mbiblioteca').style.display = "block";
    livros.style.display = "flex";
    isEmpty();
});

btnAdicionar.addEventListener('click', () => {
    let vTitulo = inputTitulo.value;
    let vCapa = inputCapa.value;
    if (vCapa.substring(0,8) !== 'https://') { vCapa = "./placeholder.png" }
    let vSinopse = inputSinopse.value;
    if (vSinopse === "") {
        vSinopse = 'Sem informação';
    }
    let vPaginas = inputPaginas.value;
    let vAno = inputAno.value;
    let vLido = inputLido.value;
    if (inputLido.value === "sim") {
        vLido = "Já li este livro";
    } else if (inputLido.value === "nao") {
        vLido = "Não li ainda";
    } else {
        vLido = "Estou lendo";
    }

    if (!vTitulo || !vPaginas || !vAno) {
        document.querySelectorAll('input').forEach((item) => {
            if(item.value === "" && item.name !== 'capa') {
                item.style.border = "2px solid red";
            }
        });
    } else {
        document.getElementById('titulo-mbiblioteca').style.display = "block";
        btnAddNovoLivro.style.display = "block";
        formulario.style.display = "none";
        addBooktoLibrary(vTitulo, vCapa, vSinopse, vPaginas, vAno, vLido);
        criarCard(myLibrary);
        livros.style.display = "flex";
        salvarLivros();
    }       
});

function Book(titulo, capa, sinopse, paginas, ano, lido) {
    this.titulo = titulo,
    this.capa = capa, 
    this.sinopse = sinopse,
    this.paginas = paginas,
    this.ano = ano,
    this.lido = lido
};

function addBooktoLibrary(vTitulo, vCapa, vSinopse, vPaginas, vAno, vLido) {
    const livro = new Book(vTitulo, vCapa, vSinopse, vPaginas, vAno, vLido);
    myLibrary.push(livro);
}
 
function criarCard(lista) {
    livros.innerHTML = "";
    for(let i = 0; i < lista.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("class", "card")

        let h1Titulo = document.createElement('h1');
        h1Titulo.setAttribute('class', 'titulo-livro')
        h1Titulo.innerText = lista[i].titulo;

        let imgCapa = document.createElement('img');
        imgCapa.setAttribute('src', `${lista[i].capa}`);
        let divImg = document.createElement('div');
        divImg.setAttribute('class', 'container-img');
        divImg.appendChild(imgCapa);

        let pSinopse = document.createElement('p');
        pSinopse.innerText = lista[i].sinopse;

        let smallPagina = document.createElement('small');
        smallPagina.innerHTML = 'Páginas: ' + lista[i].paginas + '<br>';

        let smallAno = document.createElement('small');
        smallAno.innerHTML = 'Ano: ' + lista[i].ano + '<br><br>';

        let btnLido = document.createElement('button');
        btnLido.setAttribute('class', 'btn-status-leitura');
        btnLido.innerText = `${lista[i].lido}`
        if(btnLido.innerText === "Estou lendo") {
            btnLido.classList.add('lendo')
            btnLido.classList.remove('nao-lido')
            btnLido.classList.remove('lido')
        } else if (btnLido.innerText === "Não li ainda") {
            btnLido.classList.add('nao-lido')
            btnLido.classList.remove('lido')
            btnLido.classList.remove('lendo')
        } else {
            btnLido.classList.add('lido')
            btnLido.classList.remove('nao-lido')
            btnLido.classList.remove('lendo')
        }
        btnLido.addEventListener('click', () => {
            if(btnLido.classList[1] === 'lido') {
                btnLido.innerText = "Não li ainda"
                myLibrary[i].lido = btnLido.innerText
                btnLido.classList.remove('lido')
                btnLido.classList.add('nao-lido')
                salvarLivros();
            } else if (btnLido.classList[1] === 'nao-lido') {
                btnLido.innerText = "Estou lendo"
                myLibrary[i].lido = btnLido.innerText
                btnLido.classList.remove('nao-lido')
                btnLido.classList.add('lendo')
                salvarLivros();
            } else {
                btnLido.innerText = "Já li este livro"
                myLibrary[i].lido = btnLido.innerText
                btnLido.classList.remove('lendo')
                btnLido.classList.add('lido')
                salvarLivros();
            }

        });
        
        let btnDel = document.createElement('button');
        btnDel.setAttribute('class', 'btn-del');
        btnDel.innerHTML = `<svg height="20" width="20" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 512 512"  xml:space="preserve">
                        <style type="text/css">
                            .st0{fill:#959595;}
                        </style>
                        <g>
                            <path class="st0" d="M88.594,464.731C90.958,491.486,113.368,512,140.234,512h231.523c26.858,0,49.276-20.514,51.641-47.269
                                l25.642-335.928H62.952L88.594,464.731z M420.847,154.93l-23.474,307.496c-1.182,13.37-12.195,23.448-25.616,23.448H140.234
                                c-13.42,0-24.434-10.078-25.591-23.132L91.145,154.93H420.847z"/>
                            <path class="st0" d="M182.954,435.339c5.877-0.349,10.35-5.4,9.992-11.269l-10.137-202.234c-0.358-5.876-5.401-10.349-11.278-9.992
                                c-5.877,0.357-10.35,5.409-9.993,11.277l10.137,202.234C172.033,431.231,177.085,435.696,182.954,435.339z"/>
                            <path class="st0" d="M256,435.364c5.885,0,10.656-4.763,10.656-10.648V222.474c0-5.885-4.771-10.648-10.656-10.648
                                c-5.885,0-10.657,4.763-10.657,10.648v202.242C245.344,430.601,250.115,435.364,256,435.364z"/>
                            <path class="st0" d="M329.046,435.339c5.878,0.357,10.921-4.108,11.278-9.984l10.129-202.234c0.348-5.868-4.116-10.92-9.993-11.277
                                c-5.877-0.357-10.92,4.116-11.277,9.992L319.054,424.07C318.697,429.938,323.17,434.99,329.046,435.339z"/>
                            <path class="st0" d="M439.115,64.517c0,0-34.078-5.664-43.34-8.479c-8.301-2.526-80.795-13.566-80.795-13.566l-2.722-19.297
                                C310.388,9.857,299.484,0,286.642,0h-30.651H225.34c-12.825,0-23.728,9.857-25.616,23.175l-2.721,19.297
                                c0,0-72.469,11.039-80.778,13.566c-9.261,2.815-43.357,8.479-43.357,8.479C62.544,67.365,55.332,77.172,55.332,88.38v21.926h200.66
                                h200.676V88.38C456.668,77.172,449.456,67.365,439.115,64.517z M276.318,38.824h-40.636c-3.606,0-6.532-2.925-6.532-6.532
                                s2.926-6.532,6.532-6.532h40.636c3.606,0,6.532,2.925,6.532,6.532S279.924,38.824,276.318,38.824z"/>
                        </g>
                        </svg>`;
                
        li.appendChild(btnDel); 
        li.appendChild(h1Titulo);
        li.appendChild(divImg);
        li.appendChild(pSinopse);
        li.appendChild(smallPagina);
        li.appendChild(smallAno);
        li.appendChild(btnLido);
        livros.appendChild(li);

        btnDel.addEventListener('click', () => {
            livros.removeChild(li);
            myLibrary.splice(i, 1);
            salvarLivros();
            isEmpty();
        });
    }

}

var listaDeLivrosSalvos = [];
var listaJSON = [];
function salvarLivros() {
    listaJSON = JSON.stringify(myLibrary);
    let localSet = localStorage.setItem('livros', listaJSON);
    listaDeLivrosSalvos.push(localSet);
}

var listaJSONconv = [];
function exibirLivrosSalvos() {
    let localGet = localStorage.getItem('livros');
    listaJSONconv = JSON.parse(localGet);
    for (let i = 0; i < listaJSONconv.length; i++) {
        addBooktoLibrary(listaJSONconv[i].titulo, listaJSONconv[i].capa, listaJSONconv[i].sinopse, listaJSONconv[i].paginas, listaJSONconv[i].ano, listaJSONconv[i].lido);

    }
    criarCard(listaJSONconv);
}

if (localStorage.getItem('livros')) {
    exibirLivrosSalvos();
}

isEmpty();

