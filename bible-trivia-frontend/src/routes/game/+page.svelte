<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import axios from 'axios';
  // @ts-ignore
  import { goto } from '$app/navigation';

  /**
	 * @type {any[]}
	 */
  let expeditionPacks = [];
  let loading = true;
  /**
	 * @type {string | null}
	 */
  let error = null;
  /**
	 * @type {null}
	 */
  let hoveredPack = null;

  onMount(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/expedition-packs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      expeditionPacks = response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        goto('/login');
      } else {
        error = "Failed to load expedition packs. Please try again later.";
      }
    } finally {
      loading = false;
    }
  });

  function startExpedition(packId) {
    goto(`/game/${packId}`);
  }
</script>

<svelte:head>
  <title>Bible Trivia Expedition - Choose Your Journey</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen text-gray-800 pt-40 pb-20 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-24">
      <h1 class="text-5xl sm:text-6xl font-bold mb-4 font-serif text-indigo-800">
        Embark on Your Biblical Journey
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">Explore fascinating trivia packs and test your knowledge of the scriptures</p>
    </div>

    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    {:else if error}
      <div class="text-center text-red-600 text-xl">{error}</div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {#each expeditionPacks as pack, index (pack.id)}
          <div 
            class="relative group h-full"
            on:mouseenter={() => hoveredPack = pack.id}
            on:mouseleave={() => hoveredPack = null}
            in:fly={{ y: 50, duration: 500, delay: 100 * index, easing: elasticOut }}
            role="button"
            tabindex="0"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-lg transform rotate-1 group-hover:rotate-3 transition-all duration-300"></div>
            <div class="relative bg-white rounded-lg p-8 transform group-hover:-translate-y-2 transition-all duration-300 shadow-xl border border-gray-200 h-full flex flex-col justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-4 text-indigo-800 font-sans">{pack.name}</h3>
                <p class="text-gray-600 mb-6">{pack.description}</p>
              </div>
              <button 
                on:click={() => startExpedition(pack.id)}
                class="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg mt-auto"
              >
                Start Expedition
              </button>
            </div>
            {#if hoveredPack === pack.id}
              <div 
                class="absolute top-0 left-0 w-full h-full pointer-events-none"
                in:scale={{ duration: 300, easing: elasticOut }}
              >
                <div class="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"></div>
                <div class="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-pink-500 rounded-tr-lg"></div>
                <div class="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-purple-600 rounded-bl-lg"></div>
                <div class="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"></div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Poppins', sans-serif;
    background-color: #ffffff; 
  }
  
  h1 {
    font-family: 'Playfair Display', serif;
  }

  .font-sans {
    font-family: 'Poppins', sans-serif;
  }
</style>