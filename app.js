const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

// nastavení EJS jako šablonovacího systému (templating engine)
app.set('view engine', 'ejs')

// nastavení složky se statickými soubory (přílohy - jpg, css, mp4, ...)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true}))

// routa - domovská stránka webu
app.get('/', function (req, res) {
    fs.readFile('people.json', (err, people) => {
        if(err) throw err;
        people = JSON.parse(people);
        fs.readFile('balances.json', (err, balances) => {
            if(err) throw err;
            balances = JSON.parse(balances);
            if(balances.length != people.length){
                balances = updateBalances(people, balances);
                console.log(balances);
                fs.writeFile('balances.json', JSON.stringify(balances, null, 2), (err) => {
                    if (err) throw err;
                });
            }
            res.render('index', {people: balances, year: new Date().getFullYear()});
        })
    })
})

function updateBalances(people, balances) {
    people.forEach(person => {
        const found = balances.find(balance => balance.name === person);
        if (!found) {
            balances.push({ name: person, money: 0, power: 0, experience: 0});
        }
    });
    return balances;
}

app.listen(3001)