/**
 * Saves a string of data to a file.
 * @param {string} data string of data to be saved to a file
 * @param {string} [fileName] optional. Specifies the filename
 */
function downloadFile(data, fileName) {
    if (!data || typeof data !== 'string') {
        console.log('Data to save was either empty or not a string')
        return
    }
    
    fileName = fileName || 'data.txt'

    var link = document.createElement('a')
    link.href = 'data:text/plain;charset=utf-8,' + encodeURI(data)
    link.setAttribute('download', fileName)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * Opens the file browser to choose a file.
 * @param {function} callback callback(fileContent: string|ArrayBuffer) – this function gets executed, when a file was chosen by the user
 */
function openFile(callback) {
    if (!window.FileReader) {
        alert('Please use a different Browser for uploading files!')
        return
    }
    
    if (!callback || typeof callback !== 'function') {
        console.log('You have to provide a callback function to handle file uploads')
        return
    }

    var fileReader = new FileReader
    fileReader.onload = function() {
        callback(fileReader.result)
    }
   
    var input = document.createElement('input')
    input.setAttribute('type','file')
    input.addEventListener('change', function() {
        fileReader.readAsText(this.files[0])
    })
    input.click()
}