const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const md5 = require('md5');
const app = express();
const cors = require('cors');
const port = 3017;

const jwt = require('jsonwebtoken');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const execSQL = (sql) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'waleska'
    });

    connection.connect((error) => {
      if (error){
          res.json(error);
          return;
      }
  
      connection.query(sql, (error, results, fields) => {
          if(error) 
            reject(error);
          else
            resolve(results);
            connection.destroy();
      });    
    })
  });
}

const execSQLQuery = (sqlQry, res) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'waleska'
    });

    connection.connect((error) => {
      if (error){
          res.json(error);
          return;
      }
  
      connection.query(sqlQry, (error, results, fields) => {
          if(error) 
            res.json(error);
          else
            res.json(results);
          connection.end();
          console.log('executou!');
      });    
    })
}


app.post('/cadastro', (req, res) => {  
  const nome = req.body.nome;
  const telefone = req.body.telefone;

  execSQLQuery(`INSERT INTO cadastro(nome, telefone) VALUES('${nome}','${telefone}')`, res);
});

app.get('/cadastro', async(req, res) => {
  console.table(await execSQL('SELECT * FROM cadastro'));
  execSQLQuery('SELECT * FROM cadastro', res);
  console.log("Retornou todos os users!");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})