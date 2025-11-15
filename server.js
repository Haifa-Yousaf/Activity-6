const express = require("express");
const {celsiusToFahrenheit, fahrenheitToCelsius, celsiusToKelvin, kelvinToCelsius } = require("./converter");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    res.json({ message: "Temperature Conversion Web Service Running",
        endpoints: [
            "/c-to-f?value=",
            "/f-to-c?value=",
            "/c-to-k?value=",
            "/k-to-c?value="
        ]
    });
});

// Celsius → Fahrenheit
app.get("/c-to-f", (req, res) => {
    const c = parseFloat(req.query.value);
    if (isNaN(c)) return res.status(400).json({ error: "Provide ?value=<number>" });
    res.json({ celsius: c, fahrenheit: celsiusToFahrenheit(c) });
});

// Fahrenheit → Celsius
app.get("/f-to-c", (req, res) => {
    const f = parseFloat(req.query.value);
    if (isNaN(f)) return res.status(400).json({ error: "Provide ?value=<number>" });
    res.json({ fahrenheit: f, celsius: fahrenheitToCelsius(f) });
});

// Celsius → Kelvin
app.get("/c-to-k", (req, res) => {
    const c = parseFloat(req.query.value);
    if (isNaN(c)) return res.status(400).json({ error: "Provide ?value=<number>" });
    res.json({ celsius: c, kelvin: celsiusToKelvin(c) });
});

// Kelvin → Celsius
app.get("/k-to-c", (req, res) => {
    const k = parseFloat(req.query.value);
    if (isNaN(k)) return res.status(400).json({ error: "Provide ?value=<number>" });
    res.json({ kelvin: k, celsius: kelvinToCelsius(k) });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
