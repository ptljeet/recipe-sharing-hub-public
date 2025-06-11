import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  savedAt: { type: Date, default: Date.now }
}); 

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);  
