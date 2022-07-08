function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return (booksBorrowed = books.filter((book) =>
    //I needed to filter through the books array to then find if anywhere in borrows that borrow.returned === false
    book.borrows.find((borrow) => borrow.returned === false)
  ).length); //I used the .length to give return only the length of the array of my results
}

function getMostCommonGenres(books) {
  //have a constant result where I use reduce to accumulate all the genres and their counts
  //reduce will iterate through each book
  const result = books.reduce((result, book) => {
    //How do I know that the genre exists? I look at results and see if the genre even has a position in the result array
    //I have a variable called foundIndex to contain results from using .findIndex
    //I will use result.findIndex to find which index our genres exist in the array
    let foundIndex = result.findIndex((element) => element.name === book.genre);
    //The if statement will check if name of genre exists and if the index is less than 0(which means it does not exist in arrray)
    if (book.genre && foundIndex < 0) {
      //Then add new object into result
      result.push({
        name: book.genre,
        count: 1,
      });
      //If genre exists at index 0 or more (if it exists at any point in the array), then increase the count by 1
    } else if (book.genre && foundIndex >= 0) {
      result[foundIndex].count++;
    }
    return result;
  }, []);
  return (
    result
      //will use .sort to put my results in descending order
      .sort((genreA, genreB) => genreB.count - genreA.count)
      // .slice will start at index 0 and end before index 5
      .slice(0, 5)
  );
}

function getMostPopularBooks(books) {
  const result = books.reduce((result, book) => {
    //I used a very similar function to getCommonGenres but now I am looking at title instead of genre
    let foundIndex = result.findIndex((element) => element.name === book.title);
    //if book title exists and is nowhere in my results
    if (book.title && foundIndex < 0) {
      //then push this object into result
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

function getMostPopularAuthors(books, authors) {
  //I want a variable that is an empty array so I can push my results from my function into it
  let results = [];
  //I chose to loop through author because that is ultimately, what I am returning
  authors.forEach((author) => {
    let authorInfo = {
      //I made a new object that has the author's full name and the count for how many borrows they have
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    //now I want to loop through books array
    books.forEach((book) => {
      //if I find a match
      if (book.authorId === author.id) {
        //then the count in authorInfo will be increased
        authorInfo.count += book.borrows.length;
      }
    });
    //push all my results into an array and the loop will start over again
    results.push(authorInfo);
  });
  return results
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
