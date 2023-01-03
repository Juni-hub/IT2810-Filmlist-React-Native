# Filmliste i React Native

## Beskrivelse av applikasjonen
Applikasjonen er en React Native-applikasjon for Android og iOS. Vi har lagt inn en wheel-picker for å filtrere på år som kun fungerer for mobil og en web-visning av applikasjonen fungerer ikke. Man må også være på NTNU VPN for at applikasjonen skal fungere.

Applikasjonen henter data fra en database og viser et utvalg filmer utgitt fra 1900 til i dag. Hver film vises på appen som et kort og er beskrevet med tittel og utgivelsesår. Hver film kan trykkes på for å vise mer informasjon om rollebesetning og sjanger. Det er mulig å finne en ønsket film ved å filtrere på en enkel eller en kombinasjon av filterene tittel, sjanger og utgivelsesår. Videre er det mulig å sortere dataene i stigende eller synkende rekkefølge etter utgivelsesår. Det er også mulig for brukeren å legge til sine egne filmer i databasen ved å trykke på "Add New Film" knappen.

### Krav til innhold og utførelse i applikasjonen
- Applikasjonen tillater å søke etter en film basert på tittel.
- Applikasjonen tillater filtrering basert på sjanger og utgivelsesdato.
- Applikasjonen tillater sortering basert på stigende eller synkende utgivelsesdato.
- Applikasjonen viser 8 filmer av gangen for å kunne håndere den store datamengden. Brukeren kan få opp flere filmer ved å bla til videre sider nederst på siden.
- Applikasjonen gir mer detaljer om en gitt film ved å trykke på et filmkort.
- Applikasjonen gir brukeren mulighet til å legge til egne filmer.

## Kjøre prosjektet
For å kjøre applikasjonen må prosjektet først klones fra gitlab. 

Følgende kommandoer kan kjøres i terminalen for å starte serveren.
```
$ cd backend/web
$ npm install
$ npm run dev
```
Følgende kommandoer kan kjøres i terminalen for å starte React Native applikasjonen.
```
$ cd frontend/web
$ npm install
$ npx expo start
```
Etter å ha startet React Native applikasjonen vil det komme en QR kode i terminalen. Denne kan skannes i Expo Go appen (Android) eller via kamera appen (IOS). Det er også mulig å samhandle direkte med serveren på http://localhost:4000/graphql.

## Backend
### Backend fil struktur
```
backend/web
├───models
│   │   Post.model.js
├───resolvers.js
├───typeDefs.js
└───index.ts
```

- `models` inneholder database schemaet, PostSchema, brukt til å definere feltene til et filmobjekt.
- `resolvers.js` inneholder funksjoner for graphql queries og mutations.
- `typeDefs.js` inneholder graphql typer for å definere hvilke types, queries og mutations som skal være med i applikasjonen.
- `index.js` starter serveren og kobler til databasen.

### Beskrivelse av bruk av teknologier
#### MongoDB

Gruppen har valgt å bruke en MongoDB database for å lagre data. MongoDB er en dokumentbasert database, noe som vil si at den lagrer data i et JSON-lignende format. Grunnen til at vi valgte en NoSQL-database er fordi vi kun skal ha en type data i databasen, ikke flere typer med relasjoner til hverandre. MongoDB er den mest populære NoSQL-databasen i verden blant annet fordi den er gratis, horisontalt skalerbar og det finnes mye dokumentasjon om den. Vi brukte MongoDB Compass til å ha oversikt over og å legge inn startdata i databasen.

