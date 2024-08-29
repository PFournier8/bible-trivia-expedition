<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
  
    const features = [
      { title: 'Diverse Question Packs', description: 'Explore various themes and difficulty levels to suit your knowledge and interests.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { title: 'Multiplayer Challenges', description: 'Compete with friends or join global leaderboards to showcase your biblical expertise.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { title: 'Learn as You Play', description: 'Gain deeper insights into scripture with every question, expanding your biblical knowledge.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
    ];
  </script>
  
  <svelte:head>
    <style>
      @keyframes subtle-wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      .subtle-animation > * {
        animation: subtle-wave 4s ease-in-out infinite;
      }
      .subtle-animation > *:nth-child(2) {
        animation-delay: -0.5s;
      }
      .btn-shine {
        position: relative;
        overflow: hidden;
      }
      .btn-shine::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
        transform: rotate(45deg);
        transition: all 0.3s;
      }
      .btn-shine:hover::after {
        left: 100%;
        top: 100%;
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
      .hero-pattern {
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      .learn-more-link {
        color: white !important;
      }
      .learn-more-link:hover {
        color: #fde68a !important; /* Light yellow color */
      }
    </style>
  </svelte:head>
  
  <div class="min-h-screen font-sans bg-white hero-pattern">
    <div class="trippy-gradient h-[50vh] relative">
      <main class="container mx-auto px-4 pt-24">
        {#if visible}
          <section class="text-center mb-16 relative text-white" in:fade={{ duration: 1000, delay: 300 }}>
            <div class="subtle-animation">
              <h1 class="text-6xl font-extrabold mb-2 leading-tight">
                Bible Trivia <span class="text-[#5433ff]">Expedition</span>
              </h1>
              <p class="text-xl mb-10 max-w-2xl mx-auto">
                Embark on a journey through scripture, test your knowledge, and challenge your friends in this exciting biblical adventure.
              </p>
            </div>
            <a href="/game" class="btn-shine bg-[#5433ff] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
              Start Your Journey
            </a>
          </section>
        {/if}
      </main>
    </div>
  
    <div class="container mx-auto px-4 py-24">
      <div class="grid md:grid-cols-3 gap-10">
        {#each features as feature, index}
          <div 
            class="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-gray-200"
            in:fly={{ y: 50, duration: 800, delay: 500 + index * 200, easing: cubicOut }}
          >
            <div class="p-8">
              <div class="w-16 h-16 bg-gradient-to-br from-[#5433ff] to-[#20bdff] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon}></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h2>
              <p class="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
            <div class="bg-gradient-to-r from-[#5433ff] to-[#20bdff] px-8 py-4">
              <a 
                href="/learn-more" 
                class="learn-more-link text-white font-semibold transition-colors duration-300"
                style="color: white !important;"
              >
                Learn More →
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  
    <section 
    class="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-gray-200 mx-auto max-w-4xl my-24"
    in:fly={{ y: 50, duration: 800, delay: 1400, easing: cubicOut }}
  >
    <div class="p-8 text-center">
      <h2 class="text-3xl font-bold mb-6 text-gray-800">Ready to Test Your Knowledge?</h2>
      <div class="space-x-4">
        <a href="/register" class="btn-shine bg-[#5433ff] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105" style="color: white !important;">
          Sign Up Now
        </a>
        <a href="/login" class="btn-shine bg-[#5433ff] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105" style="color: white !important;">
          Login
        </a>
      </div>
    </div>
    <div class="bg-gradient-to-r from-[#5433ff] to-[#20bdff] h-16"></div>
  </section>
  </div>