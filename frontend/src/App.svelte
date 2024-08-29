<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
	import Game from "./routes/Game.svelte";
	
	export let url = "";
</script>

<Router {url}>
	<div class="flex flex-col min-h-screen bg-white">
	  <header class="fixed w-full z-10">
		<div class="container mx-auto px-4 py-6 flex justify-between items-center">
		  <h1 class="text-3xl font-bold text-white font-serif">
			<Link to="/" class="text-white transition duration-300">Bible Trivia Expedition</Link>
		  </h1>
		  <nav class="space-x-8">
			<Link class="nav-link" to="/">Home</Link>
			<Link class="nav-link" to="/login">Login</Link>
			<Link class="nav-link" to="/register">Register</Link>
			<Link class="btn btn-transparent play-game-btn" to="/game">Play Game</Link>
		  </nav>
			<style>
				.btn.btn-transparent:hover {
					transition: all 0.3s ease-in-out;
					transform: scale(1.05);
				}
			</style>
		</div>
	  </header>

	  <main class="flex-grow">
		<Route path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/game" component={Game} />
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
						<a href="#" class="footer-icon" aria-label="Facebook">
							<i class="fab fa-facebook-f"></i>
						</a>
						<a href="#" class="footer-icon" aria-label="Twitter">
							<i class="fab fa-twitter"></i>
						</a>
						<a href="#" class="footer-icon" aria-label="Instagram">
							<i class="fab fa-instagram"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	  </footer>
	</div>
</Router>