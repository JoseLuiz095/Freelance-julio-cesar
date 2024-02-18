// lista de Produtos
const produtos = [
  {
    id: 'p1',
    nome: 'Tela Hexagonal',
    preco: 300,
    descricao: '',
    imagem: "../brand/produtos-carrinho-01.png"
  },
  {
    id: 'p2',
    nome: 'Tela Gradil',
    preco: 1200,
    descricao: '',
    imagem: "../brand/produtos-carrinho-02.png"
  },
  {
    id: 'p3',
    nome: 'Roldanas',
    preco: 500,
    descricao: '',
    imagem: "../brand/produtos-carrinho-03.png"
  },
  {
    id: 'p4',
    nome: 'Drywall',
    preco: 300,
    descricao: '',
    imagem: "../brand/produtos-carrinho-04.png"
  },
  {
    id: 'p5',
    nome: 'Telha Translucidas',
    preco: 1200,
    descricao: '',
    imagem: "../brand/produtos-carrinho-05.png"
  },
  {
    id: 'p6',
    nome: 'Prefil',
    preco: 500,
    descricao: '',
    imagem: "../brand/produtos-carrinho-06.png"
  },
];

// lista de vendedores

const vendedor = [
  {
    id: 'v0',
    nome: 'Selecione',
    numero:"0",
  },
  {
    id: 'v1',
    nome: 'Maria madalena',
    numero:"27998666663",
  },
  {
    id: 'v2',
    nome: 'joão conceição',
    numero:"27998666662",
  },
  {
    id: 'v0',
    nome: 'julio cesar',
    numero:"27998666666",
  },
];



function saudacao() {
  var hora = new Date().getHours();
  var saudacao;

  if (hora >= 5 && hora < 12) {
      saudacao = "Bom dia!";
  } else if (hora >= 12 && hora < 18) {
      saudacao = "Boa tarde!";
  } else {
      saudacao = "Boa noite!";
  }

  return saudacao;
}

const carrinhoItens = {};

function renderizaProduto(produto, index) {
  return `
    <div class="col-sm-4 mb-3 listaProdutos">
      <div class="card">
        <div class="card loja__item">
          <img class="card-img-top" src="${produto.imagem}" alt="">
            <div class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <small>R$${produto.preco}</small>
              <p class="card-text">${produto.descricao}</p>
              <div class="input-group mb-3">
                <input type="number" min="1" value="1" class="form-control produto-quantidade">
                <div class="input-group-append">
                  <button data-index="${index}" class="btn btn-primary btn-add">Adicionar</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  `;
}

function renderizaProdutos() {
  let html = '';
  for (let i = 0; i < produtos.length; i++) {
    html = html + renderizaProduto(produtos[i], i);
  }
  return html;
}

function renderizaItemCarrinho(produtoCarrinho) {
  return `
    <div class="card carrinho__item">
      <div class="card-body">
        <h5 class="card-title">${produtoCarrinho.nome}</h5>
        <p class="card-text">Preço unidade: R$${produtoCarrinho.preco} | Quantidade: ${produtoCarrinho.quantidade}</p>
        <p class="card-text">Valor: R$${produtoCarrinho.preco * produtoCarrinho.quantidade}</p>
        <button data-produto-id="${produtoCarrinho.id}" class="btn btn-danger btn-sm btn-remove"> Remover(-1)</button>
        <button data-produto-id="${produtoCarrinho.id}" class="btn btn-danger btn-sm btn-remove-all">Remover(Total)</button>
      </div>
    </div>
  `;
}

function renderizaCarrinho() {
  let html = '';
  for (let produtoId in carrinhoItens) {
    html = html + renderizaItemCarrinho(carrinhoItens[produtoId]);
  }

  document.querySelector('.carrinho__itens').innerHTML = html;
}

// Declaração global de vendedores
const vendedoresOptions = vendedor.map(vendedor => `<option value="${vendedor.nome}">${vendedor.nome}</option>`);

function renderCarrinhoTotal() {
  let total = 0;

  for (let produtoId in carrinhoItens) {
    total = total + (carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade);
  }

  document.querySelector('.carrinho__total').innerHTML = `
  <h6>Total: <strong>R$${total}</strong></h6>
  <div style="margin-top: 20px; border-radius: 10px; background-color: #f2f2f2; padding: 10px;">
    <label for="nomeVendedor" style="margin-right: 10px;">Nome do Vendedor:</label>
    <select id="nomeVendedor">
      ${vendedoresOptions.join('')}
    </select>
    <button id="enviarOrcamento" style="margin-top: 10px; padding: 5px 10px; border-radius: 5px; background-color: #28a745; color: #fff; border: none;">Enviar Orçamento</button>
  </div>`;

  document.getElementById('enviarOrcamento').addEventListener('click', enviarOrcamento);
}

function enviarOrcamento() {
  const nomeVendedor = document.getElementById('nomeVendedor').value;
  const total = document.querySelector('.carrinho__total strong').textContent.replace('R$', '');
  const produtosSelecionados = Object.values(carrinhoItens).map(produto => `${produto.quantidade}x ${produto.nome}`).join('%0A');
  const numeroVendedor = vendedor.find(vendedor => vendedor.nome === nomeVendedor).numero;
  const linkWhatsapp = `https://wa.me/55${numeroVendedor}?text=Olá ${saudacao()} ${nomeVendedor}, poderia me fazer um Orçamento desses produtos:${produtosSelecionados}.`;
  if (total == '0'){
    alert("Adicione pelo menos 1 item a sua lista.");
    return
  }else if (nomeVendedor =="Selecione"){
    alert("Selecione o Vendedor que deseja enviar o Orçamento.");
    return
  }

  window.open(linkWhatsapp, '_blank');
}



function adicionaItemNoCarrinho(produto, quantidade) {
  const nomeVendedor = document.getElementById('nomeVendedor').value;

  if (!carrinhoItens[produto.id]) {
    carrinhoItens[produto.id] = { ...produto, quantidade, vendedor: nomeVendedor };
  } else {
    carrinhoItens[produto.id].quantidade += quantidade; // Atualizando a quantidade
  }

  renderizaCarrinho();
  renderCarrinhoTotal();
}


// Chamar a função para renderizar o carrinho de compras
renderizaCarrinho();
// Chamar a função para renderizar o total do carrinho
renderCarrinhoTotal();


document.body
.addEventListener('click', function(event) {
  const elemento = event.target;
  
  if (elemento.classList.contains('btn-add')) {
    const index = parseInt(elemento.getAttribute('data-index'), 10);
    const produto = produtos[index];
    
    // Capturando o valor do input de quantidade
    const quantidadeInput = elemento.parentElement.previousElementSibling;
    const quantidade = parseInt(quantidadeInput.value);
    
    adicionaItemNoCarrinho(produto, quantidade); // Passando a quantidade para a função
}

  
  if (elemento.classList.contains('btn-remove')) {
    const produtoId = elemento.getAttribute('data-produto-id');
    if (carrinhoItens[produtoId].quantidade <= 1) {
      delete carrinhoItens[produtoId];
    } else {
      --carrinhoItens[produtoId].quantidade;
    }
    
    renderizaCarrinho();
    renderCarrinhoTotal();
  }
  
  if (elemento.classList.contains('btn-remove-all')) {
    const produtoId = elemento.getAttribute('data-produto-id');
    delete carrinhoItens[produtoId];
    
    renderizaCarrinho();
    renderCarrinhoTotal();
  }
});



document.querySelector('.loja').innerHTML = renderizaProdutos();
