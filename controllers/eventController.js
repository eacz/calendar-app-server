const getEvents = (req,res ) => {
    return res.json({ok:true, msg:'get events'})
}

const createEvents = (req,res ) => {
    return res.json({ok:true, msg:'create events'})
}

const updateEvent = (req,res ) => {
    return res.json({ok:true, msg:'update event'})
}

const deleteEvent = (req,res ) => {
    return res.json({ok:true, msg:'delete event'})
}


module.exports= {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent
    
}