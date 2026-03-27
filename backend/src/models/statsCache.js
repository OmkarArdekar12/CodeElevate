import mongoose from "mongoose";
import statsCacheSchema from "../schemas/statsCacheSchema.js";

const StatsCache = mongoose.model("StatsCache", statsCacheSchema);

export default StatsCache;
