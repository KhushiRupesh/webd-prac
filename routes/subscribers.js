const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const subscriber = Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json(subscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Subscriber.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;

// router.patch("/id", (req, res) => {
//   try {
//     const subscriber = Subscriber.findById(req.params.id);
//     if (!subscriber) {
//       return res.status(404).json({ message: "Subscriber not found" });
//     }

//     if (req.body.name != null) {
//       subscriber.name = req.body.name;
//     }

//     if (req.body.subscribedToChannel != null) {
//       subscriber.subscribedToChannel = req.body.subscribedToChannel;
//     }

//     const updatedSubscriber = subscriber.save();
//     res.json(updatedSubscriber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
