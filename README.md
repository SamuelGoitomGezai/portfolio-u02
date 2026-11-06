[Min publicerade portfoliosida](https://samuelgoitomgezai.github.io/portfolio-u02/)

## Reflektion

### Datans väg

På Projects-sidan hämtar `loadProjects()` i `projects.js` mina publika repon från GitHubs API med `fetch`. Först kontrollerar jag `response.ok`. Om svaret inte gick bra kastas ett fel som fångas i `catch`. Sedan gör jag om svaret till JSON och kontrollerar att det är en lista. Varje repo skickas till `createProject()`, som bygger ett kort med namn, beskrivning och länk. Korten läggs in i `#project-list`.

CV:t på About-sidan fungerar på samma sätt. `loadCv()` i `cv.js` hämtar `data/cv.json` och plockar ut `work` och `education` med destructuring.

### Två datakällor

`cv.json` är min egen fil som ligger i projektet. Jag vet alltid hur den ser ut, och den ändras bara när jag själv ändrar den. GitHubs API ligger på en annan server. Där kan internet vara nere eller GitHub begränsa antalet anrop, och vissa repon saknar beskrivning. Därför visar sidan ”Hämtar projekt från GitHub…” medan den laddar, ett felmeddelande med en knapp för att försöka igen om något går fel, och ett meddelande om det inte finns några projekt. Saknas beskrivning står det ”Beskrivning saknas på GitHub.”

### DOM och händelser

Som extra funktion valde jag ett sökfält på Projects-sidan. Det lyssnar på `input`, så listan filtreras direkt medan man skriver. `renderProjects()` jämför söktexten med projektens namn och beskrivning och visar bara de som matchar. Om inget matchar står det ”Inga projekt matchar din sökning.” Sidan lyssnar också på `click` på knappen ”Försök igen” och på knappen för mörkt läge.

### Markup jag inte skrev för hand

Jag byggde elementen med `createElement` och valde taggarna så att det blir rätt HTML. Varje projekt är ett `li` med ett `article` inuti som har en `h2`, en `p` och en länk. Varje jobb och utbildning i CV:t är ett `li` med en `h3`. Text läggs in med `textContent`. Sidorna validerar med 0 fel på W3C.

### Temaväxlingen

Färgerna ligger som CSS-variabler i `:root` i `base.css`. I `:root.dark` får samma variabler mörka färger. När man klickar på knappen lägger `theme.js` till klassen `dark` på `<html>`, och då byter hela sidan färg på en gång. Valet sparas i localStorage, så det finns kvar när man byter sida. Med variabler behöver jag bara byta värdet på ett ställe i stället för på varje element.

### När det inte gick som tänkt

När jag skulle committa skrev jag fel i några commit-meddelanden, till exempel ”Girhubs” i stället för ”GitHubs”. Jag ångrade de commitsen med Undo Last Commit i VS Code och skrev om meddelandena innan jag publicerade repot, så att historiken blev tydlig.

### Styrkor och brister

Jag är mest nöjd med att projekten hämtas automatiskt från GitHub. Lägger jag upp ett nytt repo syns det direkt. Jag gillar också att sidan visar vad som händer när den laddar eller när något går fel.

En brist är att flera av mina repon saknar beskrivning på GitHub, så korten blir lite tomma. Med mer tid skulle jag lägga till beskrivningar och visa vilket språk varje projekt är skrivet i. Menykoden upprepas fortfarande på varje sida, precis som i U01.

### AI-verktyg

Jag använde AI som hjälp när något inte fungerade, så som felhanteringen med `response.ok` och `try...catch` när projekten hämtas från GitHub. Jag testade sidan själv med Slow 4G och Offline i DevTools och på W3C. AI hjälpte mig också att rätta texten i README:n och med formateringen.
