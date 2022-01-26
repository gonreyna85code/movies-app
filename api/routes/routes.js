const Router = require("express");

const isAuthenticated = function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) return next();
  res.send("No Disponible");
};

const router = Router();

router.get("/movie/:name", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  console.log(name);
  const TorrentSearchApi = require("torrent-search-api");
  try {
    await TorrentSearchApi.enableProvider('KickassTorrents');
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
    for (let i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      data[i].magnet = magnet;
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("No Disponible");
  }
});

module.exports = router;
