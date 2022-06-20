const express = require('express');
const cors = require('cors')
const mysql = require('mysql2')
const port = 3001;


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'testpassword',
    database: 'gamereviews'
});

app.get('/get', (req, res) => {
    db.query('SELECT * FROM reviews', (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/post', (req, res)=>{
    const data = req.body;
    
    db.query('INSERT INTO reviews(title, cover, review, gameplay, story, visuals, soundtrack, difficulty, replayability, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [data.title, data.cover, data.review, data.gameplay, data.story, data.visuals, data.soundtrack, data.difficulty, data.replayability, data.balance], (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id;
    db.query('DELETE FROM reviews WHERE id = ?', [id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/put', (req, res)=>{
    const data = req.body;
    db.query('UPDATE reviews SET title = ?, cover = ?, review = ?, gameplay = ?, story = ?, visuals = ?, soundtrack = ?, difficulty = ?, replayability = ?, balance = ? WHERE id = ?', [
        data.title, data.cover, data.review, data.gameplay, data.story, data.visuals, data.soundtrack, data.difficulty, data.replayability, data.balance, data.id
    ], (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    })
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
