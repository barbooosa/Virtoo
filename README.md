# Virtoo

Virtoo é um sistema acadêmico para a instituição ISPEL e ISTEL localizado na Lubango-AO. O sistema de gestão acadêmico a ser implantado no Instituto Superior Politécnico Evangélico do Lubango (ISPEL) e Instituto Superior de Teologia Evangélica do Lubango (ISTEL) na Angola, visando informatizar os processos acadêmicos. Logo abaixo estão especificados como esta sendo produzido e organizado o back-end deste projeto.


# Tecnologias
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [Mongodb](https://www.mongodb.com/pt-br)

## Rotas


***`src\app\controllers\cadastroController.js`*** é o arquivo onde estão as funções de cadastro no banco de dados.

***`src\app\controllers\calendarioController.js`*** é o arquivo que possui a API de calendário.

***`src\app\controllers\cursoController.js`*** Aqui é onde contém as funções relacionadas aos cursos da instituição

***`src\app\controllers\editarController.js`*** é o arquivo possui as rotas de alterar informações no banco de dados.

***`src\app\controllers\inicioController.js`*** é o arquivo que possui a rota de início do site.

***`src\app\controllers\loginController.js`*** é o arquivo que contém a função de login do site.

***`src\app\controllers\materiaController.js`*** Aqui é onde contém as funções relacionadas as matéria de algum curso específico.

***`src\app\controllers\notasController.js`*** Aqui é onde é atribuido as notas a um aluno , ja realizando o calculo da média.

***`src\app\controllers\serviçoController.js`*** Aqui é onde contém as funções relacionadas aos pedidos de serviços.

***`src\app\controllers\tokenController.js`*** Aqui é onde possui o código de autenticação via token

***`src\app\controllers\turmaController.js`*** Aqui é onde são criadas as turmas.

**`.env`** Aqui esta guardado o DB_USER , DB_PASS e o SECRET

***`src\views`*** Aqui é onde estão as pastas direcionadas ao front end.



## Bibliotecas

|                |Utilização|
|----------------|-------------------------------|
|**npm install express**|`Framework utilizado para a construção de servidores web'`            |
|**npm install mongoose**          |`Biblioteca de programação orientada a objetos JavaScript que cria uma conexão entre o MongoDB e o ambiente de tempo de execução JavaScript Node.js`            |
|**npm install mongodb**          |`Banco de dados alocado`|
|**npm install bcrypt**|`Utilizado para encriptar senhas'`            |
|**npm install jsonwebtoken**          |`Utilizado para o token de autenticação`            |
|**npm install validador-de-cpf**          |`Utilizado para validar se o cpf existe`|
|**npm install nodemon -D**|` Utilitário que monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node. js quando necessário'`            |
|**$ npm install @googleapis/calendar**  |`Utilizado para o token de autenticação` |
|**npm install body-parser**          |`O body-parser é pra converter o body da requisição para vários formatos.`|
|**npm install path**|` É um módulo integrado que fornece utilitários para trabalhar com caminhos de arquivos e diretórios.'`            |
|**npm install express-session**  |`Armazena os dados da sessão no servidor, salvando o ID da sessão em cookies` |
|**npm install moment**          |`Utilizado para validação, manipulação e formatação de datas`|

## Porta
- O servidor esta rodando na porta:
> 3200

## Banco de dados

- Nosso banco de dados esta em **Servidor AWS** em **Nuvem** localizado em **Cape Town (af-south-1)**

