"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Get one item
const getOneItem = exports.getOneItem = model => async (req, res) => {
  let id = req.params.id;

  try {
    const item = await model.findOneById(id).lean().exec();

    if (!item) {
      res.status(400).end();
    } else {
      res.status(200).json(item);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch item');
  }
}; // Get all item


const getAllItems = exports.getAllItems = model => async (req, res) => {
  try {
    const items = await model.find().lean().exec();

    if (!items) {
      res.status(400).end();
    }

    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Failed to fetch items");
  }
};

const addItem = exports.addItem = model => async (req, res) => {
  let item_to_add = new model(req.body);

  try {
    const item = await item_to_add.save();
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to add new item");
  }
};

const updateItem = exports.updateItem = model => async (req, res) => {
  try {
    const updatedItem = await model.findOneAndUpdate({
      _id: req.params.id
    }, req.body, // Add item to database if item does not exist
    {
      new: true
    }).lean().exec(item => {
      if (!item) {
        return next(new Error("Could not load document"));
      }
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to update item");
  }
}; // Remove item
// findOneAndRemove()


const removeItem = exports.removeItem = model => async (req, res) => {
  try {
    const removedItem = model.findOneAndRemove({
      _id: req.params.id
    });

    if (!removedItem) {
      res.status(400).send("Failed to remove item");
    }

    res.status(200).send("Successfully removed item");
  } catch (error) {
    console.log(e);
    res.status(400).end();
  }
};

const crudControllers = exports.crudControllers = model => ({
  getOneItem: getOneItem(model),
  getAllItems: getAllItems(model),
  addItem: addItem(model),
  updateItem: updateItem(model),
  removeItem: removeItem(model)
});