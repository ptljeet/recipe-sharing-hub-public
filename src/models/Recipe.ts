
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  imageUrl:    { type: String },
  category:    { type: String },
  ingredients: [String],
  steps:       [String],
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:   { type: Date, default: Date.now }
});

export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);
