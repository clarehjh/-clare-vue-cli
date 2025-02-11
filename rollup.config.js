const terser = require("@rollup/plugin-terser");
const nodeResolve = require("@rollup/plugin-node-resolve");

module.exports = [
  {
    input: ["src/index.js", "src/download.js", "src/repositories.js"],
    output: {
      dir: "dist",
      format: "cjs",
      name: "vue-cli",
    },
    plugins: [terser(), nodeResolve()],
  },
];
