<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<div class="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen font-sans">
  <main class="container mx-auto px-4 py-16">
    {#if visible}
      <section class="text-center mb-16" in:fade={{ duration: 1000, delay: 300 }}>
        <h1 class="text-6xl font-extrabold mb-6 text-indigo-600 leading-tight">
          Bible Trivia <span class="text-purple-500">Expedition</span>
        </h1>
        <p class="text-xl mb-10 max-w-2xl mx-auto text-gray-700">
          Embark on a journey through scripture, test your knowledge, and challenge your friends in this exciting biblical adventure.
        </p>
        <a href="/game" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Start Your Journey
        </a>
      </section>

      <div class="grid md:grid-cols-3 gap-10 mb-16">
        {#each [
          { title: 'Diverse Question Packs', description: 'Explore various themes and difficulty levels to suit your knowledge and interests.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
          { title: 'Multiplayer Challenges', description: 'Compete with friends or join global leaderboards to showcase your biblical expertise.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
          { title: 'Learn as You Play', description: 'Gain deeper insights into scripture with every question, expanding your biblical knowledge.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
        ] as feature, index}
          <div 
            class="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            in:fly={{ y: 50, duration: 800, delay: 500 + index * 200, easing: cubicOut }}
          >
            <svg class="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon}></path>
            </svg>
            <h2 class="text-2xl font-bold mb-4 text-indigo-800">{feature.title}</h2>
            <p class="text-gray-700">{feature.description}</p>
          </div>
        {/each}
      </div>

      <section 
        class="text-center bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-12 px-4 rounded-2xl shadow-lg"
        in:fly={{ y: 50, duration: 800, delay: 1400, easing: cubicOut }}
      >
        <h2 class="text-3xl font-bold mb-6 text-indigo-600">Ready to Test Your Knowledge?</h2>
        <div class="space-x-4">
          <a href="/register" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign Up Now
          </a>
          <a href="/login" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Login
          </a>
        </div>
      </section>
    {/if}
  </main>
</div>