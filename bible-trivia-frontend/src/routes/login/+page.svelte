<script>
  import axios from '$lib/axios';
  // @ts-ignore
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let email = "";
  let password = "";
  let error = "";
  let loading = false;

  async function handleSubmit() {
  loading = true;
  error = "";
  try {
    const response = await axios.post('/users/login', {
      email,
      password,
    });
    
    goto('/game');
  } catch (err) {
    error = err.response?.data?.message || "An error occurred. Please try again.";
  } finally {
    loading = false;
  }
}
</script>

<svelte:head>
  <title>Login - Bible Trivia Expedition</title>
</svelte:head>

<div class="min-h-screen font-sans bg-white hero-pattern">
  <div class="trippy-gradient h-screen relative flex items-center justify-center">
    <main class="container mx-auto px-4">
      <div class="max-w-md w-full mx-auto bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl login-container" in:fade={{ duration: 800, delay: 200 }}>
        <div class="text-center mb-8">
          <h1 class="text-4xl font-extrabold mb-2 leading-tight text-gray-800">
            Welcome Back
          </h1>
          <p class="text-lg text-gray-600 mt-2">
            Continue your <span class="font-semibold text-[#5433ff]">Biblical Journey</span>
          </p>
        </div>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" bind:value={email} required
                   class="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5433ff] focus:border-transparent transition-all duration-200 ease-in-out"
            />
          </div>
          
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" bind:value={password} required
                   class="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5433ff] focus:border-transparent transition-all duration-200 ease-in-out"
            />
          </div>
          
          <div>
            <button type="submit" 
                    class="w-full bg-[#5433ff] text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-[#4a2ee0] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        {#if error}
          <div in:fly={{ y: 20, duration: 300, easing: cubicOut }} class="mt-4 text-center text-sm text-red-600">
            {error}
          </div>
        {/if}
        
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account? 
            <a href="/register" class="font-medium text-[#5433ff] hover:text-[#4a2ee0] transition-colors duration-300">
              Start your journey
            </a>
          </p>
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  .hero-pattern {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
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

  .login-container {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease-in-out;
  }

  .login-container:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
</style>