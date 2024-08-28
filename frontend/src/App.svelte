<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
	import Game from "./routes/Game.svelte";
  
	export let url = "";
  </script>
  
  <Router {url}>
	<div class="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
	  <header class="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg fixed w-full z-10">
		<div class="container mx-auto px-4 py-3 flex justify-between items-center">
		  <h1 class="text-2xl font-bold text-indigo-600 font-serif">
			<Link to="/" class="hover:text-indigo-800 transition duration-300">Bible Trivia Expedition</Link>
		  </h1>
		  <nav class="space-x-6">
			<Link class="text-gray-700 hover:text-indigo-600 transition duration-300" to="/">Home</Link>
			<Link class="text-gray-700 hover:text-indigo-600 transition duration-300" to="/login">Login</Link>
			<Link class="text-gray-700 hover:text-indigo-600 transition duration-300" to="/register">Register</Link>
			<Link class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" to="/game">Play Game</Link>
		  </nav>
		</div>
	  </header>
  
	  <main class="flex-grow pt-16">
		<Route path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
			<Route path="/game" component={Game} />
	  </main>
  
	  <footer class="bg-indigo-900 text-white py-8">
		<div class="container mx-auto px-4 text-center">
		  <p>&copy; 2024 Bible Trivia Expedition. All rights reserved.</p>
		</div>
	  </footer>
	</div>
  </Router>