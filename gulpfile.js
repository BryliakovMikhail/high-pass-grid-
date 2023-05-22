const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanСss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-imagemin");
const webp = require("gulp-webp");
const ttf2woff2 = require("gulp-ttf2woff2");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("gulp-clean");
const browserSync = require("browser-sync").create();
const gulpif = require("gulp-if");
const webpack = require("webpack-stream");


let prod = false;

const isProd = (done) => {
  prod = true;
  done();
};

const clean = () => {
  return src("dist").pipe(del());
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const styles = () => {
  return src("src/styles/**/*.css")
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(concat("normalize.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      gulpif(
        prod,
        cleanСss({
          level: 2,
        })
      )
    )
    .pipe(dest("dist"))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(browserSync.stream());
};

function buildStyles() {
  return src("src/styles/sass/**/*.scss")
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gulpif(
        prod,
        cleanСss({
          level: 2,
        })
      )
    )
    .pipe(dest("dist"))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      gulpif(
        prod,
        htmlMin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images"));
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js'
      }
    }))
    // .pipe(concat("app.js"))
    // .pipe(
    //   gulpif(
    //     prod,
    //     uglify({
    //       toplevel: true,
    //     })
    //   ).on("error", notify.onError())
    // )
    .pipe(dest("dist"))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

const fonts = () => {
  return src("src/fonts/*.ttf").pipe(ttf2woff2()).pipe(dest("dist/fonts"));
};

const images = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.jpeg",
    "src/images/**/*.png",
    "src/images/*.svg",
  ])
    .pipe(webp())
    .pipe(image())
    .pipe(dest("dist/images"));
};
const favicon = () => {
  return src("src/favicon.ico").pipe(dest("dist"));
};

watch("src/**/*.html", htmlMinify);
watch("src/styles/**/*.css", styles);
watch("src/styles/sass/**/*.scss", buildStyles);
watch("src/images/svg/**/*.svg", svgSprites);
watch("src/js/**/*.js", scripts);
watch("src/images/**", images);
watch("src/resources/**", resources);

exports.dev = series(
  clean,
  resources,
  htmlMinify,
  scripts,
  styles,
  buildStyles,
  fonts,
  images,
  svgSprites,
  favicon,
  watchFiles
);
exports.build = series(
  isProd,
  clean,
  resources,
  htmlMinify,
  scripts,
  styles,
  buildStyles,
  fonts,
  images,
  svgSprites,
  favicon,
  watchFiles
);
