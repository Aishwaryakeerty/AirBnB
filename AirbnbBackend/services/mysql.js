/**
 * Created by harshmehta6711 on 17-11-2016.
 */
var mysql=require('mysql');

function getConnection(){
    var connection = mysql.createConnection({
        host : 'localhost', //host where mysql server is running
        user : 'root', //user for the mysql application
        password : 'system', //password for the mysql application
        database : '', //database name
        port : 3306 //port, it is 3306 by default for mysql
    });
    return connection;
}


