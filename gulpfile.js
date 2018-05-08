var gulp=require('gulp');
var del=require('del');
var gulpReplace=require('gulp-replace');
var version='1100';

gulp.task('moveToCMS',function(){
  //delete
  del(['../CMS-FrontEnd/agent/**/*'],{force:true});
});

gulp.task('default',['moveToCMS'],function(){
  console.log('version:1.9'+version);
});