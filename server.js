const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { celsiusToFahrenheit, fahrenheitToCelsius, celsiusToKelvin, kelvinToCelsius } = require('./converter');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function convertTemperature(value, type) {
    const v = parseFloat(value);
    if (isNaN(v)) return "Invalid input";

    switch(type) {
        case "C to F": return celsiusToFahrenheit(v).toFixed(2);
        case "F to C": return fahrenheitToCelsius(v).toFixed(2);
        case "C to K": return celsiusToKelvin(v).toFixed(2);
        case "K to C": return kelvinToCelsius(v).toFixed(2);
        default: return "Unknown conversion";
    }
}

app.post('/convert', (req, res) => {
    const { value, conversion } = req.body;
    const result = convertTemperature(value, conversion);
    res.send(`<h2>Result: ${result}</h2><a href="/">Go back</a>`);
});

app.listen(8000, () => {
    console.log('Server running at http://localhost:8000');
});