For å kommunisere med databasen brukes biblioteket [mongoose](https://mongoosejs.com/docs/). For å ha kontroll på hva slags type data vi har i databasen bruker vi et Schema som definerer strukturen på dokumentene i kolleksjonen vi henter fra. Gruppen definerer et Schema kalt PostSchema for å definere hvilke felter som skal være med i et Post (film) objekt. Feltene som benyttes er _id, title, year, cast og genres. _id og title er påkrevde felter. Et Schema gjør det enklere å samhandle med databasen, for eksempel hente ut dokumenter basert på filtre og validere at felter er riktig type. Samtidig kan det gi komplikasjoner dersom man vil endre på Schemaet ved en senere anledning. Vi har ikke tenkt til å endre på databasen og valgte derfor å bruke Schema likevel.

#### Express JS, GraphQL, Apollo Server

Gruppen bruker en Express-integrasjon av Apollo Server som sin GraphQL-server. [GraphQL](https://graphql.org/) er et query språk som benyttes for å samhandle med databasen gjennom mongoose. Med GraphQL har serveren kun et endepunkt og man kommuniserer med serveren ved å definere hva man ønsker å få i respons i querien. Vi valgte Apollo Server fordi den er enkel å sette opp og det finnes mye dokumentasjon på nettet. Man får også en nettside ([GraphQL Server](http://localhost:4000/graphql)) når serveren kjører hvor man kan teste ut ulike queries, noe som gjør debugging lettere. 

Filen TypeDefs definerer de nødvendige typene, spørringene og mutasjonene som er nødvendige i GraphQL schemaet. Her definerer gruppen en type kalt Post, som definerer felter som skal være i hvert filmobjekt. Videre definerer vi en type kalt Query for å definere en funksjon for å hente ut ønsket data, samt en type kalt Mutation for å definere en funksjon for å lage ett nytt objekt.

Selve funksjonene for å hente eller endre dataen i databasen er skrevet i filen resolvers. Her er det laget en Query kalt getFilteredPosts, som brukes til å hente ut filtrert/ufiltreret data fra databasen. Denne funksjonen returnerer data avhengig av hvilke filter som tilføres. Det er mulig å filtrere på tittel, sjanger, rollebesetning og år, eventuelt en blanding av alle nevnte filter. Det er også mulig å sortere dataen basert på stigende eller synkende utgivelsesår.

Videre har gruppen skrevet en Mutation kalt createPost som legger til nye filobjekter i databasen. Filmobjektet må ha en tittel, men det er valgfritt om det har et årstall, rollebesetning eller sjanger. Hvert objekt får tildelt en ID når det opprettes.

## Frontend
Fra prosjekt 3 til prosjekt 4 har vi byttet ut React-klienten med en React Native-klient. Dette er gjort for å lage en mobil versjon av applikasjonen. Gruppen har tatt utgangspunkt i komponentene og layouten fra prosjekt 3, men gjort visse endringer i designet for å støtte det nye formatet. Videre valgte gruppen å bytte ut design-bibliotekene Ant Design og Bootstrap til fordel for NativeBase. Dette er fordi NativeBase er et populært design-bibliotek for React Native applikasjoner. Resterende biblioteker som ble brukt i prosjekt 3, herunder redux for Local State Management og jest for enhetstesting, er støttet i React Native og derfor fremdeles brukt.

### Frontend fil struktur
```
__tests__
|   __snapshots__
|   App.test.tsx
|   FilmCard.test.tsx
|   FilmList.test.tsx
components
│   AddFilm.tsx
│   FilmItem.tsx
│   FilmList.tsx
|   FilmCard.tsx
|   YearPicker.tsx
queries
│   filmQueries.ts
redux
|   actions.ts
|   store.ts
utils
│   Interface.ts
App.tsx
```
- `__tests__` inneholder alle enhetstester og snapshottester for å skjekke at applikasjonen fungerer som tiltenkt.
- `components` inneholder komponentene som brukes i applikasjonen.
- `queries` inneholder funksjoner for graphql queries og mutations.
- `redux` inneholder funktionalitet for å lagre og håndere data fra en Redux Store.
- `utils` inneholder interfaces brukt i applikasjonen.
- `App.tsx` er root komponenten til applikasjonen.

### Beskrivelse av bruk av teknologier
#### React m/ Typescript

Applikasjonen bruker React Native for å lage UI komponentene som brukeren ser på applikasjonen. React Native er implementert med Typescript, som er et programmeringsspråk basert på JavaScript ved at det er lagt til statiske type definisjoner.

#### Apollo Client

Apollo Client brukes i React applikasjonen for å koble til GraphQL APIet. I komponenten FilmList kjører vi spørringer og mutasjoner med Apollo Client for å hente og endre data fra serveren. Vi valgte Apollo Client fordi den er designet for React og er anbefalt å bruke sammen med Apollo Server.

#### Redux
Redux er et Javascript-bibliotek brukt for Local State Management i applikasjonen. Redux er brukt til å lagre filtrene brukeren har lagt inn.

#### Design komponenter (Native-Base)
I prosjekt 3 brukte gruppen React UI bibliotekene Ant Design og Bootstrap for å designe applikasjonen. I prosjekt 4 skulle vi forandre applikasjonen til en mobil versjon og byttet derfor til React Native. På grunn av dette valgte gruppen å bruke et annet UI bibliotek da Ant Design er utviklet for webapplikasjoner. Gruppen byttet til et UI bibliotek kalt Native-Base som gir støtte for ulike komponenter for React Native. Grunnen til at vi valgte Native-Base var fordi flere av komponetene vi brukte i Ant Design er støttet i Native-Base. Dermed kunne mye av koden fra prosjekt 3 gjenbrukes i de nye komponentene. 

### Testing
Prosjektet har skrevet enhetstester ved hjelp av Jest. 

#### Jest
Jest er et test rammeverk for Javascript og Typescript og kan lett integreres med React Native. I prosjektet vårt har vi skrevet tester for å sjekke at applikasjonen oppfører seg som den skal. I tillegg til dette er det laget to snapshottester. Snapshottest sikrer at brukergrensesnittet ikke endrer seg uventet. Når denne testen kjøres, blir det laget to snapshot filer. Hvis det allerede eksisterer en snapshot fil tilhørende en test, vil denne overskrives. Man kan finne alle snapshot filene i mappen `__snapshots__`. For å teste med Jest må man skrive følgende kommandoer:
```
$ cd frontend/web
$ npm test
```

## Diskusjon
### Universell utforming

Universell utforming handler om at applikasjoner skal lages på en måte som gjør de tilgjengelige for alle, uavhengig av faktorer som alder, funksjonsevne eller utdanningsnivå. Web Content Accessibility Guidelines (WCAG) er en standard for å sikre universell utforming på nettsider og applikasjoner. Retningslinjene er bygget opp av fire prinsipper. Under listes prinsippene og tiltakene gruppen har gjort for å sikre at de følges.  

1. Mulig å oppfatte: Innhold presenteres for brukerene på måter de kan oppfatte.
- Alt innhold og deres funksjonalitet er beskrevet og presentert for brukeren
- Layouten til applikasjonen er tilpasset alle skjermer uten at informasjon eller struktur går tapt
- Farge og fargekontraster er brukt på en måte som gjør innholdet synlig og tilgjengelig for alle brukere.

2. Mulig å betjene: Innholdet skal være mulig å betjene uavhengig av hvordan brukeren navigerer.
- Alt innhold er tilgjengelig uavhengig av hvilken telefon brukeren har

3. Forståelig: Innholdet på er forståelig
- Gjennomtenkt bruk av font, tekststørrelse og farger
- Lettlest og forståelig språkbruk
- Forklarende titler til innhold

4. Robust: Innhold fungerer uavhengig av hjelpemidler du bruker 
- Innholdet er kompatibel med og testet på ulike mobiler kjørende på både IOS og Android

### Bærekraftig utvikling

Applikasjonen benytter pagination og laster kun inn deler av innholdet (8 elementer) til en hver tid. Brukeren kan selv velge om de ønsker å laste inn mer innhold når de har sett alle elementene. Dette gir generelt sett lavere datatrafikk ettersom brukeren mest sannsylig ikke trenger gå igjennom alle objektene.

Komponentene på applikasjonen er minimale, men hensiktsmessige for å formidle innholdet til brukeren. Gruppen bruker verken bilder, videoer eller GIFs da disse krever mye datatrafikk og energibruk på klient. Videre er applikasjonen laget med dark mode. Dette er på grunn av at mørkere farger krever mindre energi og er av resultat mer miljøvennlig enn bruken av lysere farger.
