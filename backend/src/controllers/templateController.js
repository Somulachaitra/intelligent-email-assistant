const EmailTemplate = require('../models/EmailTemplate');

/** GET /api/templates */
const getTemplates = async (req, res, next) => {
  try {
    const templates = await EmailTemplate.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ templates });
  } catch (error) { next(error); }
};

/** POST /api/templates */
const createTemplate = async (req, res, next) => {
  try {
    const { name, subject, body, category } = req.body;
    const template = await EmailTemplate.create({
      userId: req.user._id, name, subject, body, category,
    });
    res.status(201).json({ template });
  } catch (error) { next(error); }
};

/** PUT /api/templates/:id */
const updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, subject, body, category } = req.body;
    const template = await EmailTemplate.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, subject, body, category },
      { new: true }
    );
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json({ template });
  } catch (error) { next(error); }
};

/** DELETE /api/templates/:id */
const deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await EmailTemplate.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!result) return res.status(404).json({ error: 'Template not found' });
    res.json({ message: 'Template deleted' });
  } catch (error) { next(error); }
};

module.exports = { getTemplates, createTemplate, updateTemplate, deleteTemplate };
