"use strict";
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  dataCloud: Handlebars.compile(
    document.querySelector("#template-tags-cloud").innerHTML
  ),
  tagsPost: Handlebars.compile(
    document.querySelector("#template-tags-post").innerHTML
  )
};

const titleClickHandler = event => {
  event.preventDefault();
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  event.target.classList.add("active");
  const activeArticles = document.querySelectorAll(".posts article.active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  let attribute = event.target.getAttribute("href");
  let activeArticle = document.querySelector(attribute);

  activeArticle.classList.add("active");
};

const createPostLinks = posts => {
  let html = "";
  for (let post of posts) {
    const linkHTMLData = {
      id: post.getAttribute("id"),
      title: post.querySelector(".post-title").innerText
    };
    html += templates.articleLink(linkHTMLData);
    console.log(linkHTMLData);
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

const calculateTagParams = tags => {
  const params = {
    min: 999999,
    max: 0
  };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
};
const optCloudClassCount = 5;
const optCloudClassPrefix = "tag-size-";

const calculateTagClass = (count, params) => {
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
};

const generateTags = () => {
  let allTags = {};
  const articles = document.querySelectorAll(".post");
  for (let article of articles) {
    let tagsWrapper = article.querySelector(".post-tags .list.list-horizontal");
    const tags = article.getAttribute("data-tags").split(" ");
    for (let tag of tags) {
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    const tagParams = calculateTagParams(allTags);
    let allTagsData = { tags: [] };
    for (let tag in allTags) {
      allTagsData.tags.push({
        classPrefix: optCloudClassPrefix,
        class: calculateTagClass(allTags[tag], tagParams),
        tagName: tag
      });
      // allTagsData += templates.dataCloud(allTagsData);
      console.log("allTagsData", allTagsData);
    }
    const tagList = document.querySelector(".tags");
    tagsWrapper.innerHTML = templates.tagsPost(allTagsData);
    tagList.innerHTML = templates.dataCloud(allTagsData);
  }
};

generateTags();

const tags = document.querySelectorAll(
  ".list.tags > li > a, .list.list-horizontal > li > a "
);
const sortByTags = tags => {
  for (let tag of tags) {
    tag.addEventListener("click", event => {
      generateTitleLinks("[data-tags~='" + event.target.innerText + "']");
      document.querySelector("button").classList.remove("button--hide");
      event.preventDefault();
    });
  }
};
sortByTags(tags);
