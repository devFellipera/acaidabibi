// ================== CONFIG ==================
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const TAXA_ENTREGA = 5;

// ================== ESCOLHER AÇAÍ ==================
function selecionar(nome, preco){
  let item = {
    nome,
    preco,
    extras: [],
    total: preco
  };

  localStorage.setItem('itemAtual', JSON.stringify(item));
  window.location.href = "extras.html";
}

// ================== SALVAR EXTRAS ==================
function irFinal(){
  let item = JSON.parse(localStorage.getItem('itemAtual'));

  let extras = [];
  let valorExtras = 0;

  document.querySelectorAll('input[type=checkbox]').forEach(c => {
    if(c.checked){
      extras.push(c.value);
      valorExtras += parseFloat(c.dataset.price || 0);
    }
  });

  item.extras = extras;
  item.total = item.preco + valorExtras;

  carrinho.push(item);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  window.location.href = "finalizar.html";
}

// ================== MOSTRAR CARRINHO ==================
function carregarCarrinho(){
  let lista = document.getElementById('lista');
  if(!lista) return;

  let total = 0;
  lista.innerHTML = '';

  carrinho.forEach((item, i) => {
    total += item.total;

    lista.innerHTML += `
      <div class="item-carrinho">
        <p><strong>${item.nome}</strong></p>
        <p>${item.extras.length ? item.extras.join(', ') : 'Sem extras'}</p>
        <p>R$ ${item.total.toFixed(2)}</p>
        <button onclick="removerItem(${i})">❌</button>
      </div>
    `;
  });

  total += TAXA_ENTREGA;

  document.getElementById('total').innerText = total.toFixed(2);
  document.getElementById('entrega').innerText = TAXA_ENTREGA.toFixed(2);
}

// ================== REMOVER ITEM ==================
function removerItem(i){
  carrinho.splice(i,1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

// ================== FINALIZAR ==================
function finalizar(){
  let nome = document.getElementById('nome').value;
  let tel = document.getElementById('telefone').value;
  let endereco = document.getElementById('endereco').value;
  let pagamento = document.getElementById('pagamento').value;

  if(!nome || !tel || !endereco){
    alert("Preencha todos os campos!");
    return;
  }

  let total = 0;
  let msg = `🧾 *AÇAÍ DA BIBI - PEDIDO*%0A%0A`;

  msg += `👤 ${nome}%0A📞 ${tel}%0A📍 ${endereco}%0A%0A`;

  carrinho.forEach(item => {
    msg += `🍇 ${item.nome}%0A`;
    item.extras.forEach(e => msg += `+ ${e}%0A`);
    msg += `R$ ${item.total.toFixed(2)}%0A%0A`;
    total += item.total;
  });

  total += TAXA_ENTREGA;

  msg += `🚚 Taxa de entrega: R$ ${TAXA_ENTREGA.toFixed(2)}%0A`;
  msg += `💰 Total: R$ ${total.toFixed(2)}%0A`;
  msg += `💳 ${pagamento}`;

  let url = `https://wa.me/5511954314043?text=${msg}`;
  window.open(url, '_blank');
}

// ================== VOLTAR ==================
function voltar(){
  window.history.back();
}

// ================== CANCELAR PEDIDO ==================
function cancelarPedido(){
  localStorage.removeItem('carrinho');
  localStorage.removeItem('itemAtual');
  window.location.href = "index.html";
}

// ================== TOGGLE BOX ==================
function toggle(id){
  let el = document.getElementById(id);
  el.classList.toggle('hidden');
}

// ================== SLIDER ==================
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let index = 0;

function mostrarSlide(i){
  if(slides.length === 0) return;

  slides.forEach(s => s.classList.remove('active'));
  if(dots.length) dots.forEach(d => d.classList.remove('active'));

  slides[i].classList.add('active');
  if(dots.length) dots[i].classList.add('active');
}

function trocarSlide(){
  if(slides.length === 0) return;

  index = (index + 1) % slides.length;
  mostrarSlide(index);
}

function irSlide(i){
  index = i;
  mostrarSlide(index);
}

// AUTO SLIDE
setInterval(trocarSlide, 2000);