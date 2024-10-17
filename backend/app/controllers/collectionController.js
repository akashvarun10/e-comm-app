// controllers/collectionController.js
const Collection = require('../models/collectionModel');

exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = new Collection({ name, description });
    await collection.save();
    res.status(201).json({ message: 'Collection created successfully', collection });
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