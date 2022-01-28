const Router = require("express");
const TorrentSearchApi = require("torrent-search-api");




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
  TorrentSearchApi.enableProvider('KickassTorrents');
  console.log(name);  
  try {
    const data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      const Detail = await TorrentSearchApi.getTorrentDetails(data[i]);
      data[i].detail = Detail;
      data[i].magnet = magnet;
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Not Found");
  }  
});


module.exports = router;
