"use strict";

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  /*  [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* [DONE] get 'href' attribute from the clicked link */

  let attribute = clickedElement.getAttribute("href");
  console.log(attribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  let activeArticle = document.querySelector(attribute);

  /* [DONE] add class 'active' to the correct article */

  activeArticle.classList.add("active");
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
