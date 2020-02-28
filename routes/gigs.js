const router = require("express").Router();

const gigsController = require("../controllers/gigs");

router.post("/add", gigsController.add);
router.get("/allGigs", gigsController.getAll);
router.post("/getOne", gigsController.getOne);
router.post("/acceptGig/:id", gigsController.acceptGig);
router.delete("/deleteOne/:id", gigsController.deleteOneGig);
router.get("/userGigs", gigsController.displayUserGigs);
router.post("/acceptGig", gigsController.acceptGig);

module.exports = router;
