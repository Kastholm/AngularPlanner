# Web programmering

## Problem 1

### Node.js & Express

Præsenter mulighederne for at lave webapplikationer med Node.js, og den service som anvendelse af Express tilfører. Præsentationen skal blandt andet redegøre for den standardarkitektur, som Express’ generator tilfører webapplikationer, samt overvejelser om hvordan MVC tilgodeses i den arkitektur. Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen. Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.
!['image'](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg)

#### Inden Node.js.

- Inden Node.js kom til i 2009 Ryan Dahl. Skulle alt backend køres igennen sprog som fx. C#, Python, PHP mm.
  JavaScript kunne dengang kun benyttes som et frontend værktøj der kunne køre i web browsere.

#### Hvad er Node.js?

- Node.js programmificerer din applikations JavaScript, som almindeligvis kun kan køre i en webbrowser.
  Node.js gør det muligt at bruge JavaScript til at lave programmeringsopgaver, der tidligere var forbeholdt andre sprog, såsom at interagere med filsystemet, starte servere, håndtere netværksforespørgsler og meget mere. Ergo --> FullStack.

| Funktioner/egenskaber  | Beskrivelse                                                                                                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server-side JavaScript | Gør det muligt at bruge JavaScript til at skrive `server-side kode istedet for client-side.` <br> --> `JavaScript som backend` --> `Server procedurer, http anmodninger, intagere med database`                                                       |
| Non-blocking I/O       | Gør det muligt at håndtere mange samtidige forbindelser uden at blokere programmet. F.eks. API http anmodninger, der ikke skal vente på hinanden. <br> --> `I/O gruppekald`, `asynkron JS`                                                            |
| Event-driven           | Bruger en event loop til at håndtere begivenheder, hvilket gør det muligt for programmet at fortsætte med at køre, mens det venter på en operation til at fuldføre. <br> --> `App kører trods error callback grundet Non-blocking I/O og Event Loop ` |

<img src="https://techblog.topdesk.com/wp-content/uploads/2017/05/event-loop.jpg" alt="Event Loop Image">

| Funktioner/egenskaber      | Beskrivelse                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NPM (Node Package Manager) | Et pakkeværktøj, der gør det nemt at administrere tredjepartsbiblioteker. --> `Package.json`                                                                                                                      |
| Single-threaded            | Node.js kører på en enkelt tråd, men kan håndtere mange samtidige forbindelser takket være non-blocking I/O og event-loop. <br> --> `1 CPU Tråd` `1 tråd om alt arbejde - Non bock I/O til at lave flere opgaver` |
| Microservices              | Node.js er godt egnet til at bygge microservice arkitekturer, hvor en stor applikation er delt op i mange små services. <br> --> ` mange forskellige server.js fx.`                                               |

<img src="https://www.cuelogic.com/wp-content/uploads/2021/06/monolithic-and-microservices-architecture.jpg.webp">

| Funktioner/egenskaber  | Beskrivelse                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Real-time Applications | Ideelt for realtidsapplikationer som chatapps, live streaming, online spil og samarbejdsværktøjer. <br> --> `grundet event loop` `WebSockets` |

#### Egen brug af node.js

Kommandoer/scripts og package.json
https://github.com/Kastholm/AngularPlanner/blob/main/package.json

#### Hvad er Express.js?

<img src="https://expressjs.com/images/express-facebook-share.png">

Express er et populært webapplikationsframework til at gøre det lettere at bygge webapplikationer på serverns side. Vi kan anvende Express.js til at oprette routere, definere middlewares, håndtere forespørgsler mm.

```
// Eksempel med Express.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware, der logger anmodningens tidspunkt
app.use((req, res, next) => {
  console.log(`Anmodning modtaget: ${new Date()}`);
  next();
});

// API-rute til at hente brugerdata
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Simulerer en asynkron databaseforespørgsel
  setTimeout(() => {
    const user = { id: userId, name: 'John Doe' };
    res.json(user);
  }, 1000);
});
```

Vanilla Node.js

