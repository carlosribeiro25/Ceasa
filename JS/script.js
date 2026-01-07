  const STORAGE_KEY = 'controle_compras';

    document.addEventListener('DOMContentLoaded', () => {
      const dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

      document.querySelectorAll('tr[data-id]').forEach(linha => {
        const id = linha.dataset.id;

        const d1 = linha.querySelector('.qtd-input');
        const d2 = linha.querySelector('.qtd-input2');
        const checkbox = linha.querySelector('.check-recebido');

        if (dados[id]) {
          d1.value = dados[id].d1 ?? '';
          d2.value = dados[id].d2 ?? '';
          checkbox.checked = dados[id].recebido ?? false;
        }

        atualizarCor(linha, checkbox.checked);
      });

      atualizarStatus();
    });

    document.addEventListener('input', salvarDados);
    document.addEventListener('change', salvarDados);

    function salvarDados() {
      const dados = {};

      document.querySelectorAll('tr[data-id]').forEach(linha => {
        const id = linha.dataset.id;

        dados[id] = {
          d1: linha.querySelector('.qtd-input').value,
          d2: linha.querySelector('.qtd-input2').value,
          recebido: linha.querySelector('.check-recebido').checked
        };

        atualizarCor(linha, dados[id].recebido);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
      atualizarStatus();
    }

    function atualizarCor(linha, recebido) {
  const inputs = linha.querySelectorAll('.qtd-input, .qtd-input2');

  linha.classList.remove('pendente', 'recebido');
  linha.classList.add(recebido ? 'recebido' : 'pendente');

  inputs.forEach(input => {
    input.classList.toggle('input-ok', recebido);
  });
}


    function atualizarStatus() {
      const total = document.querySelectorAll('tr[data-id]').length;
      const recebidos = document.querySelectorAll('.check-recebido:checked').length;
      const pendentes = total - recebidos;

      const status = document.getElementById('status');

      if (pendentes === 0 && total > 0) {
        status.textContent = '✅ Todos os produtos foram recebidos!';
        status.className = 'status ok';
      } else {
        status.textContent = `⏳ ${pendentes} produto(s) pendente(s)`;
        status.className = 'status pendente';
      }
    }

// logica aplicada ao input date 
const dateInput = document.querySelector('.date');

  const savedDate = localStorage.getItem('selectedDate');

  if (savedDate) {
    dateInput.value = savedDate;
  }

  dateInput.addEventListener('change', () => {
    localStorage.setItem('selectedDate', dateInput.value);
  });

    document.getElementById('year').textContent = new Date().getFullYear();

