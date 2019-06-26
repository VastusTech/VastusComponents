import React from "react";
import type Product from "../../types/Product";

export const ProductCardInfo = {
    fetchList: ["id"],
    ifSubscribe: false
};

type Props = {
    product: Product
};

const ProductCard = (props: Props) => {
    return (
        <div>
            ID:
            {props.product.id}
        </div>
    );
};

export default ProductCard;
