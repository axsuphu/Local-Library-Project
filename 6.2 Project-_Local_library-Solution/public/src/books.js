function findAuthorById(authors, id) {
  return authors.find((element) => element.id === id);
}

function findBookById(books, id) {
  return books.find((element) => element.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //at least one of books is false
  //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
  let borrowed = (booksBorrowed = books.filter((book) =>
    //the some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.
    book.borrows.some((borrow) => borrow.returned === false)
  ));
  //every one of these return values is true
  //The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
  let returned = (booksBorrowed = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  ));
  let result = [[...borrowed], [...returned]];
  return result;
}

function getBorrowersForBook({ borrows }, accounts) {
  return (
    borrows
      //The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
      .map((borrow) => {
        // The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned
        const account = accounts.find((account) => account.id === borrow.id);
        return { ...account, ...borrow };
      })
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
