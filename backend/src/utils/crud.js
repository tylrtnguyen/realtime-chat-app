// Get one item
export const getOneItem = model => async (req, res) => {
    let id = req.params.id
    try {
        const item = await model.findOneById(id)
        .lean()
        .exec()
        if(!item) {
            res.status(400).end()
        }
        else {
            res.status(200).json({
                success: true,
                data: item
            })
        }                 
    }
    catch (err) {
        console.log(err)
        res.status(400).send('Failed to fetch item')
    }
}

// Get Chat by roomname
export const getChatByRoom= model => async (req, res) => {
    let roomname = req.params.roomname
    try {
        const chats = await model.find({room: roomname})
        .lean()
        .exec()
        if(!chats) {
            res.status(400).send("Cannot find item")
        }
        else {
            res.status(200).json({
                success: true,
                count: chats.length,
                data: chats
            })
        }                 
    }
    catch (err) {
        console.log(err)
        res.status(400).send('Failed to fetch item')
    }
}

// Get all item
export const getAllItems = model => async (req, res) => {
    try {
        const items = await model.find()
                                 .lean()
                                 .exec()
        if(!items) {
            res.status(400).end()
        }
        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        })
    }
    catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
      
            return res.status(400).json({
              success: false,
              error: messages
            });
          } else {
            return res.status(500).json({
              success: false,
              error: 'Server Error'
            });
          }
    }
}

export const addItem = model => async (req, res) => {
    try {
        const item = await model.create(req.body)
        res.status(201).json({
            success: true,
            data: item
        })
    }
    catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


export const updateItem = model => async (req, res) => {
    try{
        const updatedItem = await model.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            // Add item to database if item does not exist
            {new: true}
        ).lean()
         .exec()
         if(!updatedItem){
             return res.status(401).send("Not updated")
         }
         res.status(200).json({
             success: true,
             data: updatedItem
         })
    }
    catch (error) {
        console.log(error)
        res.status(400).send("Failed to update item")
    }
}


// Remove item
// findOneAndRemove()
export const removeItem = model => async (req, res) => {
    try {
        const removedItem = model.findOneAndRemove({_id:req.params.id}).exec()
        if(!removedItem) {
            res.status(400).send("Failed to remove item")
        }
        res.status(200).send("Successfully removed item")
    }
    catch (error) {
        console.log(e)
        res.status(400).end()
    }
}

export const crudControllers = model => ({
    getOneItem: getOneItem(model),
    getAllItems: getAllItems(model),
    addItem: addItem(model),
    updateItem: updateItem(model),
    removeItem: removeItem(model),
    getChatByRoom: getChatByRoom(model)
})