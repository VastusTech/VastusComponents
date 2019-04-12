import {ifAlert} from "../../Constants";

export function debugAlert(message) {
    if (ifAlert) {
        alert(message);
    }
}
// TODO I forget what this was supposed to be doing?
// export function getMethods(obj) {
//     const result = [];
//     for (let id in obj) {
//         try {
//             if (typeof(obj[id]) === "function") {
//                 result.push(id + ": " + obj[id].toString());
//             }
//         } catch (err) {
//             result.push(id + ": inaccessible");
//         }
//     }
//     return result;
// }
