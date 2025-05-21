# Pokédex

Foi implementado uma pokedex utilizando de uma integração com a API https://pokeapi.co/
Ainda há muito espaço para melhora, devido ao curto espaço de tempo não consegui implementar tudo que gostaria.
Algumas melhoras que tenho em mente são:
- Implementar um Loading no front para informar usuário que o aplicativo aguarda a requisição finalizar
- Implementar uma segurança básica no backend para evitar inclusive excesso de requisições
- Diversas melhorias no design
- As rotas de detalhamento trazem muitas informações interessantes, que podem ser utilizadas
- Implementação de testes, tanto de unidade como de integração
- Dividir o serviço pokedex em vários serviços ao invés de usar somente um arquivo
- Utilizar variáveis de ambiente em ambos os projetos, possível integração com docker
...

## Prerequisites
* [Docker](https://www.docker.com/get-started/)

## Setup
1. Clone the repository.
2. In the main directory run ```docker-compose build```

## Run
To start the project run ```docker-compose up```
Both API and APP will start running locally on port 3000 and 3001 respectfully

## Without Docker
If necessary to run locally without the use of docker:
1. Clone the repository.
2. Install dependecies on both projects: 
    ```shell
    cd /path/to/cloned/pokedex/
    cd api/
    npm install
    cd ../app/
    npm install
    ```

To run you will need 2 different shells to run each project separately. 
```shell
cd api/
npm run start
```
```shell
cd app/
npm run start
```
