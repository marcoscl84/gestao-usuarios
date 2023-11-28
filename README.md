# gestao-usuarios

## Criação da tabela no banco MySQL
```
CREATE TABLE apiusers.users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role INT NOT NULL,
    PRIMARY KEY (id)
);
```