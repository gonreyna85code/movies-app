const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;


app.use(cors());


app.get("/movie/:name", async (req, res) => {
  const name = req.params.name;
  const TorrentSearchApi = require("torrent-search-api");
  TorrentSearchApi.enableProvider("1337x");
  let data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
  for(let i = 0; i < data.length; i++){
  const magnet = await TorrentSearchApi.getMagnet(data[i]);
    data[i].magnet= magnet;
  }
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
