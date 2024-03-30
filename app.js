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

app.get('/stats', function (req, res) {
    let sortBy = req.query.sortBy;
    let order = req.query.order;
    let nameContains = req.query.nameContains; 
    
    getBalances((err, people) => {
        if (err) {
            console.error('Chyba při získávání zůstatků:', err);
            res.status(500).send('Nastala chyba při získávání zůstatků');
            return;
        }
        if(sortBy){ // řazení podle jména (abecedy), money, power, experience, defaultně se řadí vzestupně
            people = sortByKey(people, sortBy);
            if(order == 'desc'){ //v případě sestupného řazení se pole otočí
                people.reverse();
            }
        }
        if(nameContains){ // hledá jména, která obsahují daný string
            console.log(nameContains)
        }

        res.render('stats', { people, year: new Date().getFullYear(), title: "Statistiky"});
    });
})

app.post("/submit", (req, res) => {
    let changes = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== ''));
    fs.readFile('changes.json', (err, changesData) => {
        if (err) {
            callback(err);
            return;
        }
        let changesDataJson = JSON.parse(changesData);
        changesDataJson.push(changes);
        //zapsání výčet změn do souboru changes
        fs.writeFile('changes.json', JSON.stringify(changesDataJson, null, 2), (err) => {
            if (err) {
                callback(err);
                return;
            }
        });
        //propsání změn do souboru balances.json
        fs.readFile('balances.json', (err, balancesData) => {
            let balancesDataJson = JSON.parse(balancesData);
            console.log(balancesDataJson);
            for(let key in changes){
                let id = parseInt(key);
                let text = key.replace(/[0-9]/g, '');
                let value = parseInt(changes[key]);
                balancesDataJson[id][text] += value;
            }
            fs.writeFile('balances.json', JSON.stringify(balancesDataJson, null, 2), (err) => {
                if (err) {
                    callback(err);
                    return;
                }
            });
        });

    })
    getBalances((err, people) => {
        if (err) {
            console.error('Chyba při získávání zůstatků:', err);
            res.status(500).send('Nastala chyba při získávání zůstatků');
            return;
        }
        res.render('uspech', {title: 'Úspěšně zapsáno do systému', year: new Date().getFullYear()});
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

function sortByKey(array, key) {
    return array.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

app.listen(3001)