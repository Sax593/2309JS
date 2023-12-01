const notFound = (req, res, next) => {
    if (req.params.id == 0) {
        res.send("Your request is not valid, id start on 1 in BDD").status(404);
    } else {
        next();
    }
}

module.exports = notFound;