Markdown
# 📅 RoomSync - Sistema Inteligente de Reservas de Salas

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-success)
![Linguagem](https://img.shields.io/badge/PHP-8.0+-blue)
![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-SQLite-lightblue)

## 📌 Sobre o Projeto
O **RoomSync** é um sistema web desenvolvido para solucionar o controle de agendamentos de salas físicas, laboratórios e auditórios. Criado como projeto acadêmico para a disciplina de **Código de Alta Performance**, o sistema substitui planilhas manuais e evita o principal problema da gestão de espaços: **o conflito de horários**.

A aplicação foi projetada com foco em **portabilidade e eficiência**. Utilizando uma arquitetura de *Single-Page Application (SPA)* no Front-end comunicando-se via API REST com o Back-end, o sistema garante uma experiência fluida para o usuário.

## 🚀 Funcionalidades
* **Autenticação Segura:** Área restrita protegida por login e controle de sessão.
* **Validação de Conflito de Horários:** O motor do sistema impede matematicamente que duas reservas ocupem a mesma sala em horários que se cruzam.
* **Atualização Assíncrona:** A interface atualiza a lista de reservas em tempo real utilizando a Fetch API (sem recarregar a página).
* **Gestão de Cancelamentos:** As reservas podem ser canceladas, mantendo o registro no banco de dados com alteração de status, garantindo um histórico auditável.
* **Banco de Dados Portátil:** Utiliza SQLite, dispensando instalações complexas de servidores de banco de dados e permitindo o transporte fácil do sistema.

## 🛠️ Tecnologias Utilizadas
**Front-end:**
* HTML5 & CSS3
* Bootstrap 5 (Layout responsivo e UI/UX)
* JavaScript Vanilla (Comunicação assíncrona com Fetch API)

**Back-end & Infraestrutura:**
* PHP (Lógica de negócios, API REST e Autenticação)
* SQLite (Banco de dados relacional embarcado)
* Servidor Local (XAMPP / Apache)

## ⚙️ Como Executar o Projeto

Como o projeto utiliza PHP e SQLite, é necessário um servidor local como o **XAMPP** para rodá-lo.

1. Faça o download ou clone este repositório
2. 
Mova a pasta do projeto para dentro do diretório do seu servidor local. No caso do XAMPP:

Cole a pasta em C:\xampp\htdocs\

Abra o XAMPP Control Panel e inicie o módulo Apache.

Abra o seu navegador e acesse a URL:

http://localhost/codigos de alta perfomance/login.php

Utilize a credencial padrão para entrar no sistema:

Senha: admin123

(Nota: O arquivo banco.sqlite será gerado automaticamente pelo PHP na primeira execução, caso não exista).

👥 Equipe de Desenvolvimento
Projeto desenvolvido pelos alunos do 3º período de Ciência da Computação:

Adhan Borges de Souza

Elano Serrão

Gabriel Farias

Izabel Cristina Martins dos Santos

Luigi Gabriel Lopes dos Santos

Nicolas Alegre Ferreira Melo

Pietro
