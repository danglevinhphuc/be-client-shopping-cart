const cron = require("node-cron");

const router = require("express").Router();

router.get("/test", (req, res) => {
  for (var i = 0; i < 10; i++) {
    let task =  cron.schedule('*/5 * * * * *', () => {
      console.log(i);
    },{
        scheduled: false
      });
      task.start();
  }
  res.send("ok");
});
module.exports = router;
