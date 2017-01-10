console.log('Starting Password Manager...\n');

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('create', 'Create a new account', function (yargs) {
      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: 'Account name (eg: Twitter, Facebook)',
          type: 'string'
        },
        username: {
          demand: true,
          alias: 'u',
          description: 'Account username or email (eg: test123, test123@testmail.com)',
          type: 'string'
        },
        password: {
          demand: true,
          alias: 'p',
          description: 'Account password (eg: mypassword)',
          type: 'string'
        },
        master-password: {
          demand: true,
          alias: 'm',
          description: 'Master Password for accessing the password wallet',
          type: 'string'
        }
      }).help('help');
    })
    .command('get', 'Get an existing account', function (yargs) {
      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: 'Account name (eg: Twitter, Facebook)',
          type: 'string'
        },
        master-password: {
          demand: true,
          alias: 'm',
          description: 'Master Password for accessing the password wallet',
          type: 'string'
        }
      }).help('help');
    })
    .help('help')
    .argv;

var command = argv._[0];

function createAccount (account) {
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined') {
    accounts = [];
  }

  accounts.push(account);
  storage.setItemSync('accounts', accounts);

  return account;
}

function getAccount (accountName) {
  var accounts = storage.getItemSync('accounts');
  var matchedAccount;

  accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAccount = account;
    }
  });

  return matchedAccount;
}

if (command === 'create') {
  var createdAccount = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password
  });
  console.log('Account Created!\n');
  console.log(createdAccount);
  console.log();
} else if (command === 'get') {
  var fetchedAccount = getAccount(argv.name);
  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found!\n');
  } else {
    console.log('Account Found\n');
    console.log(fetchedAccount);
    console.log();
  }
}
