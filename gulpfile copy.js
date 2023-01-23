const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const jpegrecompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const cache = require("gulp-cache");
const htmlpartial = require("gulp-html-partial");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const replace = require("gulp-replace");
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const svg2string = require("gulp-svg2string");
const path = require('path');

// options for gulp-autoprefixer
var autoprefixerList = [
  "Chrome >= 45",
  "Firefox ESR",
  "Edge >= 12",
  "Explorer >= 10",
  "iOS >= 9",
  "Safari >= 9",
  "Android >= 4.4",
  "Opera >= 30",
];

// paths to source files (src), to ready-made files (build), as well as to those whose changes need to be monitored (watch)
var paths = {
  build: {
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/",
  },
  src: {
    html: "src/**/*.html",
    js: "src/js/common.js",
    style: "src/sass/common.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
    svgSrc: "src/svg/src/**/*.*",
    svgDist: "src/svg/dist/",
    jsSvg: "src/js/svg.js",
    partials: "src/partials/",
    buildFiles: "build/**",
    build: "build/",
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    css: "src/sass/**/*.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./build",
};

// make svgs
gulp.task("svg-make", function () {
  del.sync(paths.src.svgDist);

  return gulp
    .src(paths.src.svgSrc)
    .pipe(
      svgmin(function getOptions(file) {
        var prefix = path.posix.basename(
          file.relative,
          path.extname(file.relative)
        );
        return {
          plugins: [
            //list of plugins https://github.com/svg/svgo/tree/master/plugins
            //add unique id
            {
              cleanupIDs: {
                prefix: prefix + "-",
                minify: true,1
              },
            },
            {
              removeViewBox: false,
            },
            // remove width and height
            {
              removeDimensions: true,
            },
          ],
        };
      })
    )
    .pipe(gulp.dest(paths.src.svgDist))
    .pipe(svgstore())
    .pipe(svg2string())
    .pipe(rename(paths.src.jsSvg))
    .pipe(gulp.dest("./"));
});

// build html
gulp.task("html:build", function (done) {
  return gulp
    .src([paths.src.html, "!./src/partials/*"]) // selection of all html files in the specified path
    .pipe(plumber()) // errors tracking
    .pipe(
      htmlpartial({
        basePath: paths.src.partials, // import "<partial src="..."></partial>" partials
      })
    )
    .pipe(rigger()) // import "//=" partials
    .pipe(gulp.dest(paths.build.html)) // laying out ready files
    .pipe(browserSync.reload({ stream: true })); // server reboot
  done();
});

// build css
gulp.task("css:build", function (done) {
  return gulp
    .src(paths.src.style) // get common.scss
    .pipe(plumber()) // errors tracking
    .pipe(sourcemaps.init()) // initialize sourcemap
    .pipe(sass())
    .pipe(replace("/img/", " ../img/"))
    .pipe(replace("/fonts/", " ../fonts/"))
    .pipe(
      autoprefixer({
        // add prefixes
        browsers: autoprefixerList,
      })
    )
    .pipe(gulp.dest(paths.build.css))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano()) // minimizing CSS
    .pipe(sourcemaps.write("./")) // write sourcemap
    .pipe(gulp.dest(paths.build.css)) // upload to build
    .pipe(browserSync.reload({ stream: true })); // reboot the server
  done();
});


gulp.task("js:build", function (done) {
  return gulp
    .src(paths.src.js) // get the common.js file
    .pipe(plumber()) // to track errors
    .pipe(rigger()) // import all specified files into common.js
    .pipe(gulp.dest(paths.build.js))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.init()) // initialize sourcemap
    .pipe(uglify()) // minimizing js
    .pipe(sourcemaps.write("./")) //  write sourcemap
    .pipe(gulp.dest(paths.build.js)) // put in the finished file
    .pipe(browserSync.reload({ stream: true })); // reboot the server
  done();
});

// copy fonts
gulp.task("fonts:build", function (done) {
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.build.fonts));
  done();
});

// image processing
gulp.task("image:build", function (done) {
  return gulp
    .src(paths.src.img) 
    // .pipe(
    //   cache(
    //     imagemin([

    //       imagemin.gifsicle({ interlaced: true }),
    //       jpegrecompress({
    //         progressive: true,
    //         max: 90,
    //         min: 80,
    //       }),
    //       pngquant(),
    //       imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
    //     ])
    //   )
    // )
    .pipe(gulp.dest(paths.build.img)); // uploading finished files
});

// delete build directory
gulp.task("clean:build", function (done) {
  return del.sync(paths.clean);
  done();
});

// clear cache
gulp.task("cache:clear", function (done) {
  return cache.clearAll();
  done();
});

// build project
gulp.task(
  "build",
  gulp.parallel([
    "clean:build",
    "html:build",
    "css:build",
    "js:build",
    "fonts:build",
    "image:build",
  ])
);

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    browser: "chrome",
  });

  gulp
    .watch(
      [
        paths.watch.html,
        paths.watch.css,
        paths.watch.js,
        paths.watch.img,
        paths.watch.fonts,
      ],
      gulp.parallel([
        "html:build",
        "css:build",
        "js:build",
        "image:build",
        "fonts:build",
      ])
    )
    .on("change", browserSync.reload);
});

// default task
gulp.task("default", gulp.parallel(["build", "watch"]));
