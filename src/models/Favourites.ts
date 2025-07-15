import mongoose, { Schema, models } from 'mongoose';

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
