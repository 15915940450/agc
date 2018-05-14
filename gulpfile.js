var gulp=require('gulp');
var del=require('del');
var gulpReplace=require('gulp-replace');
var version='_1100_'+Math.random();

//1.backupDist
gulp.task('backupDist',function(){
  //delete(agent/)
  del(['../CMS-FrontEnd/agent/**/*'],{force:true}).then(function(){
    //copy dist to /var/www/html/CMS-FrontEnd
    //mind: index.html need to change
    gulp.src(['./dist/**/*','!./dist/index.html'],{base:'./dist/'}).pipe(gulp.dest('../CMS-FrontEnd/agent/'));
    //copy index.html, replace v=1.9(lodash.ili.js)
    gulp.src('./dist/index.html',{base:'./dist/'}).pipe(gulpReplace('?v=1.9','?v=1.9'+version)).pipe(gulp.dest('../CMS-FrontEnd/agent/'));
  }); //end of del
});

//backupYApijs
gulp.task('backupYApijs',function(){
  //delete(y_api.js)
  del(['../CMS-FrontEnd/backup__do_not_move_or_modify/y_api.js'],{force:true}).then(function(){
    //copy y_api.js to backup__do_not_move_or_modify
    gulp.src(['./src/api/y_api.js'],{base:'./src/api/'}).pipe(gulp.dest('../CMS-FrontEnd/backup__do_not_move_or_modify/'));
  }); //end of del
});

//backupEditorConfig
gulp.task('backupEditorConfig',function(){
  //:Sublime Text 3
  //delete(sublime_editor)
  del(['./sublime_editor/**/*']).then(function(){
    //copy from /home/thilina/.config/sublime-text-3/Packages/User
    gulp.src([
      '/home/thilina/.config/sublime-text-3/Packages/User/*.sublime-keymap',
      '/home/thilina/.config/sublime-text-3/Packages/User/*.sublime-snippet',
      '/home/thilina/.config/sublime-text-3/Packages/User/*.sublime-settings'
    ]).pipe(gulp.dest('./sublime_editor/'));
  });
  //:vim
  //delete(vim_editor)
  del(['./vim_editor/**/*']).then(function(){
    //copy from /home/thilina
    gulp.src([
      '/home/thilina/.vimrc'
    ]).pipe(gulp.dest('./vim_editor/'));
  });
});

gulp.task('default',['backupDist','backupYApijs','backupEditorConfig'],function(){
  console.log('version:1.9'+version+'. make sure you have check out the agc branch(CMS-FrontEnd).');
});