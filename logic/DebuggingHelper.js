import {err, ifAlert, log} from "../../Constants";

export function consoleLog(message) {
    if (log) {
        console.log(message);
    }
}
export function consoleError(message) {
    if (err) {
        console.error(message);
    }
}
export function debugAlert(message) {
    if (ifAlert) {
        alert(message);
    }
}
