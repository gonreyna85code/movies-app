const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require("torrent-stream");
const OpenSubtitles = require("subtitles.js");
const axios = require("axios");




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
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 20);
    for (var i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      data[i].magnet = magnet;
    }
    const torrents = data.map(e => {e.size.slice(0, -2)});
    res.send(torrents);
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
      engine.files.forEach(async function (file) {
        if (file.name.endsWith(".mp4") && !file.name.includes('sample')) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".mkv") && !file.name.includes('sample')) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".avi") && !file.name.includes('sample')) {
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

router.get("/subs/:name/:id", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  console.log(name + id);  
  const openSubtitles = new OpenSubtitles({
    apiKey: "zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7",
  });
  (async () => {
    try {
      const login = await axios({
        method: "POST",
        data: {username: 'gonreyna',
       password: 'Orchendor1',},
       url: 'https://api.opensubtitles.com/api/v1/login',
      });
console.log(login.data)
      const {token} = login.data;
        const rawSubs = await openSubtitles.subtitles().search({
        imdbid: id.slice(2),
        sublanguageid: "spa",
        query: name,
        languages: "es",
        limit: "best",
        type: "movie",
        gzip: true,
      });
      var subtitulos = [];
      const subs = rawSubs.data?.filter(
        (sub) => sub?.attributes?.feature_details.title === name
      );
      for (let i = 0; i < subs.length; i++) {
        const file = await openSubtitles.download().download(subs[i].id, token);
        console.log(file);
        subtitulos.push(file);
      }
      res.send(subtitulos);
  
      
    } catch (error) {
      console.error(error);
    }
  })();
  
});

module.exports = router;




