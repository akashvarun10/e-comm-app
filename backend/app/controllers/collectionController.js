// controllers/collectionController.js
const Collection = require('../models/collectionModel');

exports.createCollection = async (req, res) => {
  try {
    const { name, description, colorStart, colorEnd } = req.body;
    const collection = new Collection({ name, description, colorStart, colorEnd });
    await collection.save();
    res.status(201).json({ message: "Collection created successfully", collection });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateCollection = async (req, res) => {
  try {
    const { id, name, description, colorStart, colorEnd } = req.body;
    const collection = await Collection.findByIdAndUpdate(
      id,
      { name, description, colorStart, colorEnd },
      { new: true }
    );
    res.status(200).json({ message: "Collection updated successfully", collection });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.body;
    await Collection.findByIdAndDelete(id);
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
