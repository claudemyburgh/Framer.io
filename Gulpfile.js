const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      plumber      = require('gulp-plumber'),
      nano         = require('gulp-cssnano'),

      concat       = require('gulp-concat'),

      iconfont     = require('gulp-iconfont'),
      iconfontCss  = require('gulp-iconfont-css'),
      fontName     = 'Framer-icon',
      runTimestamp = Math.round(Date.now()/1000),


      del          = require('del'),
      gulpif       = require('gulp-if'),
      notify       = require('gulp-notify'),
      path         = require('path');



//  check in production
$production = false;




const Paths = {
  bower : 'bower_components/',
  assets: 'Framer/',
  sass  : 'Framer/sass/',
  html  : 'Framer/html/',
  js    : 'Framer/js/',
  img   : 'Framer/img/',
  fonts   : 'Framer/fonts/',
  build : 'Build/'
};


const SassArray = [
  `${Paths.bower}normalize-scss/`,
  `${Paths.fonts}Framer-Font/sass/`,
];

const JsArray = [
  `${Paths.bower}jquery/dist/jquery.js`,
  `${Paths.js}app.js`,
];

const FontsArray = [
  // `${Paths.bower}/font-awesome/fonts/**/*`,
  // `${Paths.fonts}Framer-Font/*.{eot,svg,ttf,woff}`,
  `${Paths.fonts}**/*.{eot,svg,ttf,woff}`
];



gulp.task('sass', ()=>{
  return gulp.src(`${Paths.sass}**/*.{scss,sass}`)
    .pipe(plumber())
    .pipe(sass({
      sourceComments: true,
      includePaths: SassArray,
    }).on('error', sass.logError))
    .pipe(gulpif($production, nano()))
    .pipe(gulp.dest(`${Paths.build}css/`))
    .pipe(notify({
      title   : 'Framer',
      subtitle: 'Success',
      message : 'Sass Compiled',
      icon    : path.join(__dirname, "framer.png")
    }));
});

/**
 *  Html Transport
 */
gulp.task('html', ()=>{
  return gulp.src(`${Paths.html}**/*.php`)
      .pipe(gulp.dest(`${Paths.build}`));

});

/**
 * Js Functions
 */

gulp.task('js', ()=>{
  return gulp.src(JsArray)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(`${Paths.build}js`));
});
/********************************/
/* Font Framer
/********************************/
gulp.task('fonts', ['clean'], ()=>{
  return gulp.src(FontsArray)
  .pipe(gulp.dest(`${Paths.build}fonts/`))
});

gulp.task('clean', ()=>{
  // gulp.src(`${Paths.build}fonts/`)
  return del([`${Paths.build}fonts/**`, `!${Paths.build}fonts`]);


});


/********************************/
/* Font Maker
/********************************/
gulp.task('icon', ['fonts'], () => {
  return gulp.src(`${Paths.assets}Framer-Font/svgicons/*.svg`)
    .pipe(iconfontCss({
      fontName: fontName,
      path: `${Paths.assets}Framer-Font/template/_icons.scss`,
      targetPath: '../../sass/fonts/_icons.scss',
      fontPath: 'Framer-Font/',
      cssClass: 'fr'
    }))
    .pipe(iconfont({
      fontName: fontName,
      preappendUnicode: false,
      appendCodepoints: true,
      normalize: true,
      fontHeight: 1001,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
     }))
    .pipe(gulp.dest(`${Paths.fonts}Framer-Font/`));
});


/**
 * Watcher
 */

gulp.task('watch', ()=>{
  gulp.watch(`${Paths.sass}**/*.{scss,sass}`, ['sass']);
  gulp.watch(`${Paths.html}**/*.php`, ['html']);
  gulp.watch(`${Paths.js}**/*.js`, ['js']);
})

/**
 * Default Task
 */

gulp.task('fi', ['icon', 'fonts']);
gulp.task('default', ['sass', 'html','js', 'watch']);
