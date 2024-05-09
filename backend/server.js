const express = require('express');
const app = express();
const port = 8080;

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'checkname'
});

const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/users', (req, res) => {
    pool.query("select * from users", function (error, results, fields) {
        if (error) throw error;

        res.json(results);
    });
});

app.get('/day', (req, res) => {
    pool.query("select * from day_check", (error, results, fields) => {
        if (error) throw error;

        res.json(results);
    });
});

app.post('/createday', (req, res) => {
    const day = req.body.day;
    try {
        const Create_morning_evening = async () => {
            pool.query("SELECT Id , prefix  , name FROM users" , function(error , results , fields){
                if (error) throw error
                //  console.log("results: " , results);
                
                return results;
            })
        }
        const CreateDay = async () => {

            const sql = "INSERT INTO day_check (day) VALUES (?)";
            const values = [day]
            const frommatted = mysql.format(sql, values);
            await pool.query(frommatted);

            await pool.query("INSERT INTO check_mor_even (day , Id , name , Morning , Evening) VALUES (?,?,?,?,?)", [])
            res.json({
                result: true
            })
        }


        // CreateDay();
        Create_morning_evening();
        console.log("test: " , Create_morning_evening().json);

    } catch (err) {
        res.json({
            result: false,
            message: err.message
        })
    }
});

app.delete('/deleteday/:id', (req, res) => {
    try {
        const dayId = req.params.id;
        const sql = "DELETE FROM day_check WHERE Id = ?";

        pool.query(sql, [dayId], (err, result) => {
            if (err) {
                console.log("Error deleting day: ", err);
                res.status(500).json({ success: false, message: "Error deleting day" });
                return;
            }

            res.json({ success: true, message: "Day deleted successfully" });
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})