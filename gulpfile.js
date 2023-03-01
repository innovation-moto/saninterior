const browserSync   = require('browser-sync'),

      babelify      = require('babelify'),
      browserify    = require('browserify'),
      buffer        = require('vinyl-buffer'),
      source        = require('vinyl-source-stream'),
      sourcemaps    = require('gulp-sourcemaps'),
      uglify        = require('gulp-uglify'),

      gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      ejs          = require('gulp-ejs'),
      rename = require('gulp-rename'),
      plumber       = require('gulp-plumber'),
      imagemin      = require("gulp-imagemin");


gulp.task("ejs", function() {
    gulp.src(
        ["./src/view/**/*.ejs",'!' + "./src/view/**/_*.ejs"]
    )
        .pipe(ejs())
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest("public/"))
});

gulp.task('sass', function() {
    gulp.src("./src/sass/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        //.pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', function(err) {
          console.log(err.message);
        })
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("public/assets/css"))
        .pipe(gulp.dest("wordpress/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('js',function(){
  // return webpackStream(webpackConfig, webpack)
  //   .pipe(gulp.dest("public/assets/js"));

  browserify({
      // 対象ファイル
      entries: ['./src/js/app.js'],
      debug: true,
      // 使用する~ifyを指定
      transform: [
          // babelifyを使用してコンパイル元でECMAScriptが使えるように設定
          ['babelify', {presets: ['es2015']}],
          // あらゆるファイルをテキストとしてexportしてくれる。シェーダー用
          ['stringify', {appliesTo: {includeExtensions: ['.vert', '.frag']}}]
      ]
  }).bundle()
    .on('error', err => console.log('Error : ' + err.message))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(gulp.dest('./wordpress/assets/js'))
    .pipe(browserSync.reload({stream: true}))


});

gulp.task('lib',function(){
    // return webpackStream(webpackConfig, webpack)
    //   .pipe(gulp.dest("public/assets/js"));

    browserify({
        // 対象ファイル
        entries: ['./src/js/webgl-lib.js'],
        debug: true,
        // 使用する~ifyを指定
        transform: [
            // babelifyを使用してコンパイル元でECMAScriptが使えるように設定
            ['babelify', {presets: ['es2015']}],
            // あらゆるファイルをテキストとしてexportしてくれる。シェーダー用
            ['stringify', {appliesTo: {includeExtensions: ['.vert', '.frag']}}]
        ]
    }).bundle()
        .on('error', err => console.log('Error : ' + err.message))
        .pipe(source('webgl-lib.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(gulp.dest('./wordpress/assets/js'))
        .pipe(browserSync.reload({stream: true}))


});

gulp.task('imagemin', function(){
  return gulp.src('./src/img/**/*')
  .pipe(imagemin({
    verbose: true,
    progressive: true,
    plugins: [
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
      ]
  }))
  .pipe(gulp.dest('public/assets/img'))
  .pipe(gulp.dest('public/wordpress/img'));
});

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve', ['sass','js','ejs'], function() {
//gulp.task('serve', ['sass','js'], function() {
    browserSync.init({
        server: "./public/"
    });

    gulp.watch(["./src/sass/*.scss","./src/sass/**/*.scss"], ['sass']);
    gulp.watch(["./src/js/*.js","./src/js/**/*.js","./src/js/lib/*.js","./src/js/**/*.vue"],["js"]);
    gulp.watch(["./src/view/**/*.ejs", '!node_modules'],["ejs"]);
    gulp.watch(['./public/*.html', '!node_modules'], ['reload']);
    gulp.watch(["*.html","**/*.html"]).on('change', browserSync.reload);

});


gulp.task("default",['serve']);