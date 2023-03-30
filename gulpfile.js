const { src, dest, parallel, series, watch } = require("gulp");
const stylelint = require("@ronilaukkarinen/gulp-stylelint");
const sass = require("gulp-sass")(require("sass"));
const pugLinter = require("gulp-pug-linter");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const purgecss = require("gulp-purgecss");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

const browserSyncJob = () => {
  browserSync.init({
    server: "build/",
    open: false
  });

  watch("src/scss/**/*.scss", series(lintBuildSass));
  watch("src/pug/**/*.pug", series(lintPug, buildPug));
};

const lintBuildSass = () => {
  console.log("Проверка линтером Sass, компиляция SASS");

  return src("src/scss/**/*.scss")
    .pipe(stylelint({
      configFile: "./.stylelintrc.js",
      failAfterError: true,
      reporters: [
        { formatter: "string", console: true }
      ],
      fix: true
    }))
    .pipe(sass({
      outputStyle: "expanded" // compressed | expanded
    }))
    .pipe(dest("build/css/"));
};

const purgeCSS = () => {
  console.log("запуск PurgeCSS");

  return src("build/css/*.css")
    .pipe(purgecss({
      content: ["build/*.html"],
      variables: true
    }))
    .pipe(dest("build/css"));
};

const postCSS = () => {
  console.log("запуск Autoprefixer");

  return src("build/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
};

function lintPug() {
  console.log("Проверка линтером Pug");

  return src("src/pug/pages/*.pug")
    .pipe(pugLinter({
      reporter: "puglint-stylish",
      failAfterError: true
    }));
}

const buildPug = () => {
  console.log("Компиляция Pug");

  return src("src/pug/pages/*.pug")
    .pipe(pug({
      pretty: true, // null | true
      doctype: "html"
    }))
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
};

exports.server = browserSyncJob;
exports.build = parallel(series(lintPug, buildPug), series(lintBuildSass, purgeCSS, postCSS));
exports.default = series(parallel(series(lintPug, buildPug), lintBuildSass), browserSyncJob);
