import mongoose from "mongoose";
import rankingCacheSchema from "../schemas/rankingCacheSchema.js";

const RankingCache = mongoose.model("RankingCache", rankingCacheSchema);

export default RankingCache;
