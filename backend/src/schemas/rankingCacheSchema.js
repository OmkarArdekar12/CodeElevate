import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rankingCacheSchema = new mongoose.Schema({
  rankings: {
    competitiveProgramming: Array,
    development: Array,
    rankers: Array,
    contributors: Array,
    allRounders: Array,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default rankingCacheSchema;
