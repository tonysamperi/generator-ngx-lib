"use strict";

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var plumber = require("gulp-plumber");
var exec = require("child_process").exec;

gulp.task("audit", function (cb) {
    exec("npm audit --audit-level high", function (err, stdout, stderr) {
        console.info("Audit complete!");
        cb(err);
    });
});

gulp.task("pre-test", function () {
    return gulp.src("generators/**/*.js")
    .pipe(istanbul({
        includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], function (cb) {
    var mochaErr;

    gulp.src("test/**/*.js")
    .pipe(plumber())
    .pipe(mocha({reporter: "spec", timeout: 60000}))
    .on("error", function (err) {
        mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on("end", function () {
        cb(mochaErr);
    });
});


gulp.task("prepublish", ["test"]);
gulp.task("default", ["test"]);
