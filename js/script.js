"use strict";

const titleClickHandler = function(event) {
  console.log(event);
  event.preventDefault();

  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  this.classList.add("active");

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  let attribute = this.getAttribute("href");
  console.log(attribute);

  let activeArticle = document.querySelector(attribute);

  activeArticle.classList.add("active");
};

const createPostLinks = posts => {
  let html = "";
  for (let post of posts) {
    const element =
      "<li><a href=#" +
      post.getAttribute("id") +
      ">" +
      post.querySelector(".post-title").innerText +
      "</li></a>";
    html += element;
  }
  document.querySelector(".list.titles").innerHTML = html;
};

const generateTitleLinks = (customSelector = "") => {
  const posts = document.querySelectorAll(".post" + customSelector);
  console.log("custom: " + customSelector);
  createPostLinks(posts);
  const links = document.querySelectorAll(".titles li a");

  const addEventListenerToLink = links => {
    links.addEventListener("click", titleClickHandler);
  };

  links.forEach(addEventListenerToLink);
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

function generateTags() {
  const articles = document.querySelectorAll(".post");
  for (let article of articles) {
    let tagsWrapper = article.querySelector(".post-tags .list.list-horizontal");
    let html = "";
    const tags = article.getAttribute("data-tags").split(" ");
    for (let tag of tags) {
      const element = "<li><a href='#data-" + tag + "'>" + tag + "</a></li>";
      html += element;
    }
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);
  }
}

generateTags();

const tags = document.querySelectorAll(
  ".list.tags > li > a, .list.list-horizontal > li > a "
);
for (let tag of tags) {
  tag.addEventListener("click", event => {
    generateTitleLinks("[data-tags~='" + event.target.innerText + "']");
    document.querySelector("button").classList.remove("button--hide");
    event.preventDefault();
  });
}
