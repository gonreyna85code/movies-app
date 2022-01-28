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
  try {
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 5);    
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

router.get("/video", async (req, res) => {    
  try {    
      const engine = torrentStream('magnet:?xt=urn:btih:DC2ED58F9F4F6A838B395F9A27EEB30BB6CE7EDB&dn=The.Book.of.Boba.Fett.S01E05.720p.WEBRip.x265-MiNX%5BTGx%5D&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2970%2Fannounce&tr=https%3A%2F%2Ftracker.foreverpirates.co%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce');            
      engine.on('ready', function() {
        engine.files.forEach(function(file) {
          console.log(engine.files);
          console.log('filename:', file.name);
          let stream = file.createReadStream();    
          stream.pipe(res);                       
        });
      });  
        
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }  
});


module.exports = router;
