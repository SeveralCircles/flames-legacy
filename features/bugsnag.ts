var Bugsnag = require('@bugsnag/js')
Bugsnag.start({ apiKey: '736707be646354dbedd48d023efb987e' })
module.exports = {
    notify: function(error: Error) {
        Bugsnag.notify(error);
    }
}