require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Import Database
const database = require('./database/database');

//Models
const BookModel= require("./database/book");
const AuthorModel= require("./database/author");
const PublicationModel= require("./database/publication");

// Initialize the express
const booky = express();

booky.use(bodyParser.urlencoded({ extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, 
{useNewUrlParser: true, 

useUnifiedTopology: true

} ,
 err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});




/*  FOR FIRST ONE BELOW
ROUTE         /    -(root)
DESCRIPTION   Get all the books
Access        PUBLIC
Parameter     NONE
Method        GET
*/

booky.get("/", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*  
ROUTE         /author
DESCRIPTION   Get all the authors
Access        PUBLIC
Parameter     NONE
Method        GET
*/
booky.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


/*  
ROUTE         /publications
DESCRIPTION   Get all the publications
Access        PUBLIC
Parameter     NONE
Method        GET
*/

booky.get('/publications', async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});



/*  FOR SECOND ONE BELOW
ROUTE         /is
DESCRIPTION   Get specific book on ISBN
Access        PUBLIC
Parameter     isbn
Method        GET
*/

booky.get('/is/:isbn',async (req,res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})


    if (!getSpecificBook){
        return res.json({error: `No book found for the ISBN ${req.params.isbn}`
        })
    }
    return res.json({book: getSpecificBook});
})

/*         FOR THIRD ONE BELOW
ROUTE         /c
DESCRIPTION   Get specific book on Category
Access        PUBLIC
Parameter     Category
Method        GET
*/

booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category})


    if (!getSpecificBook){
        return res.json({error: `No book found for the Category ${req.params.category}`
        })
    }
    return res.json({book: getSpecificBook});

});

/*         FOR FOURTH ONE BELOW
ROUTE         /is
DESCRIPTION   Get specific book on Category
Access        PUBLIC
Parameter     Language
Method        GET
*/

booky.get("/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language: req.params.language})

    if (!getSpecificBook) {
        return res.json({error : `No book found for the language ${req.params.language}`})
    }
    return res.json({book: getSpecificBook})

});

/*  FOR SECOND ONE BELOW
ROUTE         /author/id
DESCRIPTION   Get specific author on id
Access        PUBLIC
Parameter     id
Method        GET
*/

booky.get('/author/id/:id',async (req,res) =>{
    const getSpecificAuthor = await AuthorModel.findOne({id:req.params.id})
    if (!getSpecificAuthor){
        return res.json({error: `No Author found for the ID ${req.params.id}`
        })
    }
    return res.json({author: getSpecificAuthor});
})

/*  FOR SECOND ONE BELOW
ROUTE         /author/book
DESCRIPTION   Get all author based on book
Access        PUBLIC
Parameter     isbn
Method        GET
*/
booky.get('/author/book/:isbn',async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({isbn: req.params.isbn})
    if( !getSpecificAuthor) {
        return res.json({error : `No author found for the book of  ${req.params.isbn}`});
    }
    return res.json({author : getSpecificAuthor});

})


/*  
ROUTE         /publications/id
DESCRIPTION   Get all publications based on id
Access        PUBLIC
Parameter     id
Method        GET
*/
booky.get('/publications/id/:id', async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({id : req.params.id})
    if (!getSpecificPublication){
        return res.json({error: `No publication found for the ID ${req.params.id}`
        })
    }
    return res.json({book: getSpecificPublication});
})

/*  
ROUTE         /publications/books
DESCRIPTION   Get all publications based on books
Access        PUBLIC
Parameter     books
Method        GET
*/
booky.get('/publications/books/:books', async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.books})
    if(!getSpecificPublication) {
        return res.json({error : `No publication found for the book of  ${req.params.books}`});
    }
    return res.json({authors : getSpecificPublication});

})

/*  
ROUTE         /book/new
DESCRIPTION   Add new book
Access        PUBLIC
Parameter     NONE
Method        PUSH
*/
booky.post('/book/new', async (req,res) => {
    const {newBook } =req.body ;
    const addNewBook = BookModel.create(newBook);
    return res.json({
       books: addNewBook,
       message: "Book Added Successfully"
    });
})

/*  
ROUTE         /author/new
DESCRIPTION   Add new author
Access        PUBLIC
Parameter     NONE
Method        PUSH
*/
booky.post('/author/new', async (req,res) =>
{    const {newAuthor} =req.body ;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        author : addNewAuthor,
        message : "New Author Added"
     });
})

/*  
ROUTE         /publication/new
DESCRIPTION   Add new publications
Access        PUBLIC
Parameter     NONE
Method        PUSH
*/
booky.post('/publication/new', async (req,res) => {
    const { newPublication }= req.body;
   const addNewPublication =PublicationModel.create(newPublication);
    return res.json({
        publications : addNewPublication ,
        message : "New Publication Added"
    })
})

/*****************PUT***************/

/*  
ROUTE         /publication/update/book
DESCRIPTION   Update book on isbn
Access        PUBLIC
Parameter     isbn
Method        PUT
*/
booky.put("/book/update/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle // update value
        },
        {
            new: true //to show the data on frontend also
        }
    );
    return res.json({ book: updatedBook });
});



/*
    Route               /book/author/update/
    Description         Update book and author database
    Access              PUBLIC
    Parameter           isbn
    Methods             PUT
*/
booky.put("/book/author/update/:isbn", async (req, res) => {

    //Update book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        },
    );

    //Update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook,
        author: updatedAuthor,
        message : "New author was addded"
    });
});




/*  
ROUTE         /publication/update/book
DESCRIPTION   Update or ADD new publications
Access        PUBLIC
Parameter     isbn
Method        PUT
*/

booky.put('/publications/update/book/:isbn', (req,res) => {
    //Update the publication Database
    database.publication.forEach((pub) => {
      if (pub.id === req.body.pubId) {
          return pub.books.push(req.params.isbn);
      } 
    });
    //Update the book database
    database.books.forEach((book) =>
    {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return ;
        }
    });
    return res.json( {
        books : database.books,
        publications : database.publication,
        message : "Successful Updated Publications"
    })
});


/* DELETE  */
/*  
ROUTE        /book/delete
DESCRIPTION   Delete a book
Access        PUBLIC
Parameter     isbn
Method        DELETE
*/
booky.delete("/book/delete/:isbn",async (req,res) =>{
   const updatedBookDatabase = await BookModel.findOneAndDelete(
       {
           ISBN : req.params.isbn
       }
   );
    return res.json({
        books: updatedBookDatabase
    }
    )
});


/* DELETE  */
/*  
ROUTE        /author/delete
DESCRIPTION   Delete a author
Access        PUBLIC
Parameter     id
Method        DELETE
*/
booky.delete('/author/delete/:id', async(req,res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
	{
		id: req.params.id
	}
	);
    return res.json({author : updatedAuthorDatabase});
})

/*  
ROUTE         /book/author/delete
DESCRIPTION   Delete a author from book and vice versa
Access        PUBLIC
Parameter     isbn, authorId
Method        DELETE
*/
booky.delete('/book/author/delete/:isbn/:authorId', async (req,res) =>
{
 //update the book database
  const updatedBookDatabase= await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        },
        {
            $pop: {
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

 //update the author database
 const updatedAuthorDatabase = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $pop: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json({
        book: updatedBookDatabase,
        author: updatedAuthorDatabase,
		message:"Author and related book Deleted"
    });
});





booky.listen(3000, () => {
    console.log("Server is up and running");
});