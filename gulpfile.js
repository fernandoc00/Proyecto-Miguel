require("gulp");



var gulp = require('gulp');
const git = require('gulp-git');
const sass = require('gulp-sass')(require('sass'));
var sassdoc = require('sassdoc');



var gutil = require('gulp-util')
var ftp = require('vinyl-ftp')

/** Configuration **/
var user = 'u164705062.fernandocaravaca.com'
var password = 'Prueba123'

var localFiles = ['./src/**/*','./sassdoc/**/*','*.ico','*.js','*.html'];
var remoteFolder = '/public_html/sapphire'


// helper function to build an FTP connection based on our configuration
function getFtpConnection(){
    return ftp.create({
            protocol: "ftp",
            host : 'ftp.axiomaprint.net',
            port : 21,
           user: user,
           password: password,
           log: gutil.log
     });
}


gulp.task('remote-deploy', function(){
     var conn = getFtpConnection();
     return gulp.src(localFiles, {base: '.', buffer: false})
                .pipe(conn.newer(remoteFolder))
                .pipe(conn.dest(remoteFolder))
})
