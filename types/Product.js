import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Product = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    owner: string,
    deal: string,
    expirationDate: string,
    codes: [string],
    links: [string],
}
export default Product;
