const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());
const db = require('./db');
const User = require('./Routes/userRoute');
app.use('/',User);

const Job = require('./Routes/jobRoute');
app.use('/',Job);

const Application = require('./Routes/ApplicationRoute');
app.use('/',Application);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
