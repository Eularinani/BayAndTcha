create table Livro (
    Livro_id SERIAL not null,
    Titulo  VARCHAR(20) not null,							--4 algarismos, com 2 casas decimais
    Livro__id int ,
    Livro_Lançamento date not null,
    Livro_Volume int,
    Livro_oferta_id int,
    Livro_contraP int,
    primary key (Livro_id)
);
create table Autor (
    Autor_id SERIAL not null,
    Autor_nome VARCHAR(20) not null,							--4 algarismos, com 2 casas decimais
    primary key (Autor_id));
create table Oferta (
    Oferta_id SERIAL not null,
    Oferta_nome VARCHAR(20) not null,
    Oferta_Trans_Id int,
    Oferta_Dia date not null,
    Oferta_contaP int,
    primary key (Oferta_id)
);
create table usuario (
    user_id_ SERIAL not null,
    user_nome VARCHAR not null,
    user_token varchar(200),
    user_pass varchar(200) not null, 								
    user_email varchar NOT null UNIQUE,
    user_oferta_id int ,
    user_transacao_id int ,							
    primary key (user_id_)
);
create table Estado (
    Estado_id SERIAL not null,
    Estado_nome VARCHAR(20) not null,							--4 algarismos, com 2 casas decimais
    primary key (Estado_id)
);

create table Transacao (
    Trasancao_id SERIAL not null,
    Transacao_nome VARCHAR(20) not null,
    Transacao_Usuario_id int not null,
    primary key (Trasancao_id)
);

create table Local (
    Local_id SERIAL not null,
    Local_raio float not null,
    primary key (Local_id)
);

create table TL(
TM_id serial not null,
TL_Trasancao_id int not null,
TL_Local_id int not null,
 primary key (TM_id));

create table ET(
ET_id serial not null,
TL_Trasancao_id int not null,
ET_Estado_id int not null,
primary key (ET_id)
);

create table Troca(
Troca_id serial not null,
TL_Trasancao_id int not null,
TL_Livro_id int not null,
TL_oferta_id int not null,
primary key (Troca_id) 
);
create table AL(
    Al_id serial not null,
    Al_Autor_id int not null,
    Al_livro_id int not null,
    primary key (Al_id)
    );
