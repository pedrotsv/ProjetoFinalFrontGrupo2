
// Envia dados para a MockAPI 
function enviarFormulario(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validação básica - verifica se os campos obrigatórios estão preenchidos
    if (!nome || !email || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Validação de email
    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }
    
    // Cria o objeto com os dados do formulário
    const dadosFormulario = {
        nome: nome,
        email: email,
        telefone: telefone,
        assunto: assunto,
        mensagem: mensagem,
        data: new Date().toISOString()
    };
    
    // Exibe mensagem no console (para fins de desenvolvimento)
    console.log('Enviando dados para a API...');
    console.log('Dados:', dadosFormulario);
    
    // Desabilita o botão de envio para evitar múltiplos cliques
    const botaoEnviar = event.target.querySelector('button[type="submit"]');
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando...';
    
    // URL da API MockAPI (corrigido para o recurso 'users')
    const apiUrl = 'https://68e04d1693207c4b47942b81.mockapi.io/clientes';
    
    // Cria o objeto com os dados do formulário, ajustando os nomes dos campos para o esquema da MockAPI
    const dadosParaAPI = {
        name: nome, // 'name' no lugar de 'nome'
        email: email,
        telefone: telefone,
        assunto: assunto,
        mensagem: mensagem,
        data: new Date().toISOString()
    };
    
    // Faz a requisição POST para a API usando fetch
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaAPI)
    })
    .then(function(response) {
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao enviar dados: ' + response.status);
        }
        // Converte a resposta para JSON
        return response.json();
    })
    .then(function(data) {
        // Sucesso - dados enviados com sucesso
        console.log('Dados enviados com sucesso!', data);
        
        // Esconde o formulário
        document.getElementById('contatoForm').style.display = 'none';
        
        // Exibe a mensagem de sucesso
        document.getElementById('successMessage').style.display = 'block';
        
        // Limpa os campos do formulário
        document.getElementById('contatoForm').reset();
        
        // Reabilita o botão de envio
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = 'Enviar Mensagem';
        
        // Após 5 segundos, esconde a mensagem de sucesso e mostra o formulário novamente
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('contatoForm').style.display = 'block';
        }, 5000);
    })
    .catch(function(error) {
        // Erro - exibe mensagem de erro
        console.error('Erro ao enviar formulário:', error);
        
        // Exibe a mensagem de erro
        document.getElementById('errorMessage').style.display = 'block';
        
        // Reabilita o botão de envio
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = 'Enviar Mensagem';
        
        // Após 5 segundos, esconde a mensagem de erro
        setTimeout(function() {
            document.getElementById('errorMessage').style.display = 'none';
        }, 5000);
    });
}

// Validação email 
function validarEmail(email) {
    // Expressão regular para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação tel 
function aplicarMascaraTelefone() {
    const campoTelefone = document.getElementById('telefone');
    
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function(event) {
            let valor = event.target.value;
            
            // Remove tudo que não é número
            valor = valor.replace(/\D/g, '');
            
            // Aplica a máscara (00) 00000-0000
            if (valor.length <= 11) {
                valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            
            event.target.value = valor;
        });
    }
}

