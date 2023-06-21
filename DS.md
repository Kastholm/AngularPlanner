# Datasikkerhed

## Problem 1

### Datasikkerhed & TLS

Giv en beskrivelse af, hvad sikkerhed i webapplikationer er, hvordan det generelt
fungerer og hvordan det anvendes.
Giv en detaljeret beskrivelse af funktionaliteten af TLS. Diskutér potentielle fordele
og ulemper ved teknologien og dens betydning for navigationen i webapplikationen.
Placér TLS i landskabet af krypteringsmetoder, og diskutér, hvordan det adskiller sig
fra andre krypteringsmetoder.

#### Hvad er Datasikkerhed?

Datasikkerhed henviser til forskellige teknikker og processer, der bruges til at beskytte webapplikationer mod hackerangreb, trusler og andre angreb. Ved et af disse angreb kan der i v;rste tilf;lde blive stj[let data heriblandt fortrolige oplysninger (Dankort oplysninger) mm.

#### Forskellige niveauer af Datasikkerhed.

<img src='https://www.atatus.com/glossary/content/images/2021/06/Application-Security--1-.jpeg'>

1. Applikationsniveau :
   Sikkerheden mellem Front og Backend. Validerer request og response app <--> server via valgte libraries.
   https://planner.webtify.website/

<img src='https://www.comodo.com/images/how-firewalls-work.png'>

2. Host-niveau :
   Handler om sikkerhed p serverne selv. Hold dem opdaterede, firewall, eller s\rg for at kun autoriserede har adgang.  
   https://www.server.webtify.dk

3. Netv;rksniveau:
   Handler om sikkerheden mens data er i transit. S[ dataer ikke kan blive kigget p[ af andre under transit.

4. TLS

<img src='https://assets.website-files.com/5ff66329429d880392f6cba2/619787442bbea6180862f44a_TLS%20Preview.png'>

En af de mest popul;re sikkerhedsprokoller. S;tter en kontrakt op mellem klient og server, og et konkret 'handshake' skal til for at kunne tilg[ denne data. Det er n'gler som kun klient og server kender.

#### Fordele ved TLS

- Sikkerhed ved data i transit.
- Dataintegritet: Sikrer at dataerne ikke er blevet ;ndret under transit (MAC)
- Autentifikation: Ved hj;lp af certifikater, kan TLS verificere identiteten under kommunikation.
- Fortrolighed: Ved kryptering af data, sikrer TLS at kun afsender og modtager kan l;se dataen.

#### Ulemper ved TLS

- Performance: En mild forsinkelsei dataoverf'rsel
- Kompleksitet: Sv;rt at implementerer og veligeholde for alle.
- Kompabilitet: UNderst'tter ikke meget gamle systemer.

#### Krypteringsmetoder

- Assymetrisk kryptering
  Indledende handshake for at udveksle den symmetriske n'gle. 2 forskellige n'gler, client og server snakker sammen hvis de passer laver de en symmetrisk n;gle.
- Symmetrisk kryptering
  Samme n;gler som client og server har skabt sammen, derfor kun dem der kan req res data.
  Smider n'glen v;k efter brug. De anvender denne kode hver gang dfe skal komunikkere, og bruger hashing til at l[se beskederne.

## Problem 2

### GDPR og Webapplikationer

Giv et overblik over GDPR, herunder dens formål og vigtigste bestemmelser.
Diskutér, hvad en udvikler kan gøre for at sikre brugerens privatliv, når
vedkommende benytter en webapplikation.
Diskutér, hvilke tiltag virksomhederne kan tage for at sikre sig selv og deres data.
Brug gerne virkelige cases for at understøtte dine udsagn.
Diskutér relevante teknologier og metoder, som kan hjælpe virksomheder med at
beskytte persondata.

#### Hvad er GDPR

`General Data protection regulation`

En lov indf'rt af EU i 2018.
Med m[let om at beskytte borgeres personlige data.

1. Rettigheder om at f[ deres data slettet.
2. Strammere restriktion p[ dataoverf'rsel
3. Samtykke. Cookie policy mm.
4. B'der for firmaer der ikke overholder

#### Som udvikler

1. indhent kun de mest n'dvendige dataer.
2. S'rg for ordentlig sikkerhed af data.
3. Fremvise indhentet data til brugerne.

#### Som virksomhed

1. Regelmæssige sikkerhedsrevisioner og risikovurderinger.
2. Uddannelse af medarbejdere i sikker praksis.
3. Implementering af et incident response team, der kan reagere hurtigt på sikkerhedsbrud.
4. Brug af stærke krypteringsmetoder til at beskytte data.
5. Overholdelse af alle gældende love og bestemmelser, såsom GDPR.

#### TLS punkt 1

## Problem 3

### OWASP Top Ten Project

Beskriv OWASP Top Ten Project og giv et overblik over de 10 mest kritiske
sikkerhedsproblemer indenfor webapplikationer.
Giv en detaljeret beskrivelse af injections, herunder hvordan det virker og hvilke
konsekvenser, det kan have.
Diskutér, hvad man kan gøre for at forhindre injections.
Fragmenter af kode til illustration skal indgå i præsentationen.
Du bør bruge eksempler fra egne projekter og opgaver i din gennemgang.

<img src='https://simpliskills.in/wp-content/uploads/2021/07/Owasp-top-10-vulnerabilities-768x512.png'>

1. Injection: Dette `involverer udførelse af ondsindet kode i en applikation, ofte ved at udnytte dårlig inputvalidering.` Det kan føre til alvorlige konsekvenser, herunder tab af data eller kompromittering af hele systemet.

2. Broken Authentication: Dette dækker over `svagheder i metoderne til autentifikation og sessionhåndtering,` hvilket kan føre til `uautoriseret adgang til brugerdata og konti.`

3. Sensitive Data Exposure: Dette omhandler `manglende beskyttelse af fortrolige data,` såsom kreditkortoplysninger eller adgangskoder. Hvis disse data bliver eksponeret, kan det `føre til identitetstyveri eller økonomisk svindel.`

4. XML External Entity (XXE): Dette indebærer `udnyttelse af dårlig XML-behandling` `til at udføre angreb,` såsom at `læse fortrolige filer eller lancere Denial-of-Service (DoS) angreb.`

5. Broken Access Control: Dette refererer til `utilstrækkelig kontrol over, hvem der har adgang til hvilke ressourcer.` Det kan give ondsindede brugere uautoriseret adgang til følsomme data eller funktioner.

6. Security Misconfiguration: Dette omhandler `fejlkonfiguration af sikkerhedsindstillinger,` `såsom standardadgangskoder,` åbne filadgangsstier eller unødvendige funktioner, hvilket giver angribere en nem vej ind i systemet.

7. Cross-Site Scripting (XSS): Dette indebærer `indsættelse af ondsindet kode i websider,` som derefter udføres af klientens browser. Det kan give angribere `mulighed for at stjæle brugeroplysninger` eller udføre handlinger på brugernes vegne.

8. Insecure Deserialization: `når data konverteres` `fra et specielt format tilbage til sin oprindelige form.` `Hvis dette ikke gøres sikkert,` kan ondsindede personer udnytte det til at lave ondsindet kode og få adgang til fortrolige oplysninger.

9. Using Components with Known Vulnerabilities: Dette indebærer `brug af tredjepartssoftware eller biblioteker, der har kendte sikkerhedsproblemer.` Disse sårbarheder kan udnyttes af angribere til at kompromittere applikationen.

10. Insufficient Logging & Monitoring: Dette involverer `manglende implementering af tilstrækkelig logging` og `overvågning af systemaktivitet.` Det gør det `vanskeligt at opdage og reagere på sikkerhedsbrud i realtid.`

#### Injections

Injektioner (eng. injections) er en sårbarhed, der `opstår, når en applikation tillader ukontrolleret eksekvering af ukendt kode eller kommandoer.` `Dette kan ske, når applikationen ikke tilstrækkeligt validerer eller filtrerer brugerinput, der indgår i dynamiske forespørgsler eller kommandoer.` Injektioner er en almindelig og kritisk sårbarhed, der kan udnyttes af angribere til at udføre ondsindede handlinger, såsom at `få adgang til fortrolige oplysninger, ændre eller slette data, eller endda overtage kontrol over hele systemer.`

adgang til alle brugere

```
SELECT * FROM users WHERE username = '' OR '1'='1'
```

## Problem 4

### Hashing

Giv et overblik over kryptering og hashing, og forklar, hvad forskellen mellem de to
er.
Forklar i detaljer, hvad hashing er, og hvad dets rolle er i forbindelse med
webudvikling.
Diskutér forskellige hashing algoritmer, deres fordele og ulemper. Du skal også tage
stilling til, hvad der kendetegner en god hashing algoritme.
Fragmenter af kode til illustration skal indgå i præsentationen.
Du bør bruge eksempler fra dine egne projekter og opgaver i din præsentation.

#### Hvad er Hashing

Hashing er en proces, hvorved `data omdannes til en r;kke tegn, kaldet en hash-værdi eller en hash-kode.` Denne hash-værdi er unik for hver specifik data, hvilket betyder, at selv den mindste ændring i data vil resultere i en helt anderledes hash-værdi. I webudvikling bruges hashing primært til at sikre integriteten af data og som en metode til at gemme og sammenligne adgangskoder. <br>

1. Ensretning (Deterministisk): Hver gang du kører den samme data gennem den samme hash-funktion, får du altid den samme hash.

2. Énvejs-operation: Hash-funktioner er designet til at være énvejsoperationer, det betyder, at det er meget svært (næsten umuligt) at tage en hash og omdanne den tilbage til den oprindelige data.

3. Unikke outputs (Kollision-resistent): Selv den mindste ændring i indgangsdataene vil producere en helt anderledes hash. To forskellige data sæt vil, teoretisk set, aldrig producere den samme hash.

Nogle populære hashing algoritmer inkluderer:

1. MD5 (Message Digest 5): MD5 er en hurtig hashing algoritme, der genererer en 128-bit hash-værdi. Dog er det blevet bevist, at MD5 er sårbar over for kollisioner og er derfor ikke længere anbefalet til sikkerhedsmæssige formål.

2. SHA-1 (Secure Hash Algorithm 1): SHA-1 er en 160-bit hashing algoritme, der blev udviklet som en opgradering fra MD5. Men ligesom MD5 er SHA-1 også blevet betragtet som sårbar over for kollisioner og er blevet frarådet til brug i sikkerhedssammenhænge.

3. SHA-256 (Secure Hash Algorithm 256-bit): SHA-256 er en del af SHA-2-familien og bruger en 256-bit hash-værdi. Den anses for at være mere sikker end både MD5 og SHA-1 og er i øjeblikket meget udbredt i mange applikationer og sikkerhedsprotokoller.

```
const crypto = require('crypto');

// the string to be hashed
const value = 'testValue12';

// create a new sha256 hash object
const hash = crypto.createHash('sha256');

// provide the string to hash
hash.update(value);

// get the hexadecimal representation of the hash
const dig = hash.digest('hex');

console.log(dig);
'a76407f6576e6a8f9d40e238f923c62650f3f5b1c8f27c13c998bc45e4be5b14'
```

Når data hashes, anvendes en hash-algoritme til at beregne en unik hash-værdi, der er karakteristisk for den pågældende data. Selv den mindste ændring i data vil resultere i en helt anden hash-værdi. Hash-værdier bruges ofte til at identificere data, verificere dataintegritet (f.eks. ved at sammenligne hash-værdier før og efter overførsel) og opbevare adgangskoder sikkert (ved at sammenligne hash-værdien af brugerens indtastede adgangskode med hash-værdien, der er gemt i databasen).

Bruges fx. til fildownload eller adgangskoder.

https://github.com/Kastholm/AngularPlanner/blob/main/server/auth/authdata.js

## Problem 5

### Kryptering

#### Hvad er Kryptering

Kryptering er en metode til at omdanne læsbar information, kendt som "klartekst", til en form, der ikke kan læses uden en nøgle, kendt som "kryptotekst". Kryptering bruges til at beskytte data, især når de transmitteres over usikre netværk som internettet.

1. Symmetrisk kryptering: Dette er den mest grundlæggende form for kryptering, hvor den samme nøgle bruges til både at kryptere og dekryptere data. Tænk på det som en lås og nøgle - den samme nøgle, der låser låsen, kan også åbne den igen. Et eksempel på symmetrisk kryptering er AES (Advanced Encryption Standard).

2. Asymmetrisk kryptering: Dette er en mere avanceret form for kryptering, hvor der er to nøgler: en offentlig nøgle, der kan deles frit, og en privat nøgle, der holdes hemmelig. Hvis du krypterer data med den offentlige nøgle, kan det kun dekrypteres med den private nøgle, og omvendt. Dette er grundlaget for mange moderne sikkerhedsprotokoller, herunder SSL/TLS, der bruges til at sikre webtrafik. Et eksempel på asymmetrisk kryptering er RSA (Rivest-Shamir-Adleman).

<img style='background: #ffff;' src='https://showme.redstarplugin.com/d/1pECVPX6'>

1. HTTPS TLS 'Handshake --> symmetrisk n'gle mellem Browser og Facebook Server oprettes'.
2. L[s i URL indikerer sikker forbindelse.
3. Klik login, via TLS symmetrisk krypterings n'gle mellem browser og server, sendes hash v;rdien af dit password til Facebooks server. Grundet kryptering er transitten sikker og ingen har adgang til dataen.
4. Den sendte Hash v;rdi sammenlignes med den gemte hashv;rdi i databasen. Hvis de matcher, sender den et ok respons tilbage og logger dig ind.
5. Der lagres session informationer. session ID, User ID, IP Adresse mm.
6. Opret et Facebook opslag, med tekst og billede og klik p[ send.
7. Send krypteret data via sikker transit forbindelse med TLS til serveren.
8. Hvis ok, Dekrypter den sendte data tilbage til tekst og billede.
9. Tjek og Sessionsinformation og validere om den g;ldende session stadig er g;ldende. --> Er session-ID korrekt og stemmer det overens med din bruger.
10. Opretter posten i databasen.
11. [bner APP Messenger, klikker Enter for at sende en besked.
12. Genereres en symmetrisk Krypterings n'gle mellem en selv og sin kontakt.
13. Beskeden bliver krypteret og sendt til serveren.
14. Beskeden bliver sendt til modtageren af serveren dekrypteret, og modtages af modtageren.
15. Facebook har kun adgang til det krypterede data, derfor E2E End2End. Facebook er en mellemmand.

```
// Indlæs alle de nødvendige moduler
// dotenv tillader at indlæse miljøvariable fra en .env fil
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// bcrypt bruges til at hashe adgangskoder
const bcrypt = require("bcrypt");
// jsonwebtoken bruges til at oprette JSON Web Tokens
const jwt = require("jsonwebtoken");
const router = express.Router();
// express-rate-limit bruges til at begrænse antallet af anmodninger pr. IP-adresse
const rateLimit = require("express-rate-limit");
// Joi bruges til at validere input
const Joi = require('joi');

// Definer skemaet for brugere, inkluderer email og password felter
/* Unique */
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Definer modelen for brugere ved hjælp af mongoose
const User = mongoose.model("Users", userSchema);

// Indfør begrænsning på antallet af login-forsøg for at undgå brute-force angreb
/* IP LIMIT - Brute force attack */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutter
  max: 100, // begræns hver IP til 100 forespørgsler per vindue
  message: "For mange login-forsøg fra denne IP, prøv venligst igen senere",
});

// Definer skema til validering af brugerinput, det sikrer at input er i det rigtige format
/* VALIDERING */
const userInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

router.post("/login", loginLimiter, async (req, res) => {
  // Valider input først ved hjælp af Joi, det sikrer at input er i det rigtige format
  const { error } = userInputSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Find brugeren i databasen ved hjælp af email
    const userData = await User.findOne({ email: req.body.email });
    if (userData) {
      // Sammenlign den indtastede adgangskode med den hashede adgangskode i databasen
      /* HASHING sammenligning med database */
      const passwordMatches = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (passwordMatches) {
        // Hvis adgangskoderne matcher, opret et token med brugerens id som payload
        // Brug en hemmelig nøgle fra miljøvariablerne i stedet for en hardcoded værdi
        /* JWT 'Session token' - undgå session hijacking */
        const token = jwt.sign(
          { id: userData._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5h" }
        );
        // Send token tilbage til klienten
        return res.json({ token });
      }
      // Hvis adgangskoderne ikke matcher, send en fejl
      return res.status(401).send("Ugyldig adgangskode");
    }
    // Hvis brugeren ikke findes, send en fejl
    return res.status(404).send("Bruger ikke fundet");
  } catch (err) {
    // Hvis der er en serverfejl, send en fejl
    return res.status(500).send({ message: err });
  }
});

router.post("/createUser", async (req, res) => {
  // Valider input først ved hjælp af Joi, det sikrer at input er i det rigtige format
  /* VALIDERING */
  const { error } = userInputSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Tag brugerdata fra request
    const userData = req.body;
    // Generer et salt ved hjælp af bcrypt, dette bruges til at hashe adgangskoden
    /* Salt hash-var;rdi */
    const salt = await bcrypt.genSalt(10);
    // Hash adgangskoden ved hjælp af det genererede salt
    /* HASH Kodeord */
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    // Opret en ny bruger med email og den hashede adgangskode
    const newUser = new User({
      email: userData.email,
      password: hashedPassword,
    });
    // Gem den nye bruger i databasen og returner den gemte bruger
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    // Hvis der er en serverfejl, send en fejl
    res.json({ message: err });
  }
});
// Eksporter routeren for at bruge den i andre filer
module.exports = router;
```

```

// Eksempel: Udføre en parameteriseret SQL-forespørgsel med brugerinput

// Modtag brugerinput
const username = getUserInputFromForm();
// Antag at denne funktion henter brugerens indtastede brugernavn fra et inputfelt

// Opret en parameteriseret SQL-forespørgsel
const sql = 'SELECT * FROM users WHERE username = ?';

// Udfør forespørgslen ved hjælp af en sikkerhedsfunktion fra dit databasebibliotek
db.query(sql, [username], function(err, results) {
  if (err) {
    console.error(err);
    return;
  }

  // Behandle resultaterne
  console.log(results);
});

```

```

// Uden Passport
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Valider brugeroplysninger og udsted en token
  if (validateCredentials(username, password)) {
    const token = generateToken(username);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Ugyldige brugeroplysninger' });
  }
});


```

```
// Med Passport
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Autentifikation er succesfuld, udsted en token
  const token = generateToken(req.user.username);
  res.json({ token });
});


```

```
npm install passport passport-google-oauth20 express-session



const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Her håndtere vi brugerens data efter vellykket godkendelse
    // f.eks. gemme i en database eller oprette en lokal brugerprofil
    // Done() skal kaldes for at afslutte godkendelsesprocessen
    return done(null, profile);
  }
));

// Konfigurer Google OAuth2-ruter
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect eller gør noget andet efter vellykket godkendelse
    res.redirect('/profile');
  }
);

// Start serveren
app.listen(3000, () => {
  console.log('Serveren kører på http://localhost:3000');
});

```

```
const session = require('express-session');

app.use(session({
  secret: 'din-hemmelige-nøgle',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // Gem brugeroplysninger i sessionen
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Hent brugeroplysninger fra sessionen
  done(null, user);
});
```
