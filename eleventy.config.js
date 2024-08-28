import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { execSync } from "child_process";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy("./src/assets");

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  eleventyConfig.addPassthroughCopy({
    "./src/tech/assets/img": "./src/assets/img",
  });

  const markdownLib = markdownIt(options).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addFilter("toUTCString", (value) => value.toISOString().substring(0, 10));

  eleventyConfig.on('afterBuild', () => {
    execSync('pnpm build:index', { stdio: 'inherit' });
  });

  return {
    dir: {
      input: "./src",
      output: "www",
    },
  };
};
