'use strict';

var fs = require('fs');
var manifest = require('../package.json');
var file = process.argv.slice(2).toString();

function read(file, callback) {
  fs.readFile(file, 'utf8', function (error, chunk) {
    if (error) {
      throw error;
    }

    callback(chunk);
  });
}

function write(content, file, callback) {
  fs.writeFile(file, content, 'utf8', function (error) {
    if (error) {
      throw error;
    }

    callback();
  });
}

read(file, function (chunk) {
  console.log('Adding meta data...');

  var content = chunk
                    .replace('{{version}}', manifest.version)
                    .replace('{{license}}', manifest.license)
                    .replace('@license', '');

  write(content, file, function () {
    console.log('Done');
  });
});