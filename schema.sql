create table contact (
    id int not null auto_increment,
    name text not null,
    email text not null,
    date text not null,
    resident bool not null default FALSE,
    primary key(id)
);

create table sales (
    message text not null,
    startTime timestamp not null,
    endtime timestamp
);