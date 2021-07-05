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
  //Add book to the Table list UI
  addBookToList(book) {
    console.log(book)
    //select the table list
    const list = document.getElementById('book-list')

    //create a new row element to push to table
    const row = document.createElement('tr')

    //Add the title,author and isbn as the row data along with a link that will be used to remove a book
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class="delete">X</a><td>` //this delete class will be lated used to delete the book from table
      
    //append this row as a child to the table list
    list.appendChild(row)  
  }
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
    ui.addBookToList(book)
    //clear all Form fields
    ui.clearFormFields()
  }
  e.preventDefault();  
})
