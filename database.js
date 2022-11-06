var mysql=require("mysql");
var con=mysql.createConnection({
    host:'localhost',
    database:'login',
    user:'root',
    password:''

});

module.exports=con;