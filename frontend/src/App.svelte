<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
	import Game from "./routes/Game.svelte";
  
	export let url = "";
  </script>
  
  <Router {url}>
	<nav>
	  <Link to="/">Home</Link>
	  <Link to="/login">Login</Link>
	  <Link to="/register">Register</Link>
	  <Link to="/game">Play Game</Link>
	</nav>
  
	<main>
	  <Route path="/" component={Home} />
	  <Route path="/login" component={Login} />
	  <Route path="/register" component={Register} />
	  <Route path="/game" component={Game} />
	</main>
  </Router>
  
  <style>
	nav {
	  padding: 1rem;
	  background-color: #f0f0f0;
	}
	nav a {
	  padding: 0.5rem;
	  text-decoration: none;
	  color: #333;
	}
	main {
	  padding: 1rem;
	}
  </style>