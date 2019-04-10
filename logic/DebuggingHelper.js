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
export function getMethods(obj) {
    const result = [];
    for (let id in obj) {
        try {
            if (typeof(obj[id]) === "function") {
                result.push(id + ": " + obj[id].toString());
            }
        } catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}
