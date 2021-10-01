// Requirement for our Project

//We are a book management Company

//Books
//ISBN, title , pub date ,language ,num pages, author[], category[]

//Authors
// id ,names ,books[]

//Publications
//id ,name, books[]


//WE HAVE TO DESIGN AND CODE API ON THIS

//[A]Books {We need an API}
// 1.To get all books(DONE) 2.To get specific book (DONE)
// 3.To get specific book on number of category (DONE) 4.To get specific book on number of languages (DONE)

//[B]Authors {We need an API}
// 1.To get all authors (DONE). 2.To get specific author based on id (DONE) 3.To get list of author on books (DONE)

//[C]Publications {We need an API}
// 1.To get all publications (DONE). 2.To get specific publication based on id (DONE) 3.To get list of publication based on book (DONE)



//POST METHOD 
//1.Add new Book (Done)
//2.Add new Publication  (DONE)
//3.Add new Author (DONE)

//*********    PUT      **************/
//1.Update the book details if author is changed

//*****   DELETE **********/
//1. Delete a book  (DONE)
//2. Delete author from book   (DONE)
//3. Delete author from book and related book from author (DONE)


//Schema blueprint of how data has to be constructed
//MongoDb is Schemaless
// mongoose has schema
// mongoose - validation , relationship with other data
//model - document model of MongoDb
// Workflow - Schema-> Model -> use them