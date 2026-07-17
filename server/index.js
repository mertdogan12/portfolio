const express = require('express');
const cors = require('cors');
const YahooFinance = require('yahoo-finance2').default;

const yahoo = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3333;

// Kuratierte Auswahl an handelbaren Symbolen, die auf der Kaufen-Seite
// standardmäßig (ohne Suchbegriff) mit Live-Kursen angezeigt werden.
const KAUFBARE_SYMBOLE = [
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'TSLA', 'NVDA', 'META', 'SAP', 'SIE.DE', 'VOW3.DE'
];

app.get('/api/list', async (req, res) => {
  try {
    const quotes = await yahoo.quote(KAUFBARE_SYMBOLE);

    const aktien = quotes.map(quote => ({
      id: quote.symbol,
      name: quote.longName || quote.shortName || quote.symbol,
      aktuellerKurs: quote.regularMarketPrice || 0,
      aenderung: quote.regularMarketChange || 0,
      beschreibung: '',
    }));

    res.json(aktien);
  } catch (err) {
    res.status(502).json({ message: 'Konnte Aktienliste nicht laden.' });
  }
});

app.get('/api/search/:query', async (req, res) => {
  try {
    const result = await yahoo.search(req.params.query);

    const aktien = result.quotes
      .filter(quote => quote.isYahooFinance && quote.quoteType === 'EQUITY' && quote.symbol)
      .map(quote => ({
        id: quote.symbol,
        name: quote.longname || quote.shortname || quote.symbol,
        aktuellerKurs: 0,
        aenderung: 0,
        beschreibung: '',
      }));

    res.json(aktien);
  } catch (err) {
    res.status(502).json({ message: `Suche nach "${req.params.query}" fehlgeschlagen.` });
  }
});

app.get('/api/quote/:id', async (req, res) => {
  try {
    const quote = await yahoo.quote(req.params.id);

    res.json({
      id: req.params.id,
      name: quote.shortName || req.params.id,
      aktuellerKurs: quote.regularMarketPrice || 0,
      aenderung: quote.regularMarketChange || 0,
      beschreibung: '',
    });
  } catch (err) {
    res.status(502).json({ message: `Konnte Kurs für "${req.params.id}" nicht laden.` });
  }
});

app.listen(PORT, () => {
  console.log(`Quote-Server läuft auf http://localhost:${PORT}`);
});
