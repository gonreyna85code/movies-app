const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");
const torrentStream = require('torrent-stream');






const isAuthenticated = function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) return next();
  res.send("No Disponible");
};

const router = Router();

router.get("/user",isAuthenticated, (req, res) => {
  if(req.user){
    res.send(req.user);
  }else{
    res.send("No Disponible");
  }
});

router.get("/movie/:name",isAuthenticated, async (req, res) => {
  const name = req.params.name;
  TorrentSearchApi.enableProvider('1337x');    
  try {
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 15);    
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

router.get("/video/:magnet",isAuthenticated, async (req, res) => {    
  const magnet = req.params.magnet + req._parsedUrl.search
  console.log(magnet)
  try {    
      const engine = torrentStream(magnet);            
      engine.on('ready', function() {
       const stream = engine.files[0].createReadStream(); 
       console.log(engine.files[0].name);           
          stream.pipe(res);
      });    
      console.log("Streaming:");      
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }  
});


module.exports = router;
