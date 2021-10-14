// Less configuration
var gulp = require("gulp");
var less = require("gulp-less");

gulp.task("less", function (cb) {
  gulp
    .src("./Styles/*.less")
    .pipe(less())
    .pipe(
      gulp.dest(function (f) {
        return f.base;
      })
    );
  cb();
});

gulp.task(
  "TranspileTheLess",
  gulp.series("less", function (cb) {
    gulp.watch("./Styles/*.less", gulp.series("less"));
    cb();
  })
);
