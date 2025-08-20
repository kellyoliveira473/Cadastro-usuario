document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const productsSection = document.getElementById('products-section');
    const cartSection = document.getElementById('cart-section');

    function showSection(section) {
        loginSection.classList.add('hidden');
        registerSection.classList.add('hidden');
        productsSection.classList.add('hidden');
        cartSection.classList.add('hidden');

        if(section === 'login') loginSection.classList.remove('hidden');
        if(section === 'register') registerSection.classList.remove('hidden');
        if(section === 'products') productsSection.classList.remove('hidden');
        if(section === 'cart') cartSection.classList.remove('hidden');
    }

    // Navegação
    document.getElementById('show-login').addEventListener('click', () => showSection('login'));
    document.getElementById('show-register').addEventListener('click', () => showSection('register'));
    document.getElementById('show-products').addEventListener('click', () => showSection('products'));
    document.getElementById('show-cart').addEventListener('click', () => showSection('cart'));

    let cart = [];

    function updateCart() {
        const container = document.getElementById('cart-container');
        container.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.preco * item.qtd;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x ${item.qtd}</p>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
            `;
            container.appendChild(div);
        });
        document.getElementById('cart-total').textContent = total.toFixed(2);
        document.getElementById('cart-count').textContent = cart.reduce((acc, i)=>acc+i.qtd,0);
    }

    window.addToCart = function(id, nome, preco) {
        const cartItem = cart.find(c => c.id === id);
        if(cartItem) cartItem.qtd += 1;
        else cart.push({id, nome, preco, qtd:1});
        updateCart();
    }

    window.removeFromCart = function(id){
        cart = cart.filter(c => c.id !== id);
        updateCart();
    }

    // Cadastro
    document.getElementById('register-btn').addEventListener('click', () => {
        const nome = document.getElementById('register-name').value;
        const cpf = document.getElementById('register-cpf').value;
        const dataNasc = document.getElementById('register-data').value;
        const email = document.getElementById('register-email').value;
        const senha = document.getElementById('register-password').value;

        fetch('http://localhost:8080/usuario', {  // Corrigido para bater com seu back
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nome, email, senha, cpf, dataNasc})
        })
            .then(res => {
                if(!res.ok) throw new Error('Erro ao cadastrar');
                return res.json();
            })
            .then(data => {
                document.getElementById('register-msg').textContent = 'Cadastro realizado com sucesso!';
                // Limpar campos
                document.getElementById('register-name').value = '';
                document.getElementById('register-cpf').value = '';
                document.getElementById('register-data').value = '';
                document.getElementById('register-email').value = '';
                document.getElementById('register-password').value = '';
                showSection('login');  // Redireciona para login
            })
            .catch(err => {
                document.getElementById('register-msg').textContent = 'Erro no cadastro!';
                console.error(err);
            });
    });


    // Login
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:8080/usuario/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, senha:password})
        })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.getElementById('login-msg').textContent = 'Login realizado!';
            showSection('products');
            loadProducts();
        })
        .catch(err => {
            document.getElementById('login-msg').textContent = 'Email ou senha incorretos!';
            console.error(err);
        });
    });

    // Produtos
    const productsContainer = document.getElementById('products-container');

    function loadProducts() {
        fetch('http://localhost:8080/produtos')
        .then(res => res.json())
        .then(produtos => {
            productsContainer.innerHTML = '';
            produtos.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${p.img}" alt="${p.nome}">
                    <h3>${p.nome}</h3>
                    <p>R$ ${p.preco.toFixed(2)}</p>
                    <button class="add-btn" onclick="addToCart(${p.id}, '${p.nome}', ${p.preco})">Adicionar</button>
                `;
                productsContainer.appendChild(card);
            });
        })
        .catch(err => console.error(err));
    }

    // Finalizar compra via WhatsApp
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(cart.length===0){ alert('Carrinho vazio!'); return; }

        let message = 'Olá, quero comprar:%0A';
        cart.forEach(item => {
            message += `${item.nome} x${item.qtd} - R$ ${(item.preco*item.qtd).toFixed(2)}%0A`;
        });
        let total = cart.reduce((acc,i)=>acc+i.preco*i.qtd,0);
        message += `Total: R$ ${total.toFixed(2)}`;

        const phone = '5511999999999'; // Coloque seu número
        window.open(`https://wa.me/${phone}?text=${message}`,'_blank');
    });
});

