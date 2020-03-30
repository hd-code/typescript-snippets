/*! hd-snippets-js v0.1.3 | MIT | Hannes Dröse git+https://github.com/hd-code/hd-snippets-js.git */
/**
 * Performs an ajax request.
 * @param {string} url the target url
 * @param {function} [callback] callback(httpStatus: number, response: string) => void – Function that handles the http response. It gets two parameters passed. The http status code and the http response body. Default: status and response message get logged to the console.
 * @param {string} [method='GET'] the http method (GET|POST|UPDATE|DELETE) – default: GET
 * @param {object} [data] data to be sent in request body – normal js-object with custom key-value pairs
 * @returns {XMLHttpRequest} the request object for further configuration, if needed
 */
declare function ajax(url: string, callback?: Function | undefined, method?: string | undefined, data?: object | undefined): XMLHttpRequest;
