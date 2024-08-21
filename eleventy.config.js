import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  let markdownLib = markdownIt(options).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "www",
    },
  };
};
