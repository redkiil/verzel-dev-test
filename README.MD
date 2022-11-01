
# Concessionária 

Projeto de uma Concessionária front-end e backend.


# Requisitos


• NODEJS

•  [.NET](https://dotnet.microsoft.com/en-us/download) / [.NET CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

• MYSQL

# Deploy

Crie um banco de dados, no seu gerenciador de banco de dados MySQL.


Faça o Download do Projeto

```console
git clone https://github.com/redkiil/verzel-dev-test.git
```

Acesse a pasta ontem contém a API.

Edite o arquivo: <span1 style='padding:3px;color:black;background-color:white;font-weight:bold;'> appsettings.json. </span>

```console
"DefaultConnection": "server=EX: 127.0.0.1;initial catalog=EX: DB_CONCESSIONARIA;uid=USUARIO;pwd=SENHA"
```

Abra seu terminal com dotnet cli ef core tools instalado e rode as migrations.

```console
dotnet ef database update
```

Agora levante o serviço 

```console
dotnet run
```

Feito isto a API irá subir, caso queira acessar a documentação API.
```console
dotnet watch
````

# FRONTEND

Acesse a pasta concessionaria

Abra seu terminal na pasta e execute o comando

```console
npm install
```

Irá realizar a instalação das dependências.

Execute o comando para inicializar a aplicação angular.

```console
npm start
```

# Usando a aplicação

Para acessar Geralmente é http://localhost:4200

Cadastre-se, coloque veiculos a venda, edite-os, e delete.

Filtre os veiculos por preço e modelo/marca, ordene pelo preço.

