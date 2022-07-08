function findAuthorById(authors, id) {
  return authors.find((element) => element.id === id);
}

function findBookById(books, id) {
  return books.find((element) => element.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = (booksBorrowed = books.filter((book) =>
    //Use the some method because I need borrow.returned to === false just once
    book.borrows.some((borrow) => borrow.returned === false)
  ));
  let returned = (booksBorrowed = books.filter((book) =>
    //I used .every method for this because ALL borrow.returned has to === true for it to truly be returned
    book.borrows.every((borrow) => borrow.returned === true)
  ));
  //spread operator utilized to easily put all contents in this array
  let result = [[...borrowed], [...returned]];
  return result;
}

function getBorrowersForBook({ borrows }, accounts) {
  //I destructured the book parameter to easily utilize just borrows array
  return (
    borrows
      //The .map method will iterate through each element of borrows array
      .map((borrow) => {
        // The .find method only needs to find the first match
        const account = accounts.find((account) => account.id === borrow.id);
        return { ...account, ...borrow };
      })
      //The .slice method will start at 0 index and stop before index 10
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
