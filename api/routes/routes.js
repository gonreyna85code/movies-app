const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require("torrent-stream");
const OpenSubtitles = require("subtitles.js");
const parse = require("subtitle");
const stringify = require("subtitle");
const axios = require("axios");
const fs = require("fs");

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

router.get("/video/:magnet", async (req, res) => {
  const magnet = req.params.magnet + req._parsedUrl.search;
  try {
    const engine = torrentStream(magnet);
    engine.on("ready", function () {
      engine.files.forEach(async function (file) {        
        if (file.name.endsWith(".mp4") && !file.name.startsWith("Sample")) {
          res.setHeader("Content-Type", "video/mp4");
          res.setHeader("Content-Length", file.length);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader(
            "Content-Range",
            `bytes 0-${file.length}/${file.length}`
          );
          
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".mkv") && !file.name.startsWith("Sample")) {
          res.setHeader("Content-Type", "video/mp4");
          res.setHeader("Content-Length", file.length);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader(
            "Content-Range",
            `bytes 0-${file.length}/${file.length}`
          );
          
          file.createReadStream().pipe(res);
          console.log("Streaming:", file.name);
        }
        if (file.name.endsWith(".avi") && !file.name.startsWith("Sample")) {
          res.setHeader("Content-Type", "video/mp4");
          res.setHeader("Content-Length", file.length);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader(
            "Content-Range",
            `bytes 0-${file.length}/${file.length}`
          );
          
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

router.get("/subtitulo/:id", async (req, res) => {
  const id = req.params.id;
  const openSubtitles = new OpenSubtitles({
    apiKey: "zc0UaUOf7OIsFhK9fBGJCbL5IkH98Ul7",
  });
  if (id === "null") {
    res.send("No Disponible");
  } else {
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
      const subtitulo = await axios({
        method: "GET",
        url: file.link,
      });
      var data = subtitulo.data;

      const srt2vtt = function (srt) {
        var vtt = "";
        srt = srt.replace(/\r+/g, "");
        var list = srt.split("\n");
        for (var i = 0; i < list.length; i++) {
          var m = list[i].match(
            /(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/
          );
          if (m) {
            vtt +=
              m[1] +
              ":" +
              m[2] +
              ":" +
              m[3] +
              "." +
              m[4] +
              " --> " +
              m[5] +
              ":" +
              m[6] +
              ":" +
              m[7] +
              "." +
              m[8] +
              "\n";
          } else {
            vtt += list[i] + "\n";
          }
        }
        vtt = "WEBVTT\n\n\n" + vtt;
        vtt = vtt.replace(/^\s+|\s+$/g, "");
        return vtt;
      };
      const vtt = srt2vtt(data);
      res.send(vtt);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
