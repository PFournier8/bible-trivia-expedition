<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    
    let products = [];
    let loading = true;
    let error = null;
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
        loading = false;
      } catch (e) {
        error = e.message;
        loading = false;
      }
    });
  </script>
  
  <svelte:head>
    <title>Bible Trivia Expedition - Products</title>
  </svelte:head>
  
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-white text-center mb-8">Bible Products</h1>
      
      {#if loading}
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      {:else if error}
        <div class="text-center text-white text-xl bg-red-600 bg-opacity-80 p-8 rounded-lg shadow-xl">{error}</div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {#each products as product, index}
            <div 
              class="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105"
              in:fly={{ y: 50, delay: 50 * index, duration: 500, easing: elasticOut }}
            >
              <img src={product.imageUrl} alt={product.title} class="w-full h-48 object-cover"/>
              <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h2>
                <p class="text-2xl font-bold text-indigo-600">${product.price}</p>
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