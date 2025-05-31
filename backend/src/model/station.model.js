import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    name: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'inactive',
    },
    powerOutput: Number,
    connectorType: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Station = mongoose.model("Station", stationSchema);

export default Station;