import {ifAlert} from "../../Constants";

export function consoleLog(message) {
    if (log) {
        console.log(message);
    }
}
export function consoleError(message) {
    if (log) {
        console.error(message);
    }
}
export function debugAlert(message) {
    if (ifAlert) {
        alert(message);
    }
}
