const moment = require('moment');
const Colors = require('colors/safe');

// simple log functions
class Log {

  static now() {
    let mom = moment();
    return `${mom.format('DD/MM/YYYY HH:mm:ss')}`;
  }

  static pref() {

    let pref = '';

		if ( process.env.LOG_NAME ) {
			pref = `[${Colors.yellow( process.env.LOG_NAME )}]`;
		}

    if ( process.env.LOG_TIME == "yes" ) {
      pref += `${this.now()}` + '.';
    } else {
      pref = pref.length ? pref+'.' : '';
    }

    return pref;
  }

  static error( msg ) {
    process.stderr.write(`${this.pref()}${Colors.bold.red( 'error' )}: ${msg}`);
  }

  static param( attr, val ) {
    Log.info( Colors.magenta( attr ) + ': ' + val );
  }

  static info( msg ) {
    process.stdout.write(`${Log.pref()}${Colors.bold.cyan( 'info' )}: ${msg}`);
  }

  static warn( msg ) {
    process.stdout.write(`${Log.pref()}${Colors.bold.yellow( 'warn' )}: ${msg}`);
  }

  static success( msg ) {
    process.stdout.write(`${Log.pref()}${Colors.bold.green( 'success' )}: ${msg}`)
  }

}

module.exports = Log;
