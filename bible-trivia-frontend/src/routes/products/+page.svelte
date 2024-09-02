<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    
    let products = [];
    let loading = true;
    let error = null;
    let searchTerm = '';
    let scraping = false;
    let isCustomSearch = false;  // New variable to track if we're showing custom search results

    async function fetchProducts(term = '') {
      loading = true;
      error = null;
      try {
        const response = await fetch(`http://localhost:3000/api/products?search=${encodeURIComponent(term)}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }

    async function handleSearch() {
        scraping = true;
        error = null;
        try {
            const response = await fetch(`http://localhost:3000/api/products/scrape?term=${encodeURIComponent(searchTerm)}`, {
                method: 'GET'
            });
            if (!response.ok) throw new Error('Failed to scrape products');
            await response.json(); // Wait for scraping to complete
            await fetchProducts(searchTerm); // Fetch the newly scraped products
            isCustomSearch = true;  // Set this to true after successful search
        } catch (e) {
            error = e.message;
        } finally {
            scraping = false;
        }
    }

    // New function to clear search results
    async function clearSearch() {
        searchTerm = '';
        isCustomSearch = false;
        await fetchProducts();
    }

    onMount(() => {
        fetchProducts();
    });
</script>
  
<svelte:head>
  <title>Bible Trivia Expedition - Products</title>
</svelte:head>
  
<div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold text-white text-center mb-8">Bible Products</h1>
    
    <div class="mb-8">
      <form on:submit|preventDefault={handleSearch} class="flex justify-center">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Enter search term"
          class="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          disabled={scraping}
        >
          {scraping ? 'Scraping...' : 'Search & Scrape'}
        </button>
      </form>
      
      {#if isCustomSearch}
        <div class="mt-4 flex justify-center">
          <button
            on:click={clearSearch}
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Clear Search
          </button>
        </div>
      {/if}
    </div>
    
    {#if loading || scraping}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    {:else if error}
      <div class="text-center text-white text-xl bg-red-600 bg-opacity-80 p-8 rounded-lg shadow-xl">{error}</div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each products as product, index}
          <div 
            class="group bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl flex flex-col h-full"
            in:fly={{ y: 50, delay: 50 * index, duration: 500, easing: elasticOut }}
          >
            <div class="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
              <img src={product.imageUrl} alt={product.title} class="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"/>
            </div>
            <div class="p-5 flex flex-col flex-grow">
              <h2 class="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 flex-grow">{product.title}</h2>
              <div class="flex items-center justify-between mt-auto">
                <p class="text-2xl font-bold text-indigo-600">${product.price}</p>
                <a 
                  href={product.productUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Visit Product
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
  
<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>