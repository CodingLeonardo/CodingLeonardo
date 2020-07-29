const fs = require("fs").promises;
const Parser = require("rss-parser");
const parser = new Parser();

const LATEST_ARTICLE_PLACEHOLDER = "%{{latest_articles}}%";

(async () => {
  const markdownTemplate = await fs.readFile("./src/README.md.tpl", {
    encoding: "utf-8",
  });
  const { items } = await parser.parseURL(
    "https://medium.com/feed/@CodingLeonardo"
  );
  const [{ title, link }] = items;
  const latestArticleMarkdown = `[${title}](${link})`;
  let newMarkdown = markdownTemplate.replace(
    LATEST_ARTICLE_PLACEHOLDER,
    latestArticleMarkdown
  );

  await fs.writeFile("./README.md", newMarkdown);
})();
