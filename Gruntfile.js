/* jshint node:true */
module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	var app = {

		// gets the package vars
		pkg: grunt.file.readJSON('package.json'),

		// setting folder templates
		dirs: {
			js: 'public/javascripts',
			libs: 'public/libs',
			plugins: 'public/plugins',
			sass: 'public/stylesheets',
			images: 'public/images',
			fonts: 'public/fonts'
		},

		// javascript linting with jshint
		jshint: {
			options: {
				jshintrc: true
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.js %>',
			]
		},

		// uglify to concat and minify
		uglify: {
			dist: {
				files: {
					'public/build.min.js': [
						'<%= dirs.libs %>/*/*.js',
						'<%= dirs.plugins %>/*/*.js',
						'<%= dirs.js %>/app/*.js',
						'<%= dirs.js %>/*/*.js'
					]
				}
			},
		},

		// compile scss/sass files to CSS
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.sass %>',
					src: ['*.scss'],
					dest: 'public',
					ext: '.min.css'
				}]
			}
		},

		// watch for changes and trigger sass, jshint, uglify and livereload browser
		watch: {
			sass: {
				files: [
					'<%= dirs.sass %>/**'
				],
				tasks: ['sass']
			},
			js: {
				files: [
					'<%= dirs.libs %>/**',
					'<%= dirs.js %>/**'
				],
				tasks: [ 'uglify']
			},
			options: {
				spawn: false
			}
		},

		nodemon: {
			dev: {
				script: 'app/',
				options: {
					env: {
						PORT: '8080'
					},
				}
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		},

	};

	// Initialize Grunt Config
	// --------------------------
	grunt.initConfig(app);

	// Register Tasks
	// --------------------------

	// Default Task
	grunt.registerTask('default', ['concurrent']);

	// Optimize Images Task
	grunt.registerTask('optimize', ['imagemin']);

	// Short aliases
	grunt.registerTask('w', ['watch']);
	grunt.registerTask('o', ['optimize']);
};
