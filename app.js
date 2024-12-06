const express = require('express');
const path = require('path');
const connectDB = require('./mongodbVSCodePlaygroundDB');

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route to save data to MongoDB
app.post('/api/data', async (req, res) => {
    try {
        const Data = mongoose.model('Data', new mongoose.Schema({ name: String }));
        const newData = new Data({ name: req.body.name });
        await newData.save();
        res.status(201).send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(Server running at http://localhost:${PORT});
});
document.getElementById('data-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;

    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            M.toast({ html: 'Data saved successfully!' });
        } else {
            M.toast({ html: 'Failed to save data!' });
        }
    } catch (error) {
        console.error('Error:', error);
        M.toast({ html: 'Server Error!' });
    }
});