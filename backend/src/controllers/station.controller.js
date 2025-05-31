import Station from "../model/station.model.js";

export const getStations = async (req, res) => {
    try {
        const stations = await Station.find({ userId: req.user.id })
        if (!stations || stations.length === 0) {
            return res.status(404).json({ message: "No stations found" });
        }

        res.status(200).json(stations);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const createStation = async (req, res) => {
    const { name, location, status, powerOutput, connectorType } = req.body;
    try {
        if (!name || !location || !status || !powerOutput || !connectorType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const station = await Station.create({
            name,
            location,
            status,
            powerOutput,
            connectorType,
            userId: req.user.id
        });

        res.status(201).json(station);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const updateStation = async (req, res) => {
    const { id } = req.params;
    const { name, location, status, powerOutput, connectorType } = req.body;
    try {
        const station = await Station.findByIdAndUpdate(id, {
            name,
            location,
            status,
            powerOutput,
            connectorType
        }, { new: true });

        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }

        res.status(200).json(station);
    } catch (error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const deleteStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findByIdAndDelete(id);

        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }

        res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}