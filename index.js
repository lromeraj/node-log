const util = require('util');
const moment = require('moment');
const Colors = require('colors/safe');

// simple log functions
class Log {

  constructor( src ) {

    this.name = '';
    this.log_time = false;
    this.parent = null;
    this._suffix = ''; 
    
    this.middleware = function( stream, str ) {
      stream.write( str );
    };

    this.getPrefix = function() { return ""; };

    Object.assign( this, src );
    
  }

  now() {
    let mom = moment();
    return `${mom.format('DD/MM/YYYY HH:mm:ss')}`;
  }

  subLog() {
    return new Log({
      name: this.name
    })
  }

  addSuffixer( name, suffixer ) {
    this[ '_'+name ] = suffixer.bind( this );
  }

  prefix() {

    let pref = '';

		if ( this.name.length ) {
			pref = `[${Colors.yellow( this.name )}]`;
    }

    if ( this.log_time ) {
      pref += `[${Colors.cyan(this.now())}]` + '.';
    } else {
      pref = pref.length ? pref+'.' : '';
    }

    return pref;
  }

  suffix() {
    let suff = this._suffix;
    this._suffix = '';
    return suff;
  }

  attachMiddleware( middleware ) {
    this.middleware = middleware;
  }

  msg( msg ) {
    return this.getPrefix() + msg;  
  }

  json( obj ) {
    return util.inspect( obj, {colors: true, compact: false} ) ;
  }

  error( msg ) {
    this.middleware( process.stderr, 
        `${this.prefix() + Colors.bold.red( 'error' )}: ${this.suffix()}${this.msg( msg )}` );
  }

  param( attr, val ) {
    Log.info( Colors.magenta( attr ) + ': ' + val );
  }

  raw( str ) {
    this.middleware( process.stdout,
      str      
    );
  }

  info( msg ) {
    this.middleware( process.stdout, 
      `${this.prefix()}${Colors.bold.cyan( 'info' )}: ${this.suffix()}${this.msg( msg )}` );
  }

  warn( msg ) {
    this.middleware( process.stdout, 
      `${this.prefix()}${Colors.bold.yellow( 'warn' )}: ${this.suffix()}${this.msg( msg )}` );
  }

  success( msg ) {
    this.middleware( process.stdout,
      `${this.prefix()}${Colors.bold.green( 'success' )}: ${this.suffix()}${this.msg( msg )}` )
  }

}

module.exports = Log;
