const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Endpoint resolver vt.tiktok.com shortlink
app.get("/resolve", async (req, res) => {
  try {
    const target = req.query.url;
    const response = await fetch(target, { redirect: "follow" });
    res.send({ finalUrl: response.url });
  } catch (err) {
    res.status(500).send({ error: "Failed to resolve URL" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});