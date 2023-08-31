document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const productList = document.getElementById("productList");

    // Search when clicking the "Search" button
    searchButton.addEventListener("click", () => {
        const searchQuery = searchInput.value;
        showLoadingIndicator();
        fetchProducts(searchQuery);
    });

    // Search when pressing the Enter key
    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            const searchQuery = searchInput.value;
            showLoadingIndicator();
            fetchProducts(searchQuery);
        }
    });

    // Focus on search bar when pressing the "/" key
    document.addEventListener("keydown", event => {
        if (event.key === "/" && event.target !== searchInput) {
            event.preventDefault(); // Prevent "/" from appearing in the search bar
            searchInput.focus();
        }
    });

    async function fetchProducts(searchQuery) {
        const endpoint = 'YOUR_AMAZON_API_ENDPOINT'; // Replace with your actual Amazon API endpoint
        const accessKey = 'YOUR_ACCESS_KEY'; // Replace with your actual Access Key
        const secretKey = 'YOUR_SECRET_KEY'; // Replace with your actual Secret Key
        const associateTag = 'YOUR_ASSOCIATE_TAG'; // Replace with your actual Associate Tag
    
        // Construct the URL for the API request
        const url = `${endpoint}?Service=AWSECommerceService&Operation=ItemSearch&Keywords=${encodeURIComponent(searchQuery)}&AssociateTag=${associateTag}`;
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authorization headers here
                },
            });
    
            const data = await response.json();
    
            if (data && data.Items && data.Items.Item) {
                displayProducts(data.Items.Item);
            } else {
                // Handle error or no results
            }
        } catch (error) {
            // Handle fetch error
        }
    }
    
    function displayProducts(products) {
        productList.innerHTML = products.map(product => `
            <div class="product">
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <a href="${product.link}" target="_blank">Buy Now on Amazon</a>
            </div>
        `).join("");
    }

    function showLoadingIndicator() {
        productList.innerHTML = `<div class="loading"></div>`;
        setTimeout(() => {
            hideLoadingIndicator();
        }, 1000); // Display loading for 1 second
    }

    function hideLoadingIndicator() {
        productList.innerHTML = ''; // Clear loading indicator
    }
});
