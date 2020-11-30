import mongoose from 'mongoose';

const TerritorySchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Object,
    required: true,
  },
  end: {
    type: Object,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  painted_area: {
    type: Number,
    required: true,
  },
  painted_squares: {
    type: Array
  }
});

export default mongoose.model('Territory', TerritorySchema);
