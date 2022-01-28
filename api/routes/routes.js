const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require('torrent-stream');






const isAuthenticated = function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) return next();
  res.send("No Disponible");
};

const router = Router();

router.get("/user", isAuthenticated, (req, res) => {
  if(req.user){
    res.send(req.user);
  }else{
    res.send("No Disponible");
  }
});

router.get("/movie/:name", isAuthenticated, async (req, res) => {
  const name = req.params.name;
  TorrentSearchApi.enableProvider('1337x');
  console.log(name);  
  try {
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      data[i].magnet = magnet;
      const engine = torrentStream(magnet); 
      var streams = [];     
      engine.on('ready', function() {
        engine.files.forEach(function(file) {
          console.log('filename:', file.name);
          stream = file.createReadStream(); 
          streams.push(stream);                  
        });
      });  
      data[i].streams = streams;          
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }  
});


module.exports = router;
