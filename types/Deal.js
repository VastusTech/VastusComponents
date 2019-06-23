import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Deal = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    sponsor: string,
    productName: string,
    productImagePath: string,
    productImagePaths: [string],
    productCreditPrice: string,
    validTime: string,
    quantity: number,
}
export default Deal;
