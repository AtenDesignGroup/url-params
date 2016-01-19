var url = require('url');
var querystring = require('querystring');
var mapValues = require('lodash/mapValues');
var union = require('lodash/union');
var difference = require('lodash/difference');
var assign = require('lodash/assign');

var urlParams = function() {
  
  /**
   * Converts the values to an array of strings.
   * @param  {any} value    The input value
   * @return {array}        An array of values as strings.
   */
  function parseValue(value) {
    switch (typeof(value)) {
      // Handle just a param and no values.
      case 'undefined':
        return true;
      case 'object':
        // Handle arrays
        if (Array.isArray(value)) {
          return value.map(parseValue); 
        } 
        // Ignore non-array objects.
        else {
          return undefined;
        }
        break;
      default:
        // Handle everything else.
        return value + '';
    }
  }

  /**
   * Format a url object as a string.
   * @param  {object} urlObj A url object from createUrlObject()
   * @return {string}        A url string
   */
  function stringify(urlObj) {
    // Make each multi-value array a '+' delemited string.
    urlObj.query = mapValues(urlObj.query, function(item) {
      return Array.isArray(item) ? item.join('+') : item;
    });
    // Update the search property to match.
    urlObj.search = unescape(querystring.stringify(urlObj.query));

    return (unescape(url.format(urlObj)));
  }
  
  // Public methods.
  var pub = {
    /**
     * Converts a url string to an object using url.parse.
     * @param  {string} oldUrl  A url string
     * @return {object}         A url object with the query property formatted as an object of parameter keyed arrays.
     */
    createUrlObject: function(oldUrl) {
      var urlObj = url.parse(oldUrl);
      var query = mapValues(
        querystring.parse(urlObj.query),
        function(value){
          return Array.isArray(value) ? value : value.split(' ');
        }
      );

      return assign({}, urlObj, {query: query});
    },

    /**
     * Adds query string values to a url
     * @param   {string} oldUrl                   A url string
     * @param   {string} param                    A property key
     * @param   {string, number, array} value     Values to add.
     * @return  {string}                          A url string.
     */
    add: function(oldUrl, param, value) {
      var urlObj = this.createUrlObject(oldUrl); 
      var parsedValue = [].concat(parseValue(value));

      if (typeof(parsedValue) === 'undefined') {
        return oldUrl;
      }

      if (parsedValue[0] === true && urlObj.query.hasOwnProperty(param)) {
        return oldUrl;
      }

      urlObj.query[param] = urlObj.query.hasOwnProperty(param) 
        ? union(urlObj.query[param], parsedValue)
        : parsedValue;
            
      return stringify(urlObj);
    },

    /**
     * Removes query string values from a url
     * @param   {string} oldUrl                   A url string
     * @param   {string} param                    A property key
     * @param   {string, number, array} value     Values to remove.
     * @return  {string}                          A url string.
     */
    remove: function(oldUrl, param, value) {
      var urlObj = this.createUrlObject(oldUrl);
      var parsedValue = parseValue(value);
      var newValue = [];

      // Don't do anything if this param doesn't exist.
      if (!urlObj.query.hasOwnProperty(param)) {
        return oldUrl;
      }

      newValue = difference(urlObj.query[param], [].concat(parsedValue));

      if (typeof(value) === 'undefined' || newValue.length === 0) {
        delete urlObj.query[param];
      } else {
        urlObj.query[param] = newValue;
      }

      return stringify(urlObj);     
    },

    /**
     * Sets query string values on a url
     * @param   {string} oldUrl                   A url string
     * @param   {string} param                    A property key
     * @param   {string, number, array} value     Values to set.
     * @return  {string}                          A url string.
     */
    set: function(oldUrl, param, value) {
      var urlObj = this.createUrlObject(oldUrl); 
      var parsedValue = parseValue(value);
      
      urlObj.query[param] = parsedValue;
      
      return stringify(urlObj);
    }
  };
  
  return pub;
};

module.exports = urlParams();
