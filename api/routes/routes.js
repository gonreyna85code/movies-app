const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require("torrent-stream");
const OpenSubtitles = require("subtitles.js");
var subsrt = require('subsrt');
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
      engine.files.forEach(async function (file) {
        if (file.name.endsWith(".mp4") && !file.name.includes("sample")) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".mkv") && !file.name.includes("sample")) {
          res.setHeader("Content-Type", "video/mp4");
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".avi") && !file.name.includes("sample")) {
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
  const openSubtitles = new OpenSubtitles({
    apiKey: "zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7",
  });
  (async () => {
    try {
      const rawSubs = await openSubtitles.subtitles().search({
        imdbid: id.slice(2),
        sublanguageid: "spa",
        query: name,
        languages: "es",
        limit: "best",
        type: "movie",
        gzip: true,
      });
      const subs = rawSubs.data?.filter(
        (sub) => sub?.attributes?.feature_details.title === name
      );
      res.send(subs);
    } catch (error) {
      console.error(error);
    }
  })();
});

router.get("/subtitulo/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const openSubtitles = new OpenSubtitles({
    apiKey: "zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7",
  });
  try {
    const login = await axios({
      method: "POST",
      headers: {
        "Api-Key": "zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7",
        "Content-Type": "application/json",
      },
      data: { username: "gonreyna", password: "Orchendor1" },
      url: "https://api.opensubtitles.com/api/v1/login",
    });
    console.log(login.data);
    const { token } = login.data;
    const file = await openSubtitles.download().download(id, token);
    console.log(file);
    const subtitulo = await file?.link.createReadStream()
    var vtt = subsrt.convert(subtitulo, { format: "vtt", fps: 25 });
    vtt.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
