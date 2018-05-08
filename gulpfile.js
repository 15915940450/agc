var gulp=require('gulp');
var del=require('del');
var gulpReplace=require('gulp-replace');
var version='1100';

gulp.task('moveToCMS',function(){
  //delete
  del(['../CMS-FrontEnd/agent/**/*'],{force:true}).then(function(){

    //copy dist to /var/www/html/CMS-FrontEnd
    //mind: index.html need to change
    gulp.src(['./dist/**/*','!./dist/index.html'],{base:'./dist/'})
    .pipe(gulp.dest('../CMS-FrontEnd/agent/'));
    
    //copy index.html, replace v=1.9(lodash.ili.js)
    gulp.src('./dist/index.html',{base:'./dist/'})
    .pipe(gulpReplace('?v=1.9','?v=1.9'+version))
    .pipe(gulp.dest('../CMS-FrontEnd/agent/'));

  }); //end of del
});

gulp.task('default',['moveToCMS'],function(){
  console.log('version:1.9'+version);
});