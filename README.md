# Systém pro uchování a úpravu statistik
## Nastavení aplikace
1. Naklonujte si tento repozitář:
`git clone https://github.com/JedlaTypek/statisticky-system.git`
2. Nainstalujte všechny dependencies příkazem:
`npm install`
3. Do souboru people zapište osoby, které chcete mít. Osobám se automaticky založí profil v balances.json při spuštění serveru.
4. Spusťte serverovou aplikaci příkazem
`npm start`

## Používání aplikace
### Zápis údajů
Při zápisů údajů doplňte **rozdíly údajů** od hodnot, které se zobrazují na jeho profilu. Například 5 (přidá 5) nebo -5 (odebere 5). Je také možnost upravovat **hromadně skupinu lidí**. Stačí zakliknout checkbox **"Upravovat hromadně"** na profilu a místo posledního profilu se vždy nachází **hromadná úprava**. V hromadné úpravě je také možnost zakliknout všechny profily a upravovat všechny. Po vyplnění všech hodnot můžete kliknout na tlačítko **Odeslat změny** a změny se propíšou do souboru **balances.json**. Zároveň se seznam změn zapíše do souboru **changes.json**
### Statistika
Ve statistice se zobrazují **všechny aktuální údaje** o jednodlivých osobách. Po kliknutí na jeden z klíčů (peníze, síla, ...) se podle něj údaje **seřadí** vzestupně nebo sestupně. Po kliknutí znovu se **obrátí pořadí**. Je možné také **vyhledávat** ve jménech, kdy program daný string hledá **kdekoliv** ve jméně.

## To Do
Splněné milníky a nějaké cíle do budoucna:
- [x] Automatické přidávání lidí z people.json do balance.json
- [ ] Automatické odebírání lidí z balance.json do archiv.json
- [x] Možnost ovládání více profilů najednou
- [x] Funkční zapisování uživatelského vstupu do souboru balances.json
- [x] Logování změn do souboru changes.json
- [x] Možnost řazení podle jednotlivých klíčů
- [x] Možnost vyhledávání podle jména
- [ ] Přidat další stránku, kde se místo rozdílů budou zadávat kompletně nové hodnoty
- [ ] Rozdělit stránku na veřejnou a administraci, aby se děti mohli koukat, jak na tom jsou, a vedoucí mohli hodnoty upravovat.