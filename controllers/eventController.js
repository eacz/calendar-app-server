const { eventNames } = require('../models/Event');
const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('user', 'name');
        res.json({ ok: true, events });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, msg: 'error' });
    }
};

const createEvents = async (req, res) => {
    const event = new Event(req.body);
    event.user = req.uid;
    try {
        const eventSaved = await event.save();
        res.json({ ok: true, event });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'error' });
    }
};

const updateEvent = async (req, res) => {
    const eventID = req.params.id;
    try {
        const event = await Event.findById(eventID);
        const uid = req.uid; //user that is requesting's uid

        if (!event) {
            return res
                .status(404)
                .json({ ok: false, msg: "This event doesn't exists" });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You're not allowed to edit this event",
            });
        }

        const newEvent = { ...req.body, user: uid };

        const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {
            new: true,
        });

        res.json({ ok: true, event: updatedEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error' });
    }
};

const deleteEvent = async (req, res) => {
    const eventID = req.params.id;
    try {
        const event = await Event.findById(eventID);
        const uid = req.uid; //user that is requesting's uid

        if (!event) {
            return res
                .status(404)
                .json({ ok: false, msg: "This event doesn't exists" });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You're not allowed to delete this event",
            });
        }

        await Event.findByIdAndDelete(eventID);
        res.json({ ok: true, msg: 'Event Deleted successfully' });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'error' });
    }
};

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
};
