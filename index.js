//selectors
const toggler = document.querySelector(".nav__toggler");
const navbar = document.querySelector(".nav");
const loginBox = document.querySelector(".login-box");
const showLoginBox = document.querySelector(".user");
const closeLoginBox = document.querySelector(".submit");
const backDrop = document.querySelector(".backdrop");
const cartCenter = document.querySelector(".cart-center");
const showCartModal = document.querySelector(".cart");
const closeCartModal = document.querySelector(".submit");
const overLay = document.querySelector(".overlay");

//event listener
toggler.addEventListener("click", hamburgerMenu);
showLoginBox.addEventListener("click", showModal);
closeLoginBox.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);
showCartModal.addEventListener("click", showCart);
closeCartModal.addEventListener("click", closeCart);
overLay.addEventListener("click", closeCart);


//Functions
function hamburgerMenu(){
    navbar.classList.toggle("nav__expanded")
}
function showModal () {
    loginBox.style.opacity = "1";
    backDrop.style.display = "block";
}

function closeModal (){
    loginBox.style.opacity = "0";
    backDrop.style.display = "none";
}
function showCart () {
    cartCenter.style.opacity = "1";
    overLay.style.display = "block";
}
function closeCart (){
    cartCenter.style.opacity = "0";
    overLay.style.display = "none";
}

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products");
const btns = document.querySelectorAll(".btn-primary");
const storeProducts = document.querySelectorAll(".product-container");

let allProductsdata = [];
const filters = {
    searchItems: "",
};

// http://localhost:3000/items
document.addEventListener("DOMContentLoaded", () =>{
    // console.log("loaded...");
    // axios
    // .get("http://localhost:3000/items")
    // .then((res)=>console.log(res.data))
    // .catch((err)=>console.log(err));
    axios
    .get("http://localhost:3000/items")
    .then((res)=>{
        allProductsdata = res.data;
        //render products on DOM
        renderProducts(res.data, filters);
    })
    .catch((err)=>console.log(err));
});

function renderProducts (_products, _filters) {
    const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = "";
    // console.log(filteredProducts);
    // render to DOM
    filteredProducts.forEach( (item) => {
        //create
        //content
        //append to products
    const productDiv = document.createElement("div");
    productDiv.classList.add("single-product");
    productDiv.innerHTML =`
    <div class="product">
        <div class="image-container">
            <div class="image">
                <img src=${item.image} alt="" class="product-img">
            </div>
        </div>
        <div class="product-desc">
            <h5 class="product-title">${item.title}</h5>
            <span class="product-price">${item.price}</span>                    
        </div>
    </div>`;
    // append
    productsDOM.appendChild(productDiv);
    });
}

searchInput.addEventListener("input", (e)=> {
    // console.log(e.target.value);
    filters.searchItems = e.target.value;
    renderProducts(allProductsdata, filters);
});

//filter based on groups
function renderBasedOnClass (_products, _filters) {
    const filteredProducts = _products.filter((p) => {
    return p.class.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = "";
    filteredProducts.forEach( (item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("single-product");
    productDiv.innerHTML =`
    <div class="product">
        <div class="image-container">
            <div class="image">
                <img src=${item.image} alt="" class="product-img">
            </div>
        </div>
        <div class="product-desc">
            <h5 class="product-title">${item.title}</h5>
            <span class="product-price">${item.price}</span>                    
        </div>
    </div>`;

    productsDOM.appendChild(productDiv);
    });
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.target.dataset.filter;
    //   e.target.classList.add("active");
    //   console.log(e.target.innerText);
      filters.searchItems = filter;
      renderBasedOnClass(allProductsdata, filters);
    });
});
//JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
const server = create();
const router = _router("db/db.json");

// Make sure to use the default middleware
const middlewares = defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
 // Add custom route here if needed
 rewriter({
  "/api/*": "/$1",
 })
);
server.use(router);
// Listen to port
server.listen(3000, () => {
 console.log("JSON Server is running");
});

// Export the Server API
export default server;