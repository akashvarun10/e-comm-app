// // routes/collectionRoutes.js
const express = require("express");
const router = express.Router();
const { createCollection, getAllCollections, updateCollection, deleteCollection } = require("../controllers/collectionController");

router.post("/create", createCollection);
router.get("/collections", getAllCollections);
router.post("/update", updateCollection);
router.post("/delete", deleteCollection);

module.exports = router;