```
// Eksempel med ren Node.js
const http = require('http');
const url = require('url');

const port = 3000;

// Middleware, der logger anmodningens tidspunkt
const loggerMiddleware = (req, res, next) => {
  console.log(`Anmodning modtaget: ${new Date()}`);
  next();
};

// API-rute til at hente brugerdata
const usersRouteHandler = (req, res) => {
  const userId = url.parse(req.url, true).query.id;
  // Simulerer en asynkron databaseforespørgsel
  setTimeout(() => {
    const user = { id: userId, name: 'John Doe' };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }, 1000);
};

```

#### Model-View-Controller (MVC)

##### Router

`Definer din lavede rute ind til dataen`

```
//Server.js
const monthDataRouter = require('./routes/monthData');
app.use('/months', monthDataRouter);
```

##### View

` frontend med JSON data` `Sender request til Controller via Events`

```
//goals.component.html
<div *ngFor="let goal of goals; let i = index">
    <div class="goal">
        <p>{{goal.description}}</p>
        <input type="checkbox" id="checkbox{{i}}" (click)="toggleGoal(goal)" [checked]="goal.done">
        <label for="checkbox{{i}}"></label>
    </div>
</div>
```

##### Model

`Laver strukturen p[ din database struktur`

```
//Monthdata.js
const monthSchema = new Schema({
  name: String,
  goals: [goalSchema],
  weeks: {
    type: [weekSchema],
    default: [{}], // Create four empty weeks by default
  },
  learned: [childSchema],
  notes: [childSchema],
});
```

##### Controller

`Indhenter data via routerens path, ved hj;lp fra data fra Model og View`

```
//MonthData.js
router.post("/addMonth", async (req, res) => {
  try {
// Kommer fra VIEW
    const monthName = req.body.name;
// Kommer fra MODEL
    const newMonth = new Month({
      name: monthName,
    });
// Kommer fra MODEL
    await newMonth.save();
// Kommer fra MODEL
    res.json(newMonth);
  } catch (err) {
// Kommer fra CONTROLLER
    res.json({ message: err });
  }
});
```

<img src="https://miro.medium.com/v2/0*Qf1s2lG86MjX-Zcv.jpg">

##### Express Generator

npm install express-generator -g
express <Your-ExpressJsApplication-Name>

```
myapp
├── bin
│   └── www
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
├── app.js
└── package.json

```

## Problem 2

### Node.js & Express & NPM

Præsenter node package manager, npm. Hvad stiller den til rådighed for node/express, og hvordan. Der
skal primært lægges vægt på npm’s egen infrastruktur, og hvordan den anvendes både fra
kommandolinjen og fra Node. Perspektiver også til anvendelse af moduler i browserbaseret JavaScript.
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

!['image'](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png)

### Hvad er NPM

Node Package Manager (NPM) er en `pakke manager for JavaScript`, og det er standardpakkehåndtereren for Node.js, en JavaScript-runtime, der kører på servere. `NPM blev skabt i 2010` og har siden været et uvurderligt værktøj for JavaScript-udviklere.

NPM gør det muligt for udviklere at `installere andre folks kodepakker i deres egne applikationer.` En "pakke" i denne sammenhæng er bare en kodebibliotek, som løser en specifik opgave eller en samling af relaterede opgaver.

### Fr NPM

Inden Node kom i 2009 og gjorde JS server-sided, og ESM i 2015 brugte man script tags inde i sine HTML-filer.

- Hvad er Node? `Server-Sided (http, database, server etc.)` `Non-block I/O Asynkront` `Event Loop`

### Pakkehaandtering

NPM pakker kan haandteres ved:

- npm init - lave en package.json
- npm i -g // Eller lokalt
- npm i package@18.2 // Definer version
- npm uninstall
- npm update packagename

### Version Kontrol

NPM holder `versionskontrol via package.json`, der gr at hele teamet k'rer de samme versioner af libraries
`devDependencies --> kun under udvikling`

