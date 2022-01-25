const Router = require("express");

const router = Router();

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect("/login");
  }
}

router.get("/movie/:name", checkAuthentication, async (req, res) => {
  if (req.session.passport.user !== undefined) {
    const name = req.params.name;
    const TorrentSearchApi = require("torrent-search-api");
    TorrentSearchApi.enableProvider("1337x");
    let data = await TorrentSearchApi.search(`${name}`, "Movies", 5);
    for (let i = 0; i < data.length; i++) {
      const magnet = await TorrentSearchApi.getMagnet(data[i]);
      data[i].magnet = magnet;
    }
    console.log(data);
    res.send(data);
  }
});

module.exports = router;
