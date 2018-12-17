const gulp = require("gulp"),
    path = require("path"),
    runSequence = require("run-sequence"),
    exec = require("child_process").exec,
    sass = require("gulp-sass")
    // tildeImporter = require("node-sass-tilde-importer")
;

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "lib");
const distFolder = path.join(rootFolder, "dist");

//TS
const distScssFolder = path.join(distFolder, "scss");
const distCssFolder = path.join(distFolder, "css");

gulp.task("build:scss", function (cb) {
    console.info("Build:SCSS");
    gulp.src([
        `${srcFolder}/scss/sample-global.scss`,
    ])
    .pipe(sass({
        // importer: tildeImporter
    }))
    .pipe(gulp.dest(distCssFolder));
    gulp.src([
        `${srcFolder}/sample-global.scss`
    ])
    .pipe(gulp.dest(distScssFolder));
    cb();
});

gulp.task("packagr", function (cb) {
    exec("ng-packagr -p ng-package.json", function (err, stdout, stderr) {
        console.info("packed");
        cb(err);
    });
});

gulp.task("build", function (callback) {
    runSequence("packagr", "build:scss", callback);
});
