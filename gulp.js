var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		uglifyJS = require('gulp-uglify'),
		uglifyCSS = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		useref = require('gulp-useref'),
		imagemin = require('gulp-imagemin'),
		gulpIf = require('gulp-if'),
		cache = require('gulp-cache'),
		babel = require('gulp-babel'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del');

/* Tasks */
gulp.task('sass', function() {
	gulp.src('dev/scss/**/*.scss') // Берем исходные файлы dev
											// ** берет все *.sass во всех влож директориях
												// *.+(scss|sass) - возьмет все scss и sass файлы
											// ['dev/sass/**/*.sass', '!app/sass/test.sass']
											   // !dev/sass/main.sass - исключить файл
											// 
	.pipe(sass())               // Делаем что-то с файлами
	.pipe(gulp.dest('dev/css')) // Положить файлы в папку prod
	.pipe(browserSync.reload({  // Обновлять страницу при изм sass
		stream: true
	}));
});

gulp.task('uglify', function() {
	return gulp.src('dev/*.html')
					.pipe(useref())
					.pipe(gulpIf('*.js', babel({ presets: ['es2015'] })))
					.pipe(gulpIf('*.js', uglifyJS()))
					.pipe(gulpIf('*.css', autoprefixer()))
					.pipe(gulpIf('*.css', uglifyCSS()))
					.pipe(gulp.dest('prod'));
});

gulp.task('images', function(){
  	return gulp.src('dev/img/**/*.+(png|jpg|gif|svg)')
					.pipe(cache(imagemin()))
					.pipe(gulp.dest('prod/img'));
});

gulp.task('fonts', function() {
  	return gulp.src('dev/fonts/**/*')
  					.pipe(gulp.dest('prod/fonts'));
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dev'
		}
	});
});

gulp.task('clean', function() {
  return del.sync('prod');
});

/* Commands Build and Watch */
gulp.task('watch', ['browserSync', 'sass'], function() { // В массиве таски кот отраб до нач watch
	gulp.watch('dev/sass/**/*.sass', ['sass']); // В массиве таски кот вып при изменении файлов
	gulp.watch('dev/*.html', browserSync.reload);
	gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'uglify', 'images', 'fonts'], function (){
  console.log('Building files');
});
