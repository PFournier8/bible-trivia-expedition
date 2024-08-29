<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  let scrollY;
  let isLoggedIn = false;

  onMount(() => {
    checkLoginStatus();
  });

  function checkLoginStatus() {
    if (browser) {
      isLoggedIn = !!localStorage.getItem('token');
    }
  }

  function logout() {
    if (browser) {
      localStorage.removeItem('token');
      isLoggedIn = false;
      window.location.href = '/';
    }
  }

  $: if (browser && $page) {
    checkLoginStatus();
  }
</script>

<svelte:window bind:scrollY />

<div class="flex flex-col min-h-screen bg-white">
  <header 
    class="fixed w-full z-10 transition-all duration-300 trippy-gradient"
    style="background-color: {scrollY > 50 ? 'rgba(75, 85, 99, 0.8)' : 'transparent'}"
  >
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-white font-serif">
        <a href="/" class="text-white transition duration-300">Bible Trivia Expedition</a>
      </h1>
      <nav class="space-x-4 md:space-x-8">
        {#if isLoggedIn}
          <a class="nav-link" href="/game">Home</a>
          <a class="nav-link" href="/create">Create</a>
          <a class="nav-link" href="/friends">Friends</a>
          <a class="nav-link" href="/multiplayer">Multiplayer</a>
          <a class="nav-link" href="/settings">Settings</a>
          <button class="btn btn-transparent play-game-btn" on:click={logout}>Logout</button>
        {:else}
          <a class="nav-link" href="/">Home</a>
          <a class="nav-link" href="/login">Login</a>
          <a class="nav-link" href="/register">Register</a>
          <a class="btn btn-transparent play-game-btn" href="/game">Play Game</a>
        {/if}
      </nav>
    </div>
  </header>

  <main class="flex-grow">
    <slot />
  </main>

  <footer class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h2 class="text-2xl font-serif font-bold">Bible Trivia Expedition</h2>
        </div>
        <div class="text-center md:text-right">
          <p class="text-sm opacity-80">Made by Preston Fournier</p>
          <div class="mt-2 flex justify-center md:justify-end space-x-4">
            <button class="footer-icon" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </button>
            <button class="footer-icon" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </button>
            <button class="footer-icon" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .trippy-gradient {
    background: linear-gradient(45deg, #ff6ec4, #7873f5, #4f46e5, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a18cd1, #fbc2eb, #fad0c4, #ff9a9e);
    background-size: 300% 300%;
    animation: gradient-animation 15s ease infinite;
  }

  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  header {
    transition: background-color 0.3s ease;
  }

  header:hover {
    background-color: rgba(75, 85, 99, 0.2);
  }

  .btn-transparent:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.05);
  }

  .nav-link {
    @apply text-white font-semibold text-lg transition-all duration-300 inline-block;
  }

  .nav-link:hover {
    @apply transform scale-110;
  }

  .play-game-btn {
    @apply transition-all duration-300 ease-in-out;
  }

  .play-game-btn:hover {
    @apply transform scale-105 -translate-y-0.5 shadow-lg;
  }
</style>