<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
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

  onMount(async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      goto('/login'); // Redirect to login if not logged in
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/expedition-packs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      expeditionPacks = response.data;
    } catch (err) {
      // @ts-ignore
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

  /**
	 * @param {any} packId
	 */
  function startExpedition(packId) {
    // Navigate to the trivia game for the selected pack
    goto(`/game/${packId}`);
  }
</script>

<svelte:head>
  <title>Home - Bible Trivia Expedition</title>
</svelte:head>

<div class="min-h-screen pt-24">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-white">Choose Your Expedition</h1>

    {#if loading}
      <div class="text-center text-white">Loading expedition packs...</div>
    {:else if error}
      <div class="text-center text-red-300">{error}</div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each expeditionPacks as pack (pack.id)}
          <div 
            class="bg-white bg-opacity-20 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-filter backdrop-blur-lg"
            in:fly={{ y: 50, duration: 300, delay: 300, easing: cubicOut }}
          >
            <div class="p-6">
              <h2 class="text-2xl font-bold mb-2 text-white">{pack.name}</h2>
              <p class="text-gray-200 mb-4">{pack.description}</p>
              <button 
                on:click={() => startExpedition(pack.id)}
                class="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Expedition
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>
</div>

<style>
  /* Additional styles can be added here if needed */
</style>