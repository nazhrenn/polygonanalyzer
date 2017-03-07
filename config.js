System.config({
  //map tells the System loader where to look for things
  map: {
    app: "./src"
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    }
  }
});