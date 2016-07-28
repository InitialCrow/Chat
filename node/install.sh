#!/usr/bin/env bash
USERNAME='root'
PASSWORD=''
DBNAME='chat_node'
HOST='localhost'

USER_USERNAME=''
USER_PASSWORD=''

MySQL=$(cat <<EOF
DROP DATABASE IF EXISTS $DBNAME;
CREATE DATABASE $DBNAME DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


USE $DBNAME;
CREATE TABLE users(
	    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	    name VARCHAR(20) ,
	    password VARCHAR(50)
	);
CREATE TABLE avatars(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uri VARCHAR(20) ,
    user_id INT,
    CONSTRAINT users_fk_avatars FOREIGN KEY (user_id)
    REFERENCES users(id)
);

EOF
)
echo $MySQL | mysql --user=$USERNAME --password=$PASSWORD --host=$HOST;







