# Dataintegration

### Problem 1

## Forbrug af Web Services på Web Sites

I har igennem studiet arbejdet med integrationen af data fra andre web services. Diskutér detaljeret
hvilke problemer/fordele brugen af dette kan have.
API’er er vigtige, vi vil gerne vide hvordan de fungerer i detaljer, hvad det er og hvordan de bruges. Du
skal i diskussionen komme ind på både hvordan de bruges fra en applikation, og hvordan de testes
under idviklingen.
Fragmenter af kode til illustration af dine overvejelser skal være en del af præsentationen.
Du bør bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

#### Bindeled mellem Front og Backend ved User events.

!['API'](https://s3.ap-south-1.amazonaws.com/myinterviewtrainer-domestic/public_assets/assets/000/000/533/original/Web_Service.png?1624433262)

#### API'er og hvordan de fungerer

En `API, eller Application Programming Interface,` er en kontrakt mellem softwarekomponenter, der definerer, hvordan de interagerer. Den `består af et sæt regler, protokoller, og værktøjer, herunder metoder, datastrukturer, og endpoints, der bruges til at anmode om og udveksle data.` API'er `fungerer som broer,` der tillader forskellige softwareapplikationer at kommunikere og interagere med hinanden på en sikker og struktureret måde.

1. API (Application Programming Interface) - interaktion mellem komponenter
2. Tjener - Metafor

   !['API'](https://i0.wp.com/blog.codeanalogies.com/wp-content/uploads/2020/01/image-2.png?resize=730%2C458&ssl=1)

3. Transfer over HTTP. (Database / other API)
   !['API'](https://learn.g2.com/hubfs/G2CM_FI167_Learn_Article_Images_%5BAPI%5D_Infographic_V1a.png)
4. User --> request data --> internet --> server --> response data

```
// Lav Server (Express.js)
const express = require('express');
const app = express();
const port = 3000;

// Hente data fra en database
app.get('/weather', (req, res) => {
    const weatherData = {
        location: 'Copenhagen',
        temperature: 20,
        condition: 'Sunny'
    };
    res.json(weatherData);
});
// server response
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Importer axios-biblioteket
const axios = require('axios');

// Definer URL'en til API'en
// Send en HTTP GET-anmodning til API'en
// Anvend JS promises then og catch
axios.get('http://localhost:3000/weather')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });

```

5. User(event) --> request data --> internet( HTTP-anmodning Axios) --> server(Express.js -> WeatherAPI) --> Database(response data)

Link til PlannerProjekt i Angular <https://github.com/Kastholm/AngularPlanner>

### Problem 2

## REST Interfaces og deres brug i dataintegration

Giv et overblik over det praktiske arbejde med etableringen af et REST interface som en service på
internettet.
Diskuter teknikker og værktøjer der anvendes. Hvilke funktionaliteter omfatter REST hensigtsmæssigt,
og hvordan dokumenteres det for brugerne. Hvordan varetages datasikkerheden omkring REST-
applikationens data?
Fragmenter af kode til illustration af dine overvejelser skal være en del af præsentationen.
Du bør bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

#### Se punkt 1 først

### REST-interface og hvordan de fungerer

Representational State Transfer, er et arkitektonisk mønster for at bygge netværksapplikationer, især web services. Et RESTful interface (eller API) er kendetegnet ved følgende egenskaber:

1. `Client-Server Architecture:` `Klient & Server Adskilt.` `Anmod om data, send data`
2. `Statelessness:` `uafhængige definerede anmodninger endpoints`
3. `Uniform Interface:` `standardisered metoder / HTTP Requests / Get method`

- Vis punkt1 REST Api - Forskel på SOAP og GQL - Datasikkerhed

```
// Importer Express.js-biblioteket
// Express.js er en web server ramme, der giver mulighed for at bygge HTTP servere i Node.js
const express = require('express');

// Initialiser en ny Express.js-applikation
// Denne applikation vil være vores web server
const app = express();

// Definer portnummeret, vores server vil lytte på
const port = 3000;

// Definer en HTTP GET-handler for '/weather' endpointet
// En del af det uniforme interface i REST. Vi definerer en ressource ('/weather')
// og et endpoint til at interagere med den (GET)
app.get('/weather', (req, res) => {

    // Dette kunne repræsentere data hentet fra en database
    // I en rigtig applikation, ville vi hente denne data fra en database, baseret på detaljerne i forespørgslen
    const weatherData = {
        location: 'Copenhagen',
        temperature: 20,
        condition: 'Sunny'
    };

    // Send data tilbage til klienten som JSON
    // Dette er en del af det stateless princip i REST. Vi sender alle data, klienten har brug for, i responsen
    res.json(weatherData);
});

// Start serveren, så den lytter på den definerede port
// Dette starter serveren, så den kan acceptere indkommende HTTP-anmodninger
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Importer axios-biblioteket
// Axios er et bibliotek, der gør det nemt at lave HTTP-anmodninger fra Node.js
const axios = require('axios');

// Send en HTTP GET-anmodning til vores '/weather' endpoint
// Dette er klienten, der interagerer med vores RESTful API. Den sender en GET-anmodning til vores '/weather' ressource
axios.get('http://localhost:3000/weather')
    .then(response => {
        // Log responsdataen til konsollen
        // Hvis anmodningen er vellykket, vil dataen fra serveren være i 'response.data'
        console.log(response.data);
    })
    .catch(error => {
        // Log eventuelle fejl til konsollen
        // Hvis der sker en fejl med anmodningen, vil det blive fanget her
        console.error('An error occurred:', error);
    });

### GraphQL API

// Send en HTTP POST-anmodning til vores '/graphql' endpoint med vores GraphQL-query
axios.post('http://localhost:4000/graphql', {
    query: `
        query {
            getWeather(location: "Copenhagen") {
                location
                temperature
                condition
            }
        }
    `
})

### SOAP API

POST /WeatherService HTTP/1.1
Host: www.example.com
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://www.example.com/GetWeather"

<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.example.com/">
  <SOAP-ENV:Body>
    <ns1:GetWeather>
      <ns1:Location>Copenhagen</ns1:Location>
    </ns1:GetWeather>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

```

Link til PlannerProjekt i Angular <https://github.com/Kastholm/AngularPlanner>

### Problem 3

## JSONs rolle og brug i dataintegration

Giv et overblik over hvad JSON er, og hvad dets anvendelse er specielt i en World Wide Web kontekst
med fokus på at integrere JSON data på websites.
Diskuter JSON dokumenter, deres struktur og syntax. Der ønskes fokus på struktur og validitet som
forudsætning for anvendelsen. Diskuter hvordan JavaScript håndterer JSON dokumenter.
Fragmenter af kode til illustration af dine overvejelser skal være en del af præsentationen.
Du bør bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.
© nml, 2023-04-29 4/8

### Hvad er JSON

JSON `(JavaScript Object Notation)` er et `letvægts dataudvekslingsformat,` der bruges til at `repræsentere strukturerede data.` JSON bruges bredt i World Wide Web-konteksten, især til `dataintegration på websites.` JSON's popularitet skyldes dens `enkle syntaks, læsbarhed og evne til at repræsentere komplekse datastrukturer.`

```
// Eksempel på et JSON-dokument
const jsonData = {
  "name": "John Doe",
  "age": 30,
  "city": "New York"
};

// Konverter JavaScript-objektet til JSON-tekst
const jsonString = JSON.stringify(jsonData);
console.log(jsonString);
// JSON-tekst: {"name":"John Doe","age":30,"city":"New York"}

// Konverter JSON-teksten tilbage til et JavaScript-objekt
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);
// Navn: John Doe

// Håndtering af JSON-data i et JavaScript-projekt
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Arbejd med JSON-data her
    console.log(data);
    // Hentede JSON-data: [JSON-data fra den eksterne API]
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```

Struktur og syntaks af JSON-dokumenter:

1. JSON-dokumenter `består af nøgle-værdi-par,` hvor `nøglerne er strenge` og `værdierne kan være forskellige datatyper som tekststrenge, tal, boolean-værdier, lister, eller endda indlejrede JSON-objekter.`
2. JSON-dokumenter er struktureret som `hierarkiske træer,` der kan `indeholde indlejrede objekter og lister af objekter.`
3. Nøgle-værdi-par er `adskilt af kolon (:),` `og parrene er adskilt af komma (,).`
4. `Strengværdier skal være anført med dobbelte anførselstegn (""), og tal og booleans er ikke anført.`
5. JSON `tillader ikke kommentarer,` så alle dele af dokumentet skal være gyldig JSON-syntax.

```
## Eksempel

{
  "name": "John Doe",
  "age": 30,
  "email": "johndoe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "traveling", "cooking"]
}
```

Link til PlannerProjekt i Angular <https://github.com/Kastholm/AngularPlanner>
<br>
Tilgå mongoDB database

### Problem 4

## XMLs rolle og brug i dataintegration

### Hvad er XML

XML (Extensible Markup Language) er et `markup-sprog,` der bruges til at `repræsentere struktureret data.`

1. XML er et `tekstbaseret format` designet til at `repræsentere og udveksle data mellem forskellige systemer og platforme.`
2. Det `bruger tags` til at `definere struktur og hierarki af dataelementer.`
3. Det er `udvidbart,` hvilket betyder, at `brugere kan definere deres egne tags og struktur` for at passe til deres specifikke behov.

```
// Prolog der angiver XML version og tegnsæt
<?xml version="1.0" encoding="UTF-8"?>
// Rote element -> indeholder child elementer
<book>
  <title>Harry Potter and the Philosopher's Stone</title>
  <author>J.K. Rowling</author>
  <year>1997</year>
  <genre>Fantasy</genre>
</book>
```

`Håndtering af XML-dokumenter i JavaScript:`

`JavaScript har ikke en indbygget XML-parser som JSON,` men der er forskellige `biblioteker og metoder,` der kan bruges `til at arbejde med XML i JavaScript.` Nogle populære metoder inkluderer:

DOMParser: En indbygget JavaScript-klasse, der kan bruges til at parse XML-dokumenter og oprette en DOM-struktur.
Tredjepartsbiblioteker som xml2js og `fast-xml-parser`

```
const xmlString = `
<book>
  <title>Harry Potter and the Philosopher's Stone</title>
  <author>J.K. Rowling</author>
  <year>1997</year>
  <genre>Fantasy</genre>
</book>
`;

// Opret et DOMParser-objekt
const parser = new DOMParser();

// Pars XML-strengen til et XML-dokument
const xmlDoc = parser.parseFromString(xmlString, "application/xml");

// Få adgang til elementer i XML-dokumentet
const title = xmlDoc.querySelector("title").textContent;
const author = xmlDoc.querySelector("author").textContent;
const year = xmlDoc.querySelector("year").textContent;
const genre = xmlDoc.querySelector("genre").textContent;

// Udskriv værdierne
console.log("Titel:", title);
console.log("Forfatter:", author);
console.log("År:", year);
console.log("Genre:", genre);
```

### Well-formedness og validitet af XML:

- `Well-formedness` refererer til, `om et XML-dokument følger syntaktiske regler og strukturkrav for at være gyldigt XML.` Et well-formed XML-dokument skal overholde følgende regler:

1. Hvert `starttag skal have et tilsvarende sluttag,` f.eks. <element></element>.
2. Elementer skal være korrekt indlejret, dvs. de skal `åbnes og lukkes i den rigtige rækkefølge uden overlap.`
3. `Attributværdier skal være anført i anførselstegn,` f.eks. attribut="værdi".
4. `Tags og attributter skal være i korrekt casing` (stor- og småbogstaver er vigtige).
5. `Specielle tegn skal escapes,` f.eks. &lt; for < og &amp; for &.

- Validitet er et yderligere trin og refererer til, om et XML-dokument overholder et specifikt dokumenttype-definitionsskema (DTD) eller XML-skema. Et validt XML-dokument følger ikke kun syntaktiske regler, men også reglerne og strukturen, der er defineret af skemaet. Dette sikrer, at XML-dokumentet overholder de forventede regler og begrænsninger for dataene.

```
<order>
  <customer name="John &amp; Doe">
    <address>
      <street>Main Street</street>
      <city>New York</city>
    </address>
  </customer>
  <items>
    <item>
      <name>Product 1</name>
      <price>$19.99</price>
    </item>
    <item>
      <name>Product 2</name>
      <price>$24.99</price>
    </item>
  </items>
</order>
```

### Hvorfor JSON i stedet?

1. `Letlæselig og letforståelig:` JSON er designet til at være `letlæseligt for både mennesker og maskiner`. Det bruger en simpel syntaks baseret på nøgle-værdi-par, hvilket gør det nemt at læse, skrive og forstå. XML-notationen kan være mere verbose og kompleks, hvilket kan gøre det sværere at arbejde med.

2. `Mindre overhead:` JSON er generelt mere kompakt og har mindre overhead sammenlignet med XML. `JSON-bruger mindre tegn til at repræsentere data, hvilket fører til mindre båndbreddeforbrug og mindre pladsbehov på servere og klienter.` Dette er især vigtigt i ressourcebegrænsede miljøer som mobile enheder og netværk med lav båndbredde.

3. `Nem integration med JavaScript:` `JSON er en naturlig del af JavaScript` og kan nemt konverteres mellem JSON-objekter og JavaScript-objekter ved hjælp af JSON.parse() og JSON.stringify()-metoderne. Dette gør det nemt at arbejde med JSON-data i JavaScript-applikationer uden behov for ekstra parsing eller konvertering.

4. `Bedre understøttelse i moderne webteknologier:` `JSON har bredere og mere omfattende understøttelse i moderne webteknologier og API'er.` Mange frameworks, biblioteker og programmeringssprog har indbygget understøttelse til JSON, hvilket gør det nemt at sende, modtage og manipulere JSON-data på tværs af forskellige platforme og miljøer.

5. `Lettere at arbejde med i moderne API-design:` `JSON er blevet den foretrukne dataformatstandard` i moderne API-design og udveksling af data mellem klienter og servere. Det er mere fleksibelt og lettere at opbygge og manipulere datastrukturer i JSON-format, hvilket giver mulighed for mere effektive og moderne API-implementeringer.

### Problem 5

## Udviklingsprocessen omkring Dataintegration

1. #### API'er og hvordan de fungerer

- Se problem 1

2. #### Hvorfor og hvordan dokumenteres et API i forhold til en konventionel backend?

   `Dokumentation af et API er afgørende for udviklere,` da det giver dem `nødvendige oplysninger om, hvordan API'et fungerer` og hvordan de kan `bruge det korrekt.` API-dokumentationen beskriver typisk ressourcer, endpoints, tilladte metoder, dataformater og eventuelle autentificerings- eller autorisationskrav. Dette kan gøres ved at oprette en detaljeret API-reference, der beskriver hver endpoint, dets parametre og forventet svarformat.

```
openapi: 3.0.0
info:
  title: Vejr API
  version: 1.0.0
paths:
  /weather:
    get:
      summary: Hent vejrdata
      description: Henter vejrdata for en bestemt placering
      parameters:
        - in: query
          name: location
          description: Placeringen, hvorfra vejrdata ønskes
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Succesfuld anmodning
          content:
            application/json:
              schema:
                type: object
                properties:
                  location:
                    type: string
                    description: Navnet på placeringen
                  temperature:
                    type: number
                    description: Temperaturen i Celsius
                  condition:
                    type: string
                    description: Vejrforholdet
```

Brug af API

```
const axios = require('axios');

// Definér placeringen, for hvilken du vil hente vejrdata
const location = 'Copenhagen';

// Udfør GET-anmodningen med den korrekte URL og parameter
axios.get('http://api.example.com/weather', {
  params: {
    location: location
  }
})
  .then(response => {
    // Håndter svaret
    const weatherData = response.data;
    console.log(weatherData);
  })
  .catch(error => {
    // Håndter eventuelle fejl
    console.error('An error occurred:', error);
  });
```

Giver disse oplysninger til API'en

```
paths:
  /weather:
    get:
      summary: Hent vejrdata
      description: Henter vejrdata for en bestemt placering
      parameters:
        - in: query
          name: Copenhagen
          description: Placeringen, hvorfra vejrdata ønskes
          required: true
          schema:
            type: string
```

3. #### Hvordan kan et API anvendes fra JavaScript?

   `JavaScript kan bruges til at interagere med et API ved hjælp af bla. AJAX-anmodninger eller moderne fetch API.` Ved at bruge disse metoder kan udviklere sende asynkrone anmodninger til API'et og behandle de returnerede data i JavaScript-koden.

`HTTP anmodning med AJAX`

```
// Opret en ny XMLHttpRequest-forespørgsel
const xhr = new XMLHttpRequest();

// Angiv anmodningens metode (GET), URL og om anmodningen skal være asynkron (true)
xhr.open('GET', 'https://api.example.com/data', true);

// Definer en funktion, der skal kaldes, når anmodningens status ændres
xhr.onreadystatechange = function () {
  // Hvis anmodningen er fuldført og statuskoden er 200 (OK)
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    // Konverter responsens tekst til JSON-format
    const response = JSON.parse(xhr.responseText);

    // Behandle responsdata her
  }
};

// Send anmodningen
xhr.send();
```

`HTTP anmodning med fetch`

```
// Udfør en GET-anmodning til API'et ved hjælp af Fetch API
fetch('https://api.example.com/data')
  .then(response => response.json()) // Konverter responsen til JSON-format
  .then(data => {
    // Behandle data her
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
```

4. #### Hvilken dokumentation er nødvendig?

   `Vigtig dokumentation for et API inkluderer en API-reference,` der beskriver alle tilgængelige endpoints, de accepterede parametre, forventede svarformater og eventuelle autentificerings- eller autorisationskrav. Det kan også være nyttigt at inkludere eksempler på anmodninger og svar for at hjælpe udviklere med at forstå API'ets funktionalitet.

Vigtige elementer, der bør inkluderes i API-dokumentationen:

1. `Endpoint-beskrivelse:` Hver endpoint skal dokumenteres og beskrives, inklusive dens `formål, inputparametre og outputformat`.

2. `Accepterede metoder:` Dokumenter, `hvilke HTTP-metoder der er tilladt` for hver endpoint, f.eks. GET, POST, PUT eller DELETE.

3. `Parametre:` `Hvis en endpoint kræver parametre,` skal disse dokumenteres, herunder deres navne, typer og eventuelle begrænsninger.

4. `Svarformater:` `Angiv de mulige svarformater, f.eks. JSON eller XML,` og give eksempler på det forventede svarformat.

5. `Fejlhåndtering:` `Beskriv, hvordan fejl håndteres af API'et,` herunder statuskoder, der returneres i tilfælde af fejl, og eventuelle fejlbeskeder.

6. `Autentificering og autorisation:` `Hvis API'et kræver autentificering` eller autorisation, skal dokumentationen give instruktioner om, hvordan dette implementeres, herunder krævede nøgler, tokens eller andre metoder.

```
# User API Dokumentation

## Ressource: Users

### Endpoint: /users

- **Metode**: GET
- **Beskrivelse**: Hent alle brugere.
- **Svarformat**: JSON
- **Eksempel på respons**:
```

5. #### Hvad kan udviklere gøre, hvis dokumentationen er mangelfuld?
   Hvis API-dokumentationen er mangelfuld, kan udviklere undersøge modtagne data ved at analysere responsens datastruktur og feltnavne. De kan også bruge testværktøjer som Postman til at udforske API'et og foretage testanmodninger for at se, hvordan API'et reagerer og hvilke data der returneres.

#### Analyser API:

1. Analyser responsens datastruktur

```axios.get('https://api.example.com/data')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('An error occurred:', error);
});
```

2. Brug testværktøjer som Postman <br>
   Sende anmodninger til API'et og `se de returnerede svar.` Dette giver mulighed for at forstå, hvilke data og ressourcer der er tilgængelige, og `hvordan API'et reagerer på forskellige anmodninger.`

3. Søg yderligere information <br>
   Søg kilder / API fora for at finde oplysninger.

4. Find API med doc. <br>
   Overvej at skift til en API med doc.

### Problem 6

## AJaX, fetch eller Axios brugt med XML

Præsenter en af de nævnte teknologier og dens rolle i dataintegrationen i en moderne webapplikation.
Din præsentation skal fortælle hvad teknologien er og hvor vi bruger den, og hvordan den bruges. Vi
interesserede i AjaX i sammenhæng med XML som brugt i JavaScript, både med JavaScript som
modtager og som afsender.
Du bør bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang. Hvis du ikke
har brugt det vil vi gerne høre hvordan du kunne have brugt det.

#### Hvad er AJAX

AJAX står for Asynchronous JavaScript and XML. Det er en `samling webudviklingsteknikker`, der `bruges på klient-siden for at skabe asynkrone webapplikationer.` Med AJAX kan websider `sende data` til, og `hente data` `fra en server asynkront (i baggrunden)` uden at forstyrre visningen og adfærden af ​​den eksisterende side.

1. Asynchronous: Betyder, at `kommunikationen mellem klienten (webbrowser) og serveren kan ske uafhængigt af brugerens interaktioner med websiden.` Dette betyder, at data kan opdateres, sendes eller hentes i baggrunden, hvilket forhindrer nødvendigheden af ​​at genindlæse hele siden.

2. JavaScript: JavaScript er det programmeringssprog, der bruges til at implementere AJAX på websiden. JavaScript-kode er ansvarlig for at sende HTTP-anmodninger til serveren og behandle de svar, det modtager.

3. And.

4. XML: eXtensible Markup Language. Tidligt i AJAX' historie blev data ofte sendt mellem klienten og serveren som XML. I dag bruges imidlertid ofte andre dataformater, såsom `JSON` (JavaScript Object Notation), på grund af dets større fleksibilitet.

#### Eksempel.

!['API'](https://bsscommerce.com/blog/wp-content/uploads/2020/05/ajax-compare-with-normal-theme.jpg)

Webapplikation - Brugeren kan indtaste en by, og applikationen vil vise det aktuelle vejr for den by.

`Uden AJAX ville hele siden skulle genindlæses,` hver gang brugeren ville kontrollere vejret for en anden by. Med AJAX kan siden i stedet sende en anmodning til serveren, når brugeren indtaster en ny by, og opdatere kun den del af siden, der viser vejrinformationen.

```
function getWeather(city) {
  fetch('https://api.weather.com/v1/' + city)
    .then(response => response.xml())  // Forudsat at serveren returnerer XML
    .then(data => {
      // Opdater DOM-elementet med det nye vejr
      document.getElementById('weather').innerHTML = data;
    });
}

<weather>
  <temperature>20</temperature>
  <humidity>80</humidity>
  <windSpeed>5</windSpeed>
</weather>
```

Her defineres en funktion, getWeather, som `bruger fetch API'en til at sende en HTTP GET-anmodning til en vejr-API.` fetch `returnerer et Promise,` der løser til serverens respons. Vi bruger derefter `.then metoden til at håndtere dette Promise.`

Vi bruger `response.xml() for at parse responsen som XML` - dette er forudsat, at serveren returnerer data i XML-format. I mange moderne applikationer vil data ofte blive `returneret i JSON-format i stedet,` hvor vi ville bruge `response.json().`

Derefter bruges en anden `.then metode til at håndtere dataen,` vi har fået fra serveren. Her antager vi, at der er et `element i vores HTML med id'et 'weather'`, og vi `opdaterer dets indhold` med det nye vejrdata.

#### Fremvis app - database

### Problem 7

## AJaX, fetch eller Axios brugt med JSON

```
function getWeather(city) {
  fetch('https://api.weather.com/v1/' + city)
    .then(response => response.json())  // Forudsat at serveren returnerer JSON
    .then(data => {
      // Opdater DOM-elementet med det nye vejr
      document.getElementById('weather').innerHTML = data;
    });
}

{
  "temperature": 20,
  "humidity": 80,
  "windSpeed": 5
}

```
