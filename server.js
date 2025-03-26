const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

app.get('/rescuedstories', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rescuedstories.html'));
});

app.get('/howtohelp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'howtohelp.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resources.html'));
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

// Contact Form Route
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const data = { name, email, message, date: new Date().toISOString() };

    // Save to JSON file
    fs.readFile('messages.json', 'utf8', (err, fileData) => {
        if (err) fileData = '[]';

        const json = JSON.parse(fileData);
        json.push(data);

        fs.writeFile('messages.json', JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ error: 'Failed to save message' });
            }
            res.status(200).json({ message: 'Message saved successfully!' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
