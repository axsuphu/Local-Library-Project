function findAccountById(accounts, id) {
  //find() method returns the first element in the provided array that satisfies the provided testing function
  return accounts.find((element) => element.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
  return books.filter((book) =>
    //The find() method returns the first element in the provided array that satisfies the provided testing function.
    book.borrows.find((borrow) => borrow.id === account.id)
  ).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksCheckedOut = books.filter((book) =>
    book.borrows.find(
      (borrow) => borrow.returned === false && borrow.id === account.id
    )
  );
  //The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
  booksCheckedOut.forEach(
    (book) =>
      (book.author = authors.find((author) => author.id === book.authorId))
  );
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
