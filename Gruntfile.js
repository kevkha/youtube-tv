module.exports = function(grunt) {

  grunt.initConfig({
    nwjs: {
      options: {
        app_name: "Remote",
        app_version: "0.0.1",
        zip: false, // No zip for the mac app

        version: "0.12.3", // Node-webkit version
        build_dir: "./build",
        cacheDir: './build/cache',

        mac_icns: "./assets/icon.icns",
        mac: true,
        win: true,
        linux32: false,
        linux64: false
      },
      src: ["./package.json", "./assets/**", "./node_modules/**", "!./node_modules/grunt*/**"]
    },

    // We need to copy FFMPEG libraries to add support for videos and mp3s
    copy: {
      main: {
        files: [
          {
            src: 'libraries/windows/ffmpegsumo.dll',
            dest: 'build/cache/0.12.3/win32/ffmpegsumo.dll',
            flatten: true
          },
          {
            src: 'libraries/mac/ffmpegsumo.so',
            dest: 'build/cache/0.12.3/osx32/nwjs.app/Contents/Frameworks/nwjs Framework.framework/Libraries/ffmpegsumo.so',
            flatten: true
          }
        ]
      }
    }
  });


  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-nw-builder");

  // uncomment if need to copy FFMPEG libraries
  // grunt.registerTask("nodewebkitbuild", ["nwjs", "copy"]);

  // build without copy of FFMPEG libraries
  grunt.registerTask("nodewebkitbuild", ["nwjs"]);
  grunt.registerTask("copylibs", ["copy"]);

 };
