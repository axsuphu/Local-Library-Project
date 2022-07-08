function getTotalBooksCount(books) {
  return books.length;
}
//should return the total number of books in the array:

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return (booksBorrowed = books.filter((book) =>
    book.borrows.find((borrow) => borrow.returned === false)
  ).length);
}

function getMostCommonGenres(books) {
  //have a constant result where we use reduce to accumulate all the genres and their counts
  ////Definition: The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
  //reduce will iterate through each book
  const result = books.reduce((result, book) => {
    //How do we know that the genre exists? We look at results and see if the genre even has a position in the result array
    //have a variable called foundIndex to contain results from using .findIndex
    //use result.findIndex to find which index our genres exist in the array
    //Definition: The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
    let foundIndex = result.findIndex((element) => element.name === book.genre);
    //if statement will check if name of genre exists and if the index is less than 0(which means it does not exist in arrray)
    if (book.genre && foundIndex < 0) {
      //add new object into result
      result.push({
        name: book.genre,
        count: 1,
      });
      //if genre exists at index 0 or more (if it exists at any point in the array), then increase the count by 1
    } else if (book.genre && foundIndex >= 0) {
      result[foundIndex].count++;
    }
    return result;
  }, []);
  return result
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
  //b - a will sort in descending order
}

/*
  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ]
*/

function getMostPopularBooks(books) {
  const result = books.reduce((result, book) => {
    //check if genre object exists in result array  by using findIndex()
    //The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
    let foundIndex = result.findIndex((element) => element.name === book.title);
    if (book.title && foundIndex < 0) {
      result.push({
        name: book.title,
        count: book.borrows.length,
      });
    }
    return result;
  }, []);
  return result
    .sort((titleA, titleB) => titleB.count - titleA.count)
    .slice(0, 5);
}

/*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
//use reduce

function getMostPopularAuthors(books, authors) {
  let results = [];
  authors.forEach((author) => {
    let authorInfo = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };

    books.forEach((book) => {
      if (book.authorId === author.id) {
        authorInfo.count += book.borrows.length;
      }
    });
    results.push(authorInfo);
  });
  return results
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);

  //foreach
  //emptyvariable
  //loop authors
  //author object created (within, have name and count =0)
  //then books.foreach will try to match book.authorId === author.id
}

//use reduce
/*
  [
    { name: "Cristina Buchanan", count: 112 },
    { name: "Tami Hurst", count: 83 },
    { name: "Chrystal Lester", count: 80 },
    ...
  ]
*/

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
