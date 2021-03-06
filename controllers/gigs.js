const User = require("../models/user");
const Gig = require("../models/postGig");
const alotGig = require("../models/Gig");

exports.add = (req, res) => {
  Gig.create(req.body)
    .then(gig => {
      console.log(gig);
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
};

exports.getAll = (req, res) => {
  Gig.find({})
    .then(gigs => {      
      res.json({ success: true, gigs });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
};

exports.getOne = (req, res) => {
  Gig.findById(req.body.gigID)
    .then(gig => {
      res.json({ success: true, gig });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
};

// exports.acceptGig =(req,res) => {
//   Gig.findById(req.params.id)
//   .then(gig => {
//      userGid:gig.userId
//      alotGig.create(
//        {
//         userGid:userGid,
//         userTid:req.userId
//        })
//      .then(gig => {
//        console.log(gig)
//        res.json({ success: true })
//      })
//      .catch(err => {
//        console.log(err);
//       res.json({ success: false })
//      })

//   })
// }

exports.acceptGig = (req, res) => {
  console.log(req.body);
  alotGig.findOne({ gigID: req.body.gigID }).then(gig => {
    if (gig) {
      let newUsers = gig.userTid;
      newUsers.push(req.body.userTid);
      gig.UserTid = newUsers;
      alotGig
        .findByIdAndUpdate(gig._id, gig)
        .then(newGig => {
          res.json({ success: true });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false });
        });
    } else {
      let newGig = {
        gigID: req.body.gigID,
        userTid: [req.body.userTid]
      };
      alotGig
        .create(newGig)
        .then(newGig => {
          res.json({ success: true });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false });
        });
    }
  });
};

exports.deleteOneGig = (req, res) => {
  Gig.findByIdAndRemove(req.params.id)
    .then(gig => {
      if (!gig) {
        return res.status(404).json({
          message: "not Found"
        });
      }
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
};

exports.displayUserGigs = (req, res) => {
  Gig.find({ userId: req.userId })
    .then(gigs => {
      res.json({ success: true, gigs });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
};
