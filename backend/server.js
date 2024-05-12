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

app.get('/check/:period', (req, res) => {
    const perriod = req.params.period;
    if(perriod == 0){
        pool.query("SELECT * FROM check_mor_even ORDER BY Id ASC", (error, results, fields) => {
            if (error) throw error;
    
            res.json(results);
        });
    }
    else{
        pool.query("select Evening from check_mor_even", (error, results, fields) => {
            if (error) throw error;
    
            res.json(results);
        });
    }
});

app.post('/createday', async (req, res) => {
    const day = req.body.day;
    try {
        const Create_morning_evening = async () => {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM users", function(error, results, fields) {
                    if (error) reject(error);

                    resolve(results);
                });
            });
        };

        const createDay = async () => {
            const sql = "INSERT INTO day_check (day) VALUES (?)";
            const values = [day];
            const formattedSql = mysql.format(sql, values);
            await pool.query(formattedSql);

            const users = await Create_morning_evening();
            // console.log("users: " , users)
            const morningEveningPromises = users.map(user => {
                const fullName = user.prefix + user.name;
                const sql = "INSERT INTO check_mor_even (Day, Id, number , prefix , name , Year, Morning, Evening) VALUES (? ,? ,? ,? , ?, ?, ?, ?)";
                const values = [day, user.Id, user.number, user.prefix , user.name, user.year, null, null]; // You need to adjust this based on your logic
                // console.log("day: " , day)
                // console.log("user.Id: " , user.Id)
                // console.log("fullName: " , fullName)
                const formattedSql = mysql.format(sql, values);
                return pool.query(formattedSql);
            });
            await Promise.all(morningEveningPromises);
            res.json({ result: true }); 
        };

        await createDay();
    } catch (err) {
        res.json({
            result: false,
            message: err.message
        });
    }
});

    app.put('/updateMorning', async (req, res) => {
        const input = req.body;
        pool.query("UPDATE check_mor_even SET Morning = ? WHERE Id = ?", 
        [input.morning, input.Id], 
        function (err, result, fields) {
        if (err) {
            res.status(500).json({
            success: false,
            message: err.message
            });
        } else {
            res.status(200).json({
            success: true
            });
        }
        });
    });
  



app.delete('/deleteday/:id', (req, res) => {
    try {
        const dayId = req.params.id;
        console.log("dayId: " , dayId);
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