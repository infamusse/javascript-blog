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

const generateTitleLinks = function(customSelector = "") {
  const posts = document.querySelectorAll(".post" + customSelector);
  console.log(customSelector);
  let html = "";
  for (let post of posts) {
    const element =
      "<li><a href=#" +
      post.getAttribute("id") +
      ">" +
      post.querySelector(".post-title").innerText +
      "</li></a>";
    html += element;
    console.log(html);
  }

  document.querySelector(".list.titles").innerHTML = html;

  /*Old version*/
  //   const author = clickedElement;
  //   const articles = document.querySelectorAll(".titles a");
  //   const posts = document.querySelectorAll("article.post");
  //   const backButton = document.getElementById("Back");
  //   backButton.addEventListener("click", function() {
  //     for (let article of articles) {
  //       article.classList.remove("post");
  //     }
  //     backButton.classList.remove("active");
  //     backButton.classList.add("post");
  //   });

  //   for (let article of articles) {
  //     article.classList.add("post");
  //     article.classList.remove("active");
  //   }
  //   for (const post of posts) {
  //     let postAuthor = post
  //       .querySelector(".post-author")
  //       .innerHTML.replace("by ", "");
  //     if (author.innerHTML == postAuthor) {
  //       const postId = post.getAttribute("id");
  //       for (let article of articles) {
  //         const articlesHref = article.getAttribute("href");
  //         if (articlesHref.replace("#", "") == postId) {
  //           article.classList.remove("post");
  //           backButton.classList.remove("post");
  //         }
  //       }
  //     }
  //   }
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
};

generateTitleLinks();
const authors = document.querySelectorAll(".list.authors a");

for (const author of authors) {
  author.addEventListener("click", function() {
    generateTitleLinks("[data-author='" + this.getAttribute("href") + "']");
    document.querySelector("button").classList.remove("button--hide");
    console.log(this, this.getAttribute("href"));
    event.preventDefault();
  });
}

document.querySelector("button").addEventListener("click", function() {
  generateTitleLinks();
  document.querySelector("button").classList.add("button--hide");
});
