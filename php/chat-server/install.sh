#!/usr/bin/env bash
USERNAME='root'
PASSWORD=''
DBNAME='chat'
HOST='chat'

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
CREATE TABLE connect(
	    name VARCHAR(20) ,
	    ip VARCHAR(15) ,
	    timestamp INT
	);
EOF
)

echo $MySQL | mysql --user=$USERNAME --password=$PASSWORD --host=$HOST;







