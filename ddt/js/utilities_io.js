"use strict";
function _check_filesaver() {
    /** Check if Blob is available, and alert if it is not. */
    try {
        var isFileSaverSupported = !!new Blob();
    } catch (e) {
        alert("Blob not supported");
    };
};
function load_json(f, callback, pre_fn, failure_fn) {
    /** Try to load the file as JSON.
     Arguments
     ---------
     f: The file path
     callback: A callback function that accepts arguments: error, data.
     pre_fn: (optional) A function to call before loading the data.
     failure_fn: (optional) A function to call if the load fails or is aborted.
     */
    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob))
        callback("The File APIs are not fully supported in this browser.", null);

    var reader = new window.FileReader();
    // Closure to capture the file information.
    reader.onload = function(event) {
        var result = event.target.result,
            data;
        // try JSON
        try {
            data = JSON.parse(result);
        } catch (e) {
            // if it failed, return the error
            callback(e, null);
            return;
        }
        // if successful, return the data
        callback(null, data);
    };
    if (pre_fn !== undefined && pre_fn !== null) {
        try { pre_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onabort = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onerror = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    }
    // Read in the image file as a data URL.
    reader.readAsText(f);
}

function load_json_or_csv(f, csv_converter, callback, pre_fn, failure_fn,
                          debug_event) {
    /** Try to load the file as JSON or CSV (JSON first).
     Arguments
     ---------
     f: The file path
     csv_converter: A function to convert the CSV output to equivalent JSON.
     callback: A callback function that accepts arguments: error, data.
     pre_fn: (optional) A function to call before loading the data.
     failure_fn: (optional) A function to call if the load fails or is aborted.
     debug_event: (optional) An event, with a string at
     event.target.result, to load as though it was the contents of a
     loaded file.
     */
    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob))
        callback("The File APIs are not fully supported in this browser.", null);

    var reader = new window.FileReader(),
        // Closure to capture the file information.
        onload_function = function(event) {

            var result = event.target.result,
                data, errors;
            // try JSON
            try {
                data = JSON.parse(result);
            } catch (e) {
                errors = 'JSON error: ' + e;

                // try csv
                try {
                    data = csv_converter(d3.csv.parseRows(result));
                } catch (e) {
                    // if both failed, return the errors
                    callback(errors + '\nCSV error: ' + e, null);
                    return;
                }
            }
            // if successful, return the data
            callback(null, data);
        };
    if (debug_event !== undefined && debug_event !== null) {
        console.warn('Debugging load_json_or_csv');
        return onload_function(debug_event);
    }
    if (pre_fn !== undefined && pre_fn !== null) {
        try { pre_fn(); }
        catch (e) { console.warn(e); }
    }
    reader.onabort = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    };
    reader.onerror = function(event) {
        try { failure_fn(); }
        catch (e) { console.warn(e); }
    };
    // Read in the image file as a data URL.
    reader.onload = onload_function;
    reader.readAsText(f);
};
function csv_converter(csv_rows) {
    /** Convert data from a csv file to json-style data.
     File must include a header row.
     */
    // count rows
    var c = csv_rows[0].length,
        converted = [];
    if (c < 2 || c > 3)
        throw new Error('CSV file must have 2 or 3 columns');
    // set up rows
    for (var i = 1; i < c; i++) {
        converted[i - 1] = {};
    }
    // fill
    csv_rows.slice(1).forEach(function(row) {
        for (var i = 1, l = row.length; i < l; i++) {
            converted[i - 1][row[0]] = row[i];
        }
    });
    return converted;
};
function download_json(json, name) {
    /** Download json file in a blob.
     */

    // alert if blob isn't going to work
    _check_filesaver();

    var j = JSON.stringify(json),
        blob = new Blob([j], {type: "application/json"});
    saveAs(blob, name + '.json');
};
function download_svg(name, svg_sel, do_beautify) {
    /** Download an svg file using FileSaver.js.
     *
     * Arguments
     * ---------
     *
     * name: The filename (without extension).
     *
     * svg_sel: The d3 selection for the SVG element.
     *
     * do_beautify: (Boolean) If true, then beautify the SVG output.
     *
     */

    // alert if blob isn't going to work
    _check_filesaver();

    // make the xml string
    var xml = (new XMLSerializer()).serializeToString(svg_sel.node());
    if (do_beautify) xml = vkbeautify.xml(xml);
    xml = '<?xml version="1.0" encoding="utf-8"?>\n \
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n \
    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + xml;

    // save
    var blob = new Blob([xml], {type: "image/svg+xml"});
    saveAs(blob, name + '.svg');
};