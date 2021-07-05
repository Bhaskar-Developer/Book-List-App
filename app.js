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
    //add the book to local storage as well
    localStore.pushNewBookToStorage(book)  
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

//Storage class to store the Books in Local Storage
class localStore {
  //get the books array stored in the local storage
  static getBooksFromStorage() {
    //create an array that will store the books fetched from the local storage
    let booksArray;
    //check if local storage has the books item
    if(localStorage.getItem('books') === null) {
      //If there is no item found then booksArray will be an empty array
      booksArray = []
    } else {
      //if there is an item books found in local storage then parse and save it in booksArray
      booksArray = JSON.parse(localStorage.getItem('books'))
    }
    return booksArray
  }

  //display the books when the application is reloaded or started
  static displayBooksFromStorage() {
    //get the books from the local storage
    const booksArray = localStore.getBooksFromStorage()
    //using forEach loop to loop through the books array and push the books one by one to the UI
    booksArray.forEach((book) => {
      const ui = new UI()
      ui.addBookToList(book)
    })
  }

  //Add new book to local storage when book if added to table list in the UI
  static pushNewBookToStorage(book) {
    //get the books item from local storage
    const booksArray = localStore.getBooksFromStorage()
    //add this new book to the books array
    booksArray.push(book)
    //push this new booksArray back to the local storage
    localStorage.setItem('books', JSON.stringify(booksArray))
  }

  //delete book from local storage when it is deleted from the table list UI
  //We use the isbn as the reference here to match the book with a book having the same isbn in booksArray and delete it
  static deleteBookFromStorage(isbn) {
    //get the books item from the local storage
    const booksArray = localStore.getBooksFromStorage()
    //using forEach loop to delete the book that has the matching isbn
    booksArray.forEach((book,index) => {
      if(book.isbn === isbn) {
        booksArray.splice(index,1)
      }
    })
    
    //push the modified books Array back to the local Storage
    localStorage.setItem('books', JSON.stringify(booksArray))
  }
}

//DOM event to load all books from local storage and push them to table list on UI
document.addEventListener('DOMContentLoaded', localStore.displayBooksFromStorage())

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
  //delete the book from the local storage
  //here previousElementSibling is the column td which contains isbn
  //We only get the isbn number by using textContent
  localStore.deleteBookFromStorage(e.target.parentElement.previousElementSibling.textContent) 
  //show custom alert saying that the book was deleted from the UI
  ui.showCustomAlert('Book removed from list','success')
  e.preventDefault()
})