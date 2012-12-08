#!/usr/bin/env node;

var commander = require('commander');
require('colorful').colorful();
var logging = require('../lib/spm').logging;
var builder = require('../lib/core/build');

commander.usage('[options]');

commander
  .option('-u, --username <username>', 'default value from user.username')
  .option('-p, --password <password>', 'default value from user.password')
  .option('-s, --source <source>', 'default value will be the first source')
  .option('-f, --force', 'force to download a unstable module')
  .option('-I, --input-directory <dir>', 'input directory, default: src')
  .option('-O, --output-directory <dir>', 'output directory, default: dist')
  .option('-F, --files <files>', 'default: all files in input directory', list)
  .option('--module-name <name>', 'module name, default: package.name')
  .option('--module-version <version>', 'module version, default: package.version')
  .option('--module-root <root>', 'module root, default: package.root')
  .option('--interrupt', 'stop the process when warn or error')
  .option('-v, --verbose', 'show more logs')
  .option('-q, --quiet', 'show less logs');

commander
  .command('help')
  .description('show this help menu')
  .action(function() {
    process.stdout.write(commander.helpInformation());
    commander.emit('--help');
    process.exit();
  });


commander.on('--help', function() {
  console.log();
  console.log('  ' + 'Examples:'.to.bold.blue.color);
  console.log();
  console.log('   Build a standard cmd module is simple');
  console.log();
  console.log('   $ ' + 'spm build'.to.magenta.color);
  console.log();
  console.log('   Just build a file with spm');
  console.log();
  console.log('   $ ' + 'spm build'.to.magenta.color + ' ' + '-F'.to.cyan.color + ' a.js ' + '-O'.to.cyan.color + ' dist');
  console.log();
  console.log('   For more information: ' + 'http://spmjs.org/docs/build.html'.to.underline.color);
  console.log();
});



commander.parse(process.argv);

// verbose vs quiet
logging.config(commander);

// run install
builder.run(commander);

function list(val) {
  return val.split(',');
}