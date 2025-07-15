import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String },
  category:    { type: String },
  tags:        [String],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  favorites:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);
