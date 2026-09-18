
drop database progetto295;
create database progetto295;

use progetto295;

CREATE TABLE users (
    idUtente INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    nationality VARCHAR(100),
    profile_image VARCHAR(500),
    visibility ENUM('public', 'private', 'followers') DEFAULT 'public'
    );
    
   CREATE TABLE posts (
    idPost INT AUTO_INCREMENT PRIMARY KEY,
    idUtente INT NOT NULL,
    contenuto TEXT NOT NULL,
    immagine VARCHAR(500),
    data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
        ON DELETE CASCADE
);

CREATE TABLE tags (
    idTag INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

-- un post può avere più tag e un tag può appartenere a più post, quindi facciamo una tabella intermedia:

CREATE TABLE post_tags (
    idPost INT NOT NULL,
    idTag INT NOT NULL,

    PRIMARY KEY (idPost, idTag),

    FOREIGN KEY (idPost)
        REFERENCES posts(idPost)
        ON DELETE CASCADE,

    FOREIGN KEY (idTag)
        REFERENCES tags(idTag)
        ON DELETE CASCADE
);

CREATE TABLE comments (
    idCommento INT AUTO_INCREMENT PRIMARY KEY,
    idUtente INT NOT NULL,
    idPost INT NOT NULL,
    idCommentoMain INT NULL, -- perchè si può commentare ad altri commenti
    contenuto TEXT NOT NULL,
    data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
        ON DELETE CASCADE,

    FOREIGN KEY (idPost)
        REFERENCES posts(idPost)
        ON DELETE CASCADE,

    FOREIGN KEY (idCommentoMain)
        REFERENCES comments(idCommento)
        ON DELETE CASCADE
);

CREATE TABLE post_likes (
    idUtente INT NOT NULL,
    idPost INT NOT NULL,

    PRIMARY KEY (idUtente, idPost),

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
        ON DELETE CASCADE,

    FOREIGN KEY (idPost)
        REFERENCES posts(idPost)
        ON DELETE CASCADE
);

CREATE TABLE comment_likes (
    idUtente INT NOT NULL,
    idCommento INT NOT NULL,

    PRIMARY KEY (idUtente, idCommento),

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
        ON DELETE CASCADE,

    FOREIGN KEY (idCommento)
        REFERENCES comments(idCommento)
        ON DELETE CASCADE
);

CREATE TABLE user_follows (
    idFollower INT NOT NULL,
    idSeguito INT NOT NULL,

    PRIMARY KEY (idFollower, idSeguito),

    FOREIGN KEY (idFollower)
        REFERENCES users(idUtente)
        ON DELETE CASCADE,

    FOREIGN KEY (idSeguito)
        REFERENCES users(idUtente)
        ON DELETE CASCADE
);

CREATE TABLE tag_follows (
    idUtente INT NOT NULL,
    idTag INT NOT NULL,

    PRIMARY KEY (idUtente, idTag),

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
        ON DELETE CASCADE,

    FOREIGN KEY (idTag)
        REFERENCES tags(idTag)
        ON DELETE CASCADE
);

CREATE TABLE blocks (
    idBloccante INT NOT NULL,
    idBloccato INT NOT NULL,

    PRIMARY KEY (idBloccante, idBloccato),

    FOREIGN KEY (idBloccante) REFERENCES users(idUtente),
    FOREIGN KEY (idBloccato) REFERENCES users(idUtente)
);

CREATE TABLE conversations (
    idConversazione INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    dataCreazione DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_members (
    idConversazione INT NOT NULL,
    idUtente INT NOT NULL,

    PRIMARY KEY (idConversazione, idUtente),

    FOREIGN KEY (idConversazione)
        REFERENCES conversations(idConversazione),

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
);

CREATE TABLE messages (
    idMessaggio INT AUTO_INCREMENT PRIMARY KEY,
    idConversazione INT NOT NULL,
    idUtente INT NOT NULL,
    contenuto TEXT NOT NULL,
    dataInvio DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idConversazione)
        REFERENCES conversations(idConversazione),

    FOREIGN KEY (idUtente)
        REFERENCES users(idUtente)
);

INSERT INTO users
(username, first_name, last_name, email, password_hash, birth_date, nationality)
VALUES
('test', 'Mario', 'Rossi', 'mario@test.ch', 'prova123', '2000-01-01', 'Svizzera');
    