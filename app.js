const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

// nastavení EJS jako šablonovacího systému (templating engine)
app.set('view engine', 'ejs')

// nastavení složky se statickými soubory (přílohy - jpg, css, mp4, ...)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routa - domovská stránka webu
app.get('/', function (req, res) {
    getBalances((err, people) => {
        if (err) {
            console.error('Chyba při získávání zůstatků:', err);
            res.status(500).send('Nastala chyba při získávání zůstatků');
            return;
        }
        res.render('index', { people, year: new Date().getFullYear(), title: "Zápis informací do profilů"});
    });
})

app.post("/submit", (req, res) => {
    console.log(req.body);
    getBalances((err, people) => {
        if (err) {
            console.error('Chyba při získávání zůstatků:', err);
            res.status(500).send('Nastala chyba při získávání zůstatků');
            return;
        }
        res.render('index', { people, year: new Date().getFullYear(), title: "Zápis informací do profilů"});
    });
  });

  function getBalances(callback) {
    fs.readFile('people.json', (err, peopleData) => {
        if (err) {
            callback(err);
            return;
        }
        fs.readFile('balances.json', (err, balancesData) => {
            if (err) {
                callback(err);
                return;
            }
            let people = JSON.parse(peopleData);
            let balances = JSON.parse(balancesData);
            if (balances.length != people.length) {
                balances = updateBalances(people, balances);
                console.log(balances);
                fs.writeFile('balances.json', JSON.stringify(balances, null, 2), (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                });
            }
            // Zavolání callback funkce s výsledky
            callback(null, balances);
        });
    });
}

function updateBalances(people, balances) {
    people.forEach(person => {
        const found = balances.find(balance => balance.name === person);
        if (!found) {
            balances.push({ id: balances.length ,name: person, money: 0, power: 0, experience: 0});
        }
    });
    return balances;
}

app.listen(3001)