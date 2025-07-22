import mongoose, { Schema, models } from 'mongoose';

<<<<<<< HEAD
const favoriteSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  savedAt: { type: Date, default: Date.now }
}); 

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);  
=======
const favouriteSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Favourite = models.Favourite || mongoose.model('Favourite', favouriteSchema);
export default Favourite;
>>>>>>> 68485d371672154ad110f379051587b20b462be7
