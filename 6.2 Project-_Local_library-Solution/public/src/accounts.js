function findAccountById(accounts, id) {
  //used the find method to return the first match
  return accounts.find((element) => element.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    //have to use .toLowerCase in order for sort method to work on the whole name, not just the first capitalized letter
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  );
}
function numberOfAccounts(accounts) {
  return sortAccountsByLastName(accounts).map((element) => element).length;
}

function getTotalNumberOfBorrows(account, books) {
  return books.filter((book) =>
    //I want a number to return. .length will give me total number of borrows, no matter who has borrowed it
    book.borrows.find((borrow) => borrow.id === account.id)
  ).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  //needed to store all items that were filtered into a new variable that I can use later in the function
  const booksCheckedOut = books.filter((book) =>
    book.borrows.find(
      (borrow) => borrow.returned === false && borrow.id === account.id
    )
  );
  //For each book that was checked out(or not returned), I wanted to match the author and created an author in my final results
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
