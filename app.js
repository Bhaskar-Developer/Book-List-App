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
    //select the table list
    const list = document.getElementById('book-list')

    //create a new row element to push to table
    const row = document.createElement('tr')

    //Add the title,author and isbn as the row data along with a link that will be used to remove a book
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class="delete">X</a></td>` //this delete class will be lated used to delete the book from table
      
    //append this row as a child to the table list
    list.appendChild(row)  
  }

  //Delete book from the List UI
  deleteBookFromList(e) {
    //check if a is the target element that is selected
    //a tag has the class of delete
    if(e.target.className === 'delete'){
      //We use event bubbling to delete the book from the table list
      e.target.parentElement.parentElement.remove()
    }
  }

  //show Custom Alert on UI based on the conditions i.e. book added, book deleted, invalid form entries
  showCustomAlert(message, className) {
    //Create a div that will have this alert message
    const AlertDiv = document.createElement('div')
    //give the div the classes of alert and ${className} 
    //className can be success or error based on the condition
    AlertDiv.className = `alert ${className}`
    //We append the message as the text node for this alert div
    AlertDiv.appendChild(document.createTextNode(message))
    //select the main container and form 
    const divContainer = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    //show this alert after the main div container and before the form
    divContainer.insertBefore(AlertDiv,form)

    //make this alert disappear after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove()
    },3000)
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
  //instantiate ui object
  const ui = new UI();
 
  //make sure that none of the values are empty
  if(title === '' || author === '' || isbn === '') {
    //Show Custom Alert On UI
    ui.showCustomAlert('All fields are mandatory!','error')
  } else {
    //Insert the Book details into the table and clear the form fields

    //Add the book to table on UI
    ui.addBookToList(book)
    //clear all Form fields
    ui.clearFormFields()
    //Show custom alert saying that book is added to list
    //The class of success will give the alert a green back ground
    ui.showCustomAlert('Book added to list','success')
  }
  e.preventDefault();  
})

//Event listener for deleting book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //e.target.parentElement.parentElement.remove()
  const ui = new UI()
  //function that deletes the book from the UI
  ui.deleteBookFromList(e)
  //show custom alert saying that the book was deleted from the UI
  ui.showCustomAlert('Book removed from list','success')
})