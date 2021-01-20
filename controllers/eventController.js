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

const updateEvent = (req, res) => {
    return res.json({ ok: true, msg: 'update event' });
};

const deleteEvent = (req, res) => {
    return res.json({ ok: true, msg: 'delete event' });
};

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
};