```
{
  "name": "mit-projekt",
  "version": "1.0.0",
  "description": "Et eksempelprojekt",
  "main": "index.js",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.9.10"
  },
  "devDependencies": {
    "nodemon": "^2.0.3"
  },
}
```

### Dependency Management

`administrere projektafhængigheder mellem et team` <br>
https://github.com/Kastholm/GrusvejDK/blob/main/package-lock.json

### Script Running

https://github.com/Kastholm/GrusvejDK/blob/main/package.json

### NPM brug af Node.js

`fx const express = require("express");`
https://github.com/Kastholm/AngularPlanner/blob/main/server/server.js

### Node_Modules --> Microservice

```
node_modules
  ├── express
  │   ├── lib
  │   ├── node_modules
  │   │   ├── body-parser
  │   │   ├── cookie
  │   │   └── ...
  │   ├── index.js
  │   └── package.json
  ├── other-package
  ├── another-package
  └── ...
```

### ESM (ECMAScript Modules) 2015

- import module from 'node_modules'

## Problem 3

### MongoDB og dens anvendelse i Express applikationer

Præsenter MongoDB databasesystemet både som type og konkret i en Express-applikation.
Gennemgangen skal fokusere både på adgang til server, forespørgsler, og ikke mindst på model-
begrebet i applikationsarkitekturen.
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

