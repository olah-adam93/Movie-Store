import { users } from './Data/Users.js';
import { products } from './Data/Products.js';
import { currentUserSession } from './Data/CurrentUserSession.js';

let topViewed = document.querySelector('.viewed-content');
let topPurchased = document.querySelector('.purchased-content');
let topTrend = document.querySelector('.trending-content');
let recomMovies = document.querySelector('.movie-container');

window.addEventListener('load', () => {
  //1.Popular products
  console.log(ViewedAll()); //list of all products id viewed
  console.log(PurchasedAll()); //list of all products id purchased
  console.log(multipleViewed); // list of products id viewed twice or more
  console.log(multiplePurchased); // list of products id purchased twice or more
  console.log(Trending); //list of "most popular" products id both viewed/purchased twice or more
  console.log(listMultipleItems(multipleViewed, topViewed)); //DOM manipulation to display some data of products viewed twice or more
  console.log(listMultipleItems(multiplePurchased, topPurchased)); //DOM manipulation to display some data of products purchased twice or more
  console.log(listMultipleItems(Trending, topTrend)); //DOM manipulation to display some data of "most popular" products both viewed/purchased twice or more
  //2.“Recommended for you”
  console.log(listOfGenre(1)); //Olav - list of genres
  console.log(listOfGenre(2)); //Tage
  console.log(listOfGenre(3)); //Ida
  console.log(listOfGenre(4)); //returns with empty array since user is not active(no CurrentUserSession data available)
  console.log(listOfGenre(5)); //Mia
  console.log(recommendationGenerator(prefCateg_user1)); //list of random movies based on user preferred genres
  console.log(recommendationGenerator(prefCateg_user2));
  console.log(recommendationGenerator(prefCateg_user3));
  console.log(recommendationGenerator(prefCateg_user4));
  console.log(recommendationGenerator(prefCateg_user5));
});
//1. Popular products ___________________________________________________

// All the products that were viewed
const ViewedAll = () => {
  let viewedAll = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].viewed.length; j++) {
      viewedAll.push(users[i].viewed[j]);
    }
  }
  return viewedAll;
};

//All the products that were purchased
const PurchasedAll = () => {
  let purchasedAll = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].purchased.length; j++) {
      purchasedAll.push(users[i].purchased[j]);
    }
  }
  return purchasedAll;
};

//All the products are viewed/purchased more than once
const findDuplicates = (nums) => {
  let result = [];
  nums.forEach((val, ind, arr) => {
    let temp = Math.abs(arr[ind]) - 1;

    if (arr[temp] < 0) {
      result.push(temp + 1);
    }
    arr[temp] *= -1;
  });

  return result;
};

const multipleViewed = findDuplicates(ViewedAll()); // list of products id viewed twice or more
const multiplePurchased = findDuplicates(PurchasedAll()); // list of products id purchased twice or more
const Trending = findDuplicates(PurchasedAll()); //list of "most popular" products id both viewed/purchased twice or more

// This is a listing method that allows us to display some data about duplicate products.

const listMultipleItems = (list, listType) => {
  let multipleList = [];

  for (let i = 0; i < products.length; i++) {
    if (list[i]) {
      multipleList.push([
        products[i].name,
        products[i].year,
        products[i].rating,
        products[i].price,
      ]);
    }
  }

  let innerStr =
    '<ol>' +
    multipleList.map((item) => `<li>${item[0]} - ${item[1]}</li>`).join('') +
    '</ol>';
  listType.innerHTML = innerStr;

  return multipleList;
};

//2.  “Recommended for you”___________________________________________________

//This method returns the list of genres(keyword1-5) related to the currently visited product
const listOfGenre = (uid) => {
  let listOfGenree = [];

  for (let i = 0; i < currentUserSession.length; i++) {
    if (currentUserSession[i].userid === uid) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === currentUserSession[i].id) {
          listOfGenree.push(
            products[j].keyword1,
            products[j].keyword2,
            products[j].keyword3,
            products[j].keyword4,
            products[j].keyword5
          );
        }
      }
    }
  }

  return listOfGenree;
};

const prefCateg_user1 = listOfGenre(1);
const prefCateg_user2 = listOfGenre(2);
const prefCateg_user3 = listOfGenre(3);
const prefCateg_user4 = listOfGenre(4);
const prefCateg_user5 = listOfGenre(5);

//This is a listing method that select recommendations based on movie genres user interested
const recommendationGenerator = (prefCateg) => {
  let recomList = [];
  products.map((val, index) => {
    if (
      prefCateg[index] === val.keyword1 ||
      val.keyword2 ||
      val.keyword3 ||
      val.keyword4 ||
      val.keyword5
    ) {
      recomList.push([val.name]);
    }
  });

  // program to get a random item from an array
  function getRandomItem(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const item = list[randomIndex];
    return item;
  }

  let recomMovieList = [];
  if (prefCateg.length !== 0) {
    recomMovieList = [
      getRandomItem(recomList),
      getRandomItem(recomList),
      getRandomItem(recomList),
    ];
  }

  recomMovies.innerHTML = `<ol>
  <li>${getRandomItem(recomList)}</li>
  <li>${getRandomItem(recomList)}</li>
  <li>${getRandomItem(recomList)}</li>
  </ol>`;

  return recomMovieList;
};
