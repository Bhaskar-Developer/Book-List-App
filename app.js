//Creating a Book Class to handle the creation of the Book Object
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

//Creating a UI class that will handle all UI operations which are
//Adding a new Book
//Deleting a book
class UI {
  //clear Form Fields
  clearFormFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

//Event listener for form submit button 
//The form accepts three inputs i.e. title, author and isbn
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //get the book values (title,author,isbn) from the Form
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  //Create a Book object, which will have these values
  const book = new Book(title, author, isbn)
 
  //make sure that none of the values are empty
  if(title === '' || author === '' || isbn === '') {
    //Show Custom Alert On UI
  } else {
    //Insert the Book details into the table and clear the form fields
    //instantiate ui object
    const ui = new UI();

    //Add the book to table on UI
    
    //clear all Form fields
    ui.clearFormFields()
  }
  e.preventDefault();  
})