!['image'](https://www.thesoftwarereport.com/wp-content/uploads/2022/08/MongoDB.png)

### Hvad er MongoDB

`Dokumentorienteret databasesystem` `Lagrer data i JSON` <br> `Bruges ofte med Express til at lave fullstack apps`

### Forbindelse og anvendelse af MongoDB

- Ops't Database (Se MongoAtlas)
- Forbind Program
  https://github.com/Kastholm/AngularPlanner/blob/main/server/server.js
- Router
  `Definer din lavede rute ind til dataen`

```
//Server.js
const monthDataRouter = require('./routes/monthData');
app.use('/months', monthDataRouter);
```

- Typisk med Express.js MVC model.
  `Se linje 102`
  https://github.com/Kastholm/AngularPlanner/blob/main/server/routes/monthdata.js

## Problem 4

### Vue Widgets

Præsenter og diskuter anvendelsen af Vue Widgets i web-applicationer, der ikke er lavet som Vue
Single Page Applications. Der ønskes diskussion af både HTML-siden og af JavaScript-siden af emnet.
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

!['image'](https://applogik.dk/wp-content/uploads/2021/04/logo-vuejs.png)

### Hvad er Vue?

Vue.js er et `progressivt JavaScript-framework`, der bruges til at `opbygge brugergrænseflader (UI)` til moderne webapplikationer. Det er `kendt for sin fleksibilitet`, `letvægtsarkitektur` og `enkel syntaks`, der gør det nemt at lære og bruge. `SPA` --> erstatter JS.

### Components

- Forklar
  https://github.com/andersravn32/kold-festival/tree/main/ssr-client

### VUE ops;tning ---> SPA

- https://github.com/Kastholm/dartcp/tree/main/client/src

### Vue Widgets uden SPA.

Vue-komponenter, der kan bruges som genanvendelige UI-elementer i ikke-Vue-webapplikationer.

1. integrer det i HTML

```
<div id="app">
  <my-widget></my-widget>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  // JavaScript-siden
  Vue.component('my-widget', {
    template: '<div>{{ message }}</div>',
    data() {
      return {
        message: 'Dette er en Vue Widget!'
      }
    }
  });

  new Vue({
    el: '#app'
  });
</script>
```

2. Brug den evt p en anden HTML side

```
<!-- Eksisterende HTML-side -->
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <!-- Eksisterende indhold på siden -->

    <!-- Stedet, hvor Vue-widgeten skal indsættes -->
    <div id="my-widget-container"></div>

    <!-- JavaScript-fil, der indeholder Vue-widgetens definition -->
    <script src="my-widget.js"></script>

    <!-- JavaScript-fil, der initialiserer Vue.js og binder Vue-widgeten til det relevante HTML-element -->
    <script>
      new Vue({
        el: '#my-widget-container'
      });
    </script>
  </body>
</html>
```

3. Fx ved en vejr API

- lav en weather.vue &

```
<template>
  <div class="weather-widget">
    <h2>{{ city }}</h2>
    <p>{{ weather }}</p>
    <p>{{ temperature }}°C</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      weather: '',
      temperature: null
    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    fetchWeatherData() {
      const apiKey = 'YOUR_API_KEY';
      const apiUrl = 'https://api.example.com/weather'; // Erstat med den faktiske API-url

      axios
        .get(apiUrl, {
          params: {
            city: 'Copenhagen',
            apiKey: apiKey
          }
        })
        .then(response => {
          this.city = response.data.city;
          this.weather = response.data.weather;
          this.temperature = response.data.temperature;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.weather-widget {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>

```

- og i app.js

```
import Vue from 'vue';
import WeatherWidget from './WeatherWidget.vue';

new Vue({
  el: '#app',
  components: {
    WeatherWidget
  }
});
```

## Problem 5

### Vue Applications

Præsenter fremstillingen af en Vue applikation. Give et overblik over den skabte filstruktur, og fokuser
derefter på komponenter. Hvad er komponenter, hvilken rolle spiller de, og hvad består de af. Hvor
mange eller få er der behov for?
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

!['image'](https://applogik.dk/wp-content/uploads/2021/04/logo-vuejs.png)

### Hvad er Vue?

Vue.js er et `progressivt JavaScript-framework`, der bruges til at `opbygge brugergrænseflader (UI)` til moderne webapplikationer. Det er `kendt for sin fleksibilitet`, `letvægtsarkitektur` og `enkel syntaks`, der gør det nemt at lære og bruge. `SPA` --> erstatter JS.

### VUE ops;tning ---> SPA

- https://github.com/Kastholm/dartcp/tree/main/client/src

### Components

- Forklar
  https://github.com/andersravn32/kold-festival/tree/main/ssr-client

## Problem 6

### Vue Routing

Giv en præsentation af begrebet routing i Web applikationer generelt og i Vue i særdeleshed. Beskriv
hvordan vi får routing ind i en Vue applikation, og diskuter derefter detaljeret syntaks og rolle. Brug
gerne terminology fra MVC arkitekturen, og sammenlign også gerne med konventionelle Node/Express
applikationer.
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.

!['image'](https://applogik.dk/wp-content/uploads/2021/04/logo-vuejs.png)

### Hvad er Vue?

Vue.js er et `progressivt JavaScript-framework`, der bruges til at `opbygge brugergrænseflader (UI)` til moderne webapplikationer. Det er `kendt for sin fleksibilitet`, `letvægtsarkitektur` og `enkel syntaks`, der gør det nemt at lære og bruge. `SPA` --> erstatter JS.

### Hvad er Routing?

- `Browser Ruter ind til vores filer.`
  Routing er en central del af webapplikationer, der styrer, hvordan forskellige dele af applikationen vises og interagerer med brugerne. Routing giver mulighed for at definere og håndtere forskellige ruter (URL-stier), der svarer til forskellige visninger og funktionaliteter i applikationen.

https://github.com/Kastholm/dartcp/blob/main/client/src/router/index.ts

Router-View
https://github.com/Kastholm/dartcp/blob/main/client/src/App.vue

Router-Link
En Vue-komponent, der bruges til at vise den aktuelle rute i vores applikationens layout. Denne komponent placeres normalt i rodkomponenten (App.vue) og fungerer som en pladsholder, hvor routeren kan indsætte den relevante komponent for den aktuelle rute.

En Vue-komponent, der bruges til at oprette links mellem forskellige ruter i vores applikation. Vi kan bruge denne komponent til at `generere anker-tags med de rigtige href-værdier` baseret på vores rutedefinitioner.
https://github.com/Kastholm/dartcp/blob/main/client/src/components/playerTable.vue

#### Eksempel p Vue Routing

1. Lav Router

```
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/contact',
    component: Contact,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
```

2. Link til forskellige routes

```
<div id="app">
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/contact">Contact</router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
</div>
```

Når en bruger klikker på et < router-link >-element, håndterer Vue Router det internt og opdaterer URL'en uden at sende en anmodning til serveren. Routeren matcher derefter den angivne sti med en rute fra konfigurationen og indlæser det tilknyttede komponent i < router-view >-elementet.

Denne tilgang giver en mere flydende og hurtigere brugeroplevelse, da kun de nødvendige komponenter indlæses og opdateres, mens resten af siden forbliver intakt.


## Problem 7

### Vue Forms and Backend Connectivity

Forms i web-applikationer er en hjørnesten i muligheden for brugeren til at levere data til en
applikation. Redegør for og eksemplicifer anvendelsen af formularer i Vue-applikationer. Der ønskes
detaljer om både HTML-siden og komponentens rolle i form-anvendelsen, ligesom der skal reflekteres
over forskellen i form-håndteringen mellen Vue-applikationer og traditionelle Node/Express
applikationer.
Fragmenter af kode til detaljeret illustration af dine overvejelser skal være en del af præsentationen.
Du bør fortrinsvis bruge eksempler fra egne projekter og opgaver som eksempler i din gennemgang.


!['image'](https://applogik.dk/wp-content/uploads/2021/04/logo-vuejs.png)

### Hvad er Vue?

Vue.js er et `progressivt JavaScript-framework`, der bruges til at `opbygge brugergrænseflader (UI)` til moderne webapplikationer. Det er `kendt for sin fleksibilitet`, `letvægtsarkitektur` og `enkel syntaks`, der gør det nemt at lære og bruge. `SPA` --> erstatter JS.

### Vue Forms

HTML-siden og komponentens rolle:

1. HTML-siden kan indeholde formularer, hvor Vue-komponenter bruges til at binde inputfelter og indsamle brugerdata.
Vue-komponenten kan håndtere formulardata, validere indtastninger og udføre handlinger som f.eks. at sende data til en backend API.
Data binding:

2. Vue's tovejs data binding gør det nemt at binde formularinputfelter til komponentdata.
Ved hjælp af v-model-direktivet kan inputfelter automatisk opdatere komponentdata, og ændringer i komponentdata opdaterer også inputfelterne.
Eventhåndtering:

3. Vue-komponenten kan lytte efter formularhændelser som f.eks. indsendelse (submit) eller feltændringer (input).
Ved hjælp af eventhåndtering kan komponenten reagere på formularaktioner, udføre validering og udføre passende handlinger.
Backend connectivity:

4. Når det kommer til at forbinde en Vue-formular til en backend, kan formdata sendes til en backend API ved hjælp af AJAX-anmodninger eller fetch API.
Vue kan bruge biblioteker som Axios eller Vue Resource til at foretage HTTP-anmodninger og kommunikere med serveren.
Forskelle mellem Vue-applikationer og traditionelle Node/Express-applikationer:

5. I traditionelle Node/Express-applikationer ville formhåndteringen normalt være baseret på serverrendering og POST-anmodninger til en serverrute.
I Vue-applikationer kan formhåndteringen ske på klientsiden ved hjælp af Vue-komponenter og AJAX-anmodninger til en backend API, hvilket resulterer i mere interaktivitet og responsivitet.

```
<template>
  <form @submit="handleSubmit">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="formData.name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" v-model="formData.email" required>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
      },
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      // Send form data to backend API using AJAX or fetch
      // Example with Axios:
      // axios.post('/api/form', this.formData)
      //   .then(response => {
      //     // Handle response
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
    },
  },
};
</script>
```

```
I dette eksempel kan brugeren indtaste navn og e-mail i formularfelterne, og når formen indsendes, vil handleSubmit-metoden blive kaldt. Denne metode kan derefter sende formdata til en backend API ved hjælp af en AJAX-anmodning.

Denne tilgang giver Vue-applikationer mulighed for at håndtere formularer dynamisk, validere indtastninger og sende data til en backend API uden at skulle genindlæse hele siden.
```