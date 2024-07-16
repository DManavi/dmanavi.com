const htmlminPlugin = require("html-minifier-terser");
const sitemapPlugin = require("@quasibit/eleventy-plugin-sitemap");

/**
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 * @returns {import('@11ty/eleventy').UserConfig}
 */
module.exports = function eleventyDefaultConfig(eleventyConfig) {
  eleventyConfig.addPlugin(sitemapPlugin, {
    sitemap: {
      hostname: "https://dmanavi.com",
    },
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlminPlugin.minify(content, {
        // useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  eleventyConfig.addPassthroughCopy({
    "./public": "/assets",
  });

  return {
    ...eleventyConfig,

    dir: {
      input: "pages",

      includes: "../views/includes",
      layouts: "../views/layouts",
      data: "../data",
    },

    // template engine config
    templateFormats: ["njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    // passthrough file copy
  };
};
