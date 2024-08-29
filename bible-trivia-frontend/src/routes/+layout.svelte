<script>
   import '../app.css';
</script>

<div class="flex flex-col min-h-screen bg-white">
  <header class="fixed w-full z-10">
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-white font-serif">
        <a href="/" class="text-white transition duration-300">Bible Trivia Expedition</a>
      </h1>
      <nav class="space-x-8">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/login">Login</a>
        <a class="nav-link" href="/register">Register</a>
        <a class="btn btn-transparent play-game-btn" href="/game">Play Game</a>
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
  .btn-transparent:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.05);
  }
</style>