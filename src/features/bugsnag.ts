var Bugsnag = require('@bugsnag/js')
Bugsnag.start({ apiKey: '736707be646354dbedd48d023efb987e' })
export function notify(error: Error) {
    Bugsnag.notify(error);
}