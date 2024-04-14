import { Mood } from "../models/Mood.js";

export const memoriesView = async (req, res) => {
    try {

        const moods = await Mood.find({ author: req.user.id })
            .sort({ date: -1 }) // Sort by date in reverse order
            .limit(5);

        res.render("memories", {
            user: req.user,
            moods: moods
        });
    } catch (err) {
        console.error("Error retrieving moods:", err);
        res.status(500).send("Internal Server Error");
    }
};
