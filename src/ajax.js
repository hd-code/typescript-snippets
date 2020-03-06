/**
 * Performs an ajax request.
 * @param {string} url the target url
 * @param {function} [callback] callback(httpStatus: number, response: string) => void – Function that handles the http response. It gets two parameters passed. The http status code and the http response body. Default: status and response message get logged to the console.
 * @param {string} [method='GET'] the http method (GET|POST|UPDATE|DELETE) – default: GET
 * @param {object} [data] data to be sent in request body – normal js-object with custom key-value pairs
 * @returns {XMLHttpRequest} the request object for further configuration, if needed
 */
function ajax(url, callback, method, data) {
    url = typeof url === 'string' ? url : ''
    callback = typeof callback === 'function' ? callback : function(st, msg) { console.log(st, '–', msg) }
    method = /^GET|POST|UPDATE|DELETE$/.test(method) ? method : 'GET'

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open(method, url)
    xhr.onreadystatechange = function() {
        if (callback && xhr.readyState > 3)
            callback(xhr.status, xhr.responseText)
    }

    var requestData
    if (data && typeof data === 'object') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        requestData = ''
        for (var key in data) {
            requestData += key + '=' + data[key] + '\n'
        }
    }
    
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.send(requestData)
    
    return xhr
}