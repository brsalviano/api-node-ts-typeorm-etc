## Informações
O curso ensina a criar uma api restful usando node, typescript e typeorm.

link: https://www.udemy.com/course/api-restful-de-vendas/


## Instruções de uso

* Crie um arquivo `ormconfig.json` na raiz do projeto (dentro da pasta api-vendas).
Exemplo:

```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "apivendas",
    "migrations": [
      "./src/shared/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/typeorm/migrations"
    }
}
```

* Se for usar o container do docker, suba com `docker-compose up`.
