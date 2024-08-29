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
			<Link to="/" class="text-white hover:text-yellow-300 transition duration-300">Bible Trivia Expedition</Link>
		  </h1>
		  <nav class="space-x-8">
			<Link class="nav-link" to="/">Home</Link>
			<Link class="nav-link" to="/login">Login</Link>
			<Link class="nav-link" to="/register">Register</Link>
			<Link class="btn btn-transparent" to="/game">Play Game</Link>
		  </nav>
		</div>
	  </header>

	  <main class="flex-grow">
		<Route path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/game" component={Game} />
	  </main>

	  <footer class="bg-black text-white py-8">
		<div class="container mx-auto px-4 text-center">
		  <p>&copy; 2024 Bible Trivia Expedition. All rights reserved.</p>
		</div>
	  </footer>
	</div>
</Router>