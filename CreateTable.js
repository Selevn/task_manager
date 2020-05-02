const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "goodsDB"
});

connection.connect();

connection.query("CREATE DATABASE tasksDB",
    function(err, results) {
        if(err) console.log(err);
        else console.log("База данных создана");
    });

let sql = "CREATE TABLE `tasksdb`.`users` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `username` VARCHAR(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `email` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `password` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `activated` BOOLEAN NOT NULL , `online` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;"
connection.query(sql,
    function(err, results) {
        if(err) console.log(err);
        else console.log("Таблица пользователей создана!");
    });