const router = require("express").Router();
const auth = require("../middleware/auth");
const Books = require("../models/book-model");

////////////////////////////////////////
////////////Adding new books////////////
////////////////////////////////////////
addBook = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Book",
    });
  }

  const newbook = new Books(body);
  if (!newbook) {
    return res.status(400).json({ success: false, error: err });
  }
  newbook
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Book Added Successfully",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Book not Added!",
      });
    });
};
////////////////////////////////////////
////////////updating books//////////////
////////////////////////////////////////
updatebook = (req, res) => {
  Books.findOne(
    {
      $or: [{ auther: req.params.search }, { title: req.params.search }],
    },
    (err, names) => {
      if (!err && names) {
        names.title = req.body.title ? req.body.title : names.title;
        names.auther = req.body.auther ? req.body.auther : names.auther;
        names.price = req.body.price ? req.body.price : names.price;
        names
          .save()
          .then((result) =>
            res.status(201).send({ msg: `Book Updated successfully ${result}` })
          )
          .catch((err) =>
            res.status(403).send({ msg: "Something went wrong" })
          );
      } else if (err || !names) {
        res.send("Nothing found");
      }
    }
  );
};

////////////////////////////////////////
////////////Delete book////////////////
//////////////////////////////////////
remBook = (req, res) => {
  console.log("Token" + token)
  console.log("evt" + evt)
  // Books.deleteOne({ title: req.body.title }, (err, data) => {
  //   if (!err && data) {
  //     res.send("Book Deleted Successfully");
  //   }
  //   if (!data) {
  //     res.send("Title not found");
  //   }
  // });
};

////////////////////////////////////////
////////////Searching books////////////
////////////////////////////////////////
search = (req, res) => {
  Books.find(
    {
      $or: [
        { auther: { $regex: req.body.search, $options: "i" } },
        { title: { $regex: req.body.search, $options: "i" } },
      ],
    },
    function (err, names) {
      if (err || !names.length) {
        return res.status(400).send("Nothing Found.");
      }
      return res.send(names);
    }
  );
};

////////////////////////////////////////
////////////Get All books////////////
////////////////////////////////////////
searchAll = (req, res) => {
  Books.find({}, function (err, names) {
    if (err || !names.length) {
      return res.status(400).send("Nothing Found.");
    }
    return res.send(names);
  });
};

module.exports = {
  addBook,
  updatebook,
  remBook,
  search,
  searchAll,
};
