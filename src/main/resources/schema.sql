CREATE TABLE Billett
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    antall INTEGER NOT NULL ,
    film VARCHAR (50) NOT NULL,
    fornavn VARCHAR (30) NOT NULL,
    etternavn VARCHAR (40) NOT NULL,
    telefonnr VARCHAR (8) NOT NULL,
    epost VARCHAR (50) NOT NULL,
    PRIMARY KEY (id)
);