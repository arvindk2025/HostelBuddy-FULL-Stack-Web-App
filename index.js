var express=require("express");
var app= express();
var bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var con=require("./database");

const http = require('http');
const fs = require('fs');

const home = fs.readFileSync('./public/index.html');
const loginPage = fs.readFileSync('./public/login.html');
const foodD=fs.readFileSync('./public/foodD.html');
const foodR=fs.readFileSync('./public/foodR.html');
const medicineD=fs.readFileSync('./public/medicineD.html');
const medicineR=fs.readFileSync('./public/medicineR.html')
const otherR=fs.readFileSync('./public/otherR.html');
const otherD=fs.readFileSync('./public/otherD.html');
const   Show=fs.readFileSync('./Show.ejs');

const server = http.createServer((req, res)=>{
    url = req.url;

    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html');
    if(url=='/'){
        res.end(home);
    }
    else if (url == '/login'){
        res.end(loginPage);
    }
    else if(url=='/foodD'){
        res.end(foodD)
    }
    else if(url=='/foodR')
    {
        res.end(foodR);
    }
    else if(url=='/medicineD')
    {
        res.end(medicineD);
    }
    else if(url=='/medicineR')
    {
        res.end(medicineR)
    }
    else if(url=='/otherD')
    {
        res.end(otherD)
    }
    else if(url=='/otherR')
    {
        res.end(otherR)
    }
    else if(url=='/Show')
    {
        res.end(Show)
    }
   

});




const path = require('path');
app.use(express.static(path.join(__dirname,'public')));


// app.use(bodyParser.json());


// app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html'));
//  });


//  app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname+'/public/login.html'));
//  });


app.post('/medicineD.html',function(req,res){
    console.log(req)
    var item=req.body.item;

    con.connect(function(error){
         if(error) throw error;

        var sql="INSERT INTO inventory(medicine) VALUES('"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
 });

//  app.post('/login.html',function(req,res){
//     var username=req.body.username;
//     var password=req.body.password;

//     var sql="select * from users where username LIKE %'"+username+"'% and password LIKE %'"+password+"%'";
//     con.query(sql,function(req,res){
//         if(error) console.log(error);
//             res.end(home);
//     });
// });

 app.post('/foodD.html',function(req,res){
    var item=req.body.item;

    con.connect(function(error){
         if(error) throw error;

        var sql="INSERT INTO inventory(food_items) VALUES('"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
 });

 app.post('/otherD.html',function(req,res){
    var item=req.body.item;

    con.connect(function(error){
         if(error) throw error;

        var sql="INSERT INTO inventory(other_items) VALUES('"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
 });

 




app.post('/medicineR.html', function(req,res){
    var item=req.body.item;

    con.connect(function(error){
        if(error) throw error;

        var sql="SELECT * from inventory where medicine LIKE '%"+item+"%'";

        con.query(sql, function(error,result){
            if(error) console.log(error);
            res.render(__dirname+'/Show.ejs',{inventory:result});
        });
    });
});

app.post('/foodR.html', function(req,res){
    var item=req.body.item;

    con.connect(function(error){
        if(error) throw error;

        var sql="SELECT * from inventory where food_items LIKE '%"+item+"%'";

        con.query(sql, function(error,result){
            if(error) console.log(error);
            res.render(__dirname+'/Show.ejs',{inventory:result});
        });
    });
});

app.post('/otherR.html', function(req,res){
    var item=req.body.item;

    con.connect(function(error){
        if(error) throw error;

        var sql="SELECT * from inventory where other_items LIKE '%"+item+"%'";

        con.query(sql, function(error,result){
            if(error) console.log(error);
            res.render(__dirname+'/Show.ejs',{inventory:result});
        });
    });
});




//  app.get('/medicinee', function(req,res){
//     con.connect(function(error){
//         if(error) console.log(error);

//         var sql="select * from inventory";
//         con.query(sql,function(error,result){
//             if(error) console.log(error);
//             res.render(__dirname+'/medicineShow.ejs',{inventory:result});

//         });

//     });
//  });

 

 app.listen(3000,function(){
    console.log("App is running");
 });

// const http = require('http');
// const fs = require('fs');

// const hostname = '127.0.0.1';
// const port = 3000;
// const home = fs.readFileSync('./public/index.html');
// const loginPage = fs.readFileSync('./public/login.html');

// const server = http.createServer((req, res)=>{
//     console.log(req.url);
//     url = req.url;

//     res.statusCode = 200;
//     res.setHeader('content-Type', 'text/html');
//     if(url=='/'){
//         res.end(home);
//     }
//     else if (url == '/login'){
//         res.end(loginPage);
//     }
// });

// server.listen(port, hostname, () => {
//     console.log("App is running");
// });