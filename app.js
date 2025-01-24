let allProducts = [];

const loadAllproduct = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a")
        .then((res) => res.json())
        .then((data) => {
            allProducts = data.drinks.map(product => ({
                ...product,
                price: Math.floor(Math.random() * 100) + 1 
            })); 
            displayProduct(allProducts);
            console.log(allProducts);
        });
};



const displayProduct = (products) => {
    const productsContainer = document.getElementById("product_container");
    productsContainer.innerHTML = "";

    if (!products || products.length === 0) {
        productsContainer.innerHTML = "<h5>No Products Found</h5>";
        return;
    }

    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("card");
 
        div.innerHTML = `
            <img class="card-img" src="${product.strDrinkThumb}" alt="Product Image">
            <div class="card-ditels">
            <h5>Name: ${product.strDrink}</h5>
            <h4>Price: <b>${product.price}</b></h4> 
            <p>Title: ${product.strInstructions?.slice(0, 40) || "No description available"}...</p>
            <div class="card-buttons">
            <button class="card-button" onclick="silgleProduct('${product.idDrink}')">Details</button>
            <button class="card-button-2" onclick="handleAddToCart('${product.strDrink}',${product.idDrink},${product.price})">Add to Cart</button>
            </div>
            </div>
            
        `;
        productsContainer.appendChild(div);
    });
};

let update_imgLink ;
const findImage = (allProducts,idDrink) => {

// console.log(idDrink);

allProducts.forEach((allProducts) => {
        // console.log(allProducts.idDrink);
 if(allProducts.idDrink == idDrink){
 let imgLink = allProducts.strDrinkThumb;
//  console.log(imgLink);
update_imgLink = imgLink;
 }

    });
};



const handleAddToCart = (name,idDrink, price) => {
    const cartCount = document.getElementById("count");
    const convert = parseInt(cartCount.innerText);
    
    if (convert >= 7) {
        const limitAlert = document.getElementById("limit-alert-box");
        limitAlert.style.display = 'flex';
        // alert("You cannot add more than 7 products to the cart!!");
        const limitAlertButton = document.getElementById("alert-button");
        limitAlertButton.addEventListener('click',function(){
            limitAlert.style.display = 'none';
        });
        return;
    }

    cartCount.innerText = convert + 1;

    const container = document.getElementById("card_main_cintainer");
    const div = document.createElement("div");
 
    
    div.classList.add("cart_info");

    

    
    findImage(allProducts,idDrink);

    div.innerHTML = `
        <h5>${convert +1}.</h5>
        <p>${name}</p>
        <img class="cart-img" src="${update_imgLink}" alt="Product Image">
        <h3 class="price">${price}</h3>
        <section></section>
        `;
        
    container.appendChild(div);
    
    updatePrice();
};

const updatePrice = () => {
    const allPrice = document.getElementsByClassName("price");
    
    let total = 0;
    for (const element of allPrice) {
        total = total + parseFloat(element.innerText);
    }
    document.getElementById("add_total").innerText = total.toFixed(2);
};

const silgleProduct = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            const product = data.drinks[0];
            const ditelsAlert = document.getElementById("ditels-alert-box");
            
            const div = document.createElement("div");
 
    
            div.classList.add("ditels-alert-content");

            div.innerHTML = `
            <img class="ditels-card-img" src="${product.strDrinkThumb}" alt="Product Image">
            
            <div class="ditels-alert-info">
            <b>Title: </b> ${product.strDrink} <br>
            <b>Category: </b> ${product.strCategory}<br>
            <b>Alcoholic: </b> ${product.strAlcoholic}<br>
            <b>Instructions: </b><p>${product.strInstructions}</br>
            <button id="ditels-alert-button">Close</button>
            
            `;
        ditelsAlert.appendChild(div);
        
        ditelsAlert.style.display = "flex";
        
        const ditelsAlertButton = document.getElementById("ditels-alert-button");
        ditelsAlertButton.addEventListener('click',function(){
            ditelsAlert.style.display = 'none';
            
            ditelsAlert.removeChild(div);
        });
        
    });
};

const handleSearch = () => {
    const searchValue = document.getElementById("search_field").value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
        product.strDrink.toLowerCase().includes(searchValue)
    );
    displayProduct(filteredProducts);
};

document.getElementById("search_field").addEventListener("focus", () => {
    const productsContainer = document.getElementById("product_container");
    productsContainer.innerHTML = ""; 
});

document.getElementById("search_field").addEventListener("blur", () => {
    displayProduct(allProducts); 
});

loadAllproduct();
