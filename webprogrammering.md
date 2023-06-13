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
Dvs. at den app du laver nu, grundet Node.js har programegenskaber ligesom andre programmeringssporg kan gøre. Hvilket resulterer i at JavaScript kan bruges som et backend værktøj. Ergo --> FullStack.


| Funktioner/egenskaber | Beskrivelse |
| --- | --- |
| Server-side JavaScript | Gør det muligt at bruge JavaScript til at skrive ``server-side kode istedet for client-side.`` <br> --> ``JavaScript som backend`` --> ``Server procedurer, http anmodninger, intagere med database`` |
| Non-blocking I/O | Gør det muligt at håndtere mange samtidige forbindelser uden at blokere programmet. F.eks. API http anmodninger, der ikke skal vente på hinanden. <br> --> ``I/O gruppekald``, ``asynkron JS`` |
| Event-driven | Bruger en event loop til at håndtere begivenheder, hvilket gør det muligt for programmet at fortsætte med at køre, mens det venter på en operation til at fuldføre. <br> --> ``App kører trods error callback grundet Non-blocking I/O og Event Loop ``  |

<img src="https://techblog.topdesk.com/wp-content/uploads/2017/05/event-loop.jpg" alt="Event Loop Image">

| Funktioner/egenskaber | Beskrivelse |
| --- | --- |
| NPM (Node Package Manager) | Et pakkeværktøj, der gør det nemt at administrere tredjepartsbiblioteker. --> ``Package.json`` |
| Single-threaded | Node.js kører på en enkelt tråd, men kan håndtere mange samtidige forbindelser takket være non-blocking I/O og event-loop. <br> --> ``1 CPU Tråd`` ``1 tråd om alt arbejde - Non bock I/O til at lave flere opgaver`` |
| Microservices | Node.js er godt egnet til at bygge microservice arkitekturer, hvor en stor applikation er delt op i mange små services. <br> --> `` mange forskellige server.js fx.`` |

<img src="https://www.cuelogic.com/wp-content/uploads/2021/06/monolithic-and-microservices-architecture.jpg.webp">

| Funktioner/egenskaber | Beskrivelse |
| --- | --- |
| Real-time Applications | Ideelt for realtidsapplikationer som chatapps, live streaming, online spil og samarbejdsværktøjer. <br> --> ``grundet event loop`` ``WebSockets`` |

#### Egen brug af node.js

Kommandoer/scripts og package.json
https://github.com/Kastholm/AngularPlanner/blob/main/package.json 


#### Hvad er Express.js?
<img src="https://expressjs.com/images/express-facebook-share.png">

Express er et populært webapplikationsframework til at gøre det lettere at bygge webapplikationer på serverns side. Vi kan anvende Express.js til at oprette routere, definere middlewares, håndtere forespørgsler mm.
