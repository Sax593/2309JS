const verify = (req, res, next) => {
    const { name } = req.body
    if (name == "") {
        res.status(404).send("name is empty")
    } else {
        next()
    }
}

module.exports = verify;