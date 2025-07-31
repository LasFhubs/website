// Carrega os scripts do JSON
async function loadScripts() {
  const res = await fetch('data/scripts.json');
  const data = await res.json();
  renderCards(data);
  document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('pt-BR');
}

function renderCards(list) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <button onclick="copyScript('${item.id}')">Copiar Script</button>
    `;
    container.appendChild(card);
  });
}

// Copia o código para a área de transferência
async function copyScript(id) {
  const res = await fetch('data/scripts.json');
  const data = await res.json();
  const script = data.find(s => s.id === id)?.code || '';
  await navigator.clipboard.writeText(script);
  alert('Script copiado!');
}

// Alternância dark/light
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

loadScripts();
