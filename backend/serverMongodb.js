const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const port = 8080;
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:1234@database.1p96qji.mongodb.net/"

app.post('/users/createMany', async (req, res) => {
    const users = req.body; // รับข้อมูลผู้ใช้หลายรายการ
    const client = new MongoClient(uri);
    
    try {
        await client.connect();

        // แปลงข้อมูลผู้ใช้เป็นรูปแบบที่ถูกต้องสำหรับการเพิ่มลงใน MongoDB
        const formattedUsers = users.map(user => ({
            Id: user.id,
            number: user.number,
            prefix: user.prefix,
            name: user.name,
            year: user.year,
        }));

        // เพิ่มข้อมูลผู้ใช้หลายรายการลงในคอลเล็กชัน users ในฐานข้อมูล mydb
        const result = await client.db("checkname").collection("users").insertMany(formattedUsers);

        res.status(200).send({
            status: "ok",
            message: "Users created successfully",
            insertedCount: result.insertedCount,
            insertedIds: result.insertedIds,
            users: formattedUsers
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send({
            status: "error",
            message: "Error inserting users"
        });
    } finally {
        await client.close();
    }
});

app.post("/day/createMany", async (req , res) => {
    const days = req.body;
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const formatday = days.map((item) => (
                {
                    Id: item.Id ,
                    day: item.day
                }

        ))

        const response = await client.db("checkname").collection("day_check").insertMany(formatday)

        res.status(200).send({
            status: "ok",
            message: "Users created successfully",
            insertedCount: response.insertedCount,
            insertedIds: response.insertedIds,
            days: formatday
        });
    }catch(error){
        console.error("Error inserting data:", error);
        res.status(500).send({
            status: "error",
            message: "Error inserting users"
        });
    }finally{
        await client.close();
    }
})

app.get('/users', async(req, res) => {
    const client = new MongoClient(uri)

    try{
        await client.connect();
        //client.db("checkname").collection("users").insertMany(formattedUsers);
        const response = await client.db("checkname").collection("users").find({}).toArray();
        res.status(200).send(response)
    }catch(err){
        console.error("Error inserting data:", err);
        res.status(500).send({
            status: "error",
            message: "Error inserting users"
        });
    }finally{
        await client.close();
    }

});

app.get('/day', async(req, res) => {
    const client = new MongoClient(uri)

    try{
        await client.connect();
        const response = await client.db("checkname").collection("day_check").find({}).toArray();

        res.status(200).send(response);
    }catch(err){
        console.error("Error inserting data:", err);
        res.status(500).send({
            status: "error",
            message: "Error inserting users"
        });
    }finally{
        await client.close();
    }

});

app.post('/createday', async (req, res) => {
    const day = req.body.day;
    const client = new MongoClient(uri)
    try {
        await client.connect();

        const createDay = async () => {
            const users = await client.db("checkname").collection("users").find({}).toArray();
            const morningEveningPromises = users.map(user => {
                return client.db("checkname").collection("check_mor_even").insertOne({
                    Day: day, 
                    Id: user.Id, 
                    number: user.number, 
                    prefix: user.prefix, 
                    name: user.name, 
                    Year: user.year, 
                    Morning: null, 
                    Evening: null
                });
            });
            await Promise.all(morningEveningPromises);
        };

        await createDay();
        res.json({ result: true }); 
    } catch (err) {
        res.json({
            result: false,
            message: err.message
        });
    } finally {
        await client.close();
    }
});

app.delete('/deleteday/:id', async (req, res) => {
    const dayId = parseInt(req.params.id);
    console.log("dayId: ", dayId);
    if (Number.isInteger(dayId)) {
        console.log("dayId is Number")
    } else {
        console.log("dayId is not Number")
        // ค่าที่รับมาไม่ใช่จำนวนเต็ม
        // รีเทิร์นข้อผิดพลาดหรือทำการแปลงค่าตามที่เหมาะสม
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const response = await client.db("checkname").collection("day_check").deleteOne({ Id: dayId });

        if (response.deletedCount === 1) {
            res.status(200).send({ result: true, message: "Day deleted successfully" });
        } else {
            res.status(404).send({ result: false, message: "Day not found" });
        }

    } catch (error) {
        res.json({
            result: false,
            message: error.message
        });
    } finally {
        await client.close();
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});