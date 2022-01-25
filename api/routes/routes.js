const Router = require("express");

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send("No Disponible");
};

const router = Router();

router.get("/movie/:name", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  const TorrentSearchApi = require("torrent-search-api");
  TorrentSearchApi.enableProvider("1337x");
  let data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
  for (let i = 0; i < data.length; i++) {
    const magnet = await TorrentSearchApi.getMagnet(data[i]);
    data[i].magnet = magnet;
  }
  res.send(data);
});

module.exports = router;
