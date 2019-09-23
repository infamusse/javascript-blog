"use strict";

const titleClickHandler = function(event) {
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
  createPostLinks(posts);
  const links = document.querySelectorAll(".titles li a");

  const addEventListenerToLink = links => {
    links.addEventListener("click", titleClickHandler);
  };

  links.forEach(addEventListenerToLink);
};

generateTitleLinks();

const generateAuthors = authors => {
  for (const author of authors) {
    author.addEventListener("click", function() {
      generateTitleLinks("[data-author='" + this.getAttribute("href") + "']");
      document.querySelector("button").classList.remove("button--hide");
      event.preventDefault();
    });
  }
};
const authors = document.querySelectorAll(".list.authors a");
generateAuthors(authors);

document.querySelector("button").addEventListener("click", function() {
  generateTitleLinks();
  document.querySelector("button").classList.add("button--hide");
});

function calculateTagParams(tags) {
  const params = {
    min: 999999,
    max: 0
  };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}
let optCloudClassCount = 5;
let optCloudClassPrefix = "tag-size-";

function calculateTagClass(count, params) {
  const classNumber = Math.floor(
    ((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1
  );
  if (classNumber >= params.max * 0.66) {
    return "big";
  } else if (classNumber >= params.max * 0.33 <= params.max * 0.66) {
    return "medium";
  } else {
    return "small";
  }
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(".post");
  for (let article of articles) {
    let tagsWrapper = article.querySelector(".post-tags .list.list-horizontal");
    let html = "";
    const tags = article.getAttribute("data-tags").split(" ");
    for (let tag of tags) {
      const element = "<li><a href='#data-" + tag + "'>" + tag + "</a></li>";
      html += element;
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
    const tagParams = calculateTagParams(allTags);
    console.log("tagParams", tagParams);
    let allTagsHTML = "";
    for (let tag in allTags) {
      const tagLinkHTML =
        "<li><a href='#'class='" +
        optCloudClassPrefix +
        calculateTagClass(allTags[tag], tagParams) +
        "'>" +
        tag +
        "</a><li>";
      allTagsHTML += tagLinkHTML;
    }
    const tagList = document.querySelector(".tags");
    tagList.innerHTML = allTagsHTML;
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
