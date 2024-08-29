<script>
    // @ts-ignore
    import { goto } from '$app/navigation';
    import axios from "axios";
  
    let email = "";
    let password = "";
    let error = "";
  
    async function handleSubmit() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        goto('/game');
      } catch (err) {
        // @ts-ignore
        error = err.response.data.message || "An error occurred";
      }
    }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Login</button>
</form>

{#if error}
    <p class="error">{error}</p>
{/if}

<style>
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 300px;
    }
    .error {
      color: red;
    }
</style>