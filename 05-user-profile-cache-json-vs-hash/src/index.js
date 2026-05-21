import express from 'express'
import Redis from 'ioredis'

const app =express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.post("/user/:id/json", async (req, res) => {
    const id = req.params.id;
    await redis.set(`user:${id}:json`, JSON.stringify(req.body));
    res.json({message: 'saved as json successfully'});
})

app.get('/user/:id/json', async (req, res) => {
    const id = req.params.id;
    const raw = await redis.get(`user:${id}:json`);

    res.json({user : raw ? JSON.parse(raw) : null});
})

app.post("/user/:id/hash", async (req, res) => {
    const id = req.params.id;
    await redis.hset(`user:${id}:hash`, req.body);
    res.json({savedAs: 'User profile saved successfully as hash'});
})

app.get('/user/:id/hash', async (req, res) => {
    const id = req.params.id;
    const user = await redis.hgetall(`user:${id}:hash`);

    res.json({user});
})

app.listen(3000, () => {
    console.log("server is running of http://localhost:3000");
})