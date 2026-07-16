const express = require('express');
const cors = require('cors');
const YahooFinance = require('yahoo-finance2').default;

const yahoo = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

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
