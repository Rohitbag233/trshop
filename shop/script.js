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
        try {
            // Replace `YOUR_API_ENDPOINT` with your actual API endpoint
            const response = await fetch(`YOUR_API_ENDPOINT?q=${searchQuery}`);
            const data = await response.json();

            if (data && data.products) {
                displayProducts(data.products);
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
