const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require("torrent-stream");
const OpenSubtitles = require('subtitles.js');

const openSubtitles = new OpenSubtitles({
  apiKey: 'zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7',
});

const isAuthenticated = function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) return next();
  res.send("No Disponible");
};

const router = Router();

router.get("/user", isAuthenticated, (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("No Disponible");
  }
});

router.get("/movie/:name", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  TorrentSearchApi.enableProvider("1337x");
  try {
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 6);
    for (var i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      data[i].magnet = magnet;
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }
});

router.get("/video/:magnet", isAuthenticated, async (req, res) => {
  const magnet = req.params.magnet + req._parsedUrl.search;
  try {
    const engine = torrentStream(magnet);    
    engine.on("ready", function () {
      engine.files.forEach (async function (file) {
        if (file.name.endsWith(".mp4")) {
          res.setHeader("Content-Type", "video/mp4");
           file.createReadStream().pipe(res);           
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".mkv")) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".avi")) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        } 
      });
    });
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }
});

router.get("/subs/:name", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  try {
    const subtitles = await openSubtitles.search({
      sublanguageid: "spa",
      query: name,
    });
    res.send(subtitles);
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }
});

module.exports = router;
