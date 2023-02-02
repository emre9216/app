const FooterMenu = require("../models/FooterMenu");

const createMenuItem = async (req, res) => {
  try {
    const { name, link, target } = req.body;

    const menuItem = await FooterMenu.create({
      name,
      link,
      target,
    });

    res.status(201).json({
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await FooterMenu.findAll();
    res.status(200).json({
      message: "Menu items retrieved successfully",
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await FooterMenu.findByPk(req.body.id);
    if (!menuItem) {
      res.status(404).json({
        error: "Menu item not found",
      });
    }
    res.status(200).json({
      message: "Menu item retrieved successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await FooterMenu.findByPk(req.body.id);
    if (!menuItem) {
      res.status(404).json({
        error: "Menu item not found",
      });
    }
    const updatedMenuItem = await menuItem.update(req.body);
    res.status(200).json({
      message: "Menu item updated successfully",
      data: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await FooterMenu.findByPk(req.body.id);
    if (!menuItem) {
      res.status(404).json({
        error: "Menu item not found",
      });
    }
    await menuItem.destroy();
    res.status(200).json({
      message: "Menu item deleted successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
