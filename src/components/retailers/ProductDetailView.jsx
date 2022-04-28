import React from "react";

function ProductDetailView(){
    return(
        <div>
            <div className="flex sm:container mx-auto px-4 mt-6">
            <div className="w-1/12"></div>
                <div className="w-4/12">
                <img src="https://picsum.photos/id/1005/600/400" />
                <button class="btn btn-success btn-block mt-4">Add to cart</button>
                </div>
                <div className="w-1/12"></div>
                <div className="w-4/12">
                    <h1 className="text-center text-4xl">Product Name</h1>
                    <p className="mt-6">The quick brown fox jumps over the lazy dog. Whatever Description</p>
                    <p className="mt-2">Price:<div class="badge badge-info badge-lg">Rs. 5000</div>
                    <div class="badge badge-error badge-sm"><strike>Rs. 6000</strike></div> </p>
                    <p className="mt-2">Available Stock:<div class="badge badge-warning badge-md">500</div></p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailView;