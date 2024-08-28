<script>
    import { onMount } from "svelte";
    import axios from "axios";
  
    let packs = [];
    let selectedPack = null;
    let currentQuestion = null;
    let error = "";
  
    onMount(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/expedition-packs`, {
          headers: { "x-auth-token": localStorage.getItem("token") }
        });
        packs = response.data;
      } catch (err) {
        error = "Failed to load expedition packs";
      }
    });
  
    async function startGame() {
      if (!selectedPack) return;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/game/start`,
          { packId: selectedPack },
          { headers: { "x-auth-token": localStorage.getItem("token") } }
        );
        currentQuestion = response.data.question;
      } catch (err) {
        error = "Failed to start game";
      }
    }
  </script>
  
  <h1>Bible Trivia Game</h1>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if !currentQuestion}
    <h2>Select an Expedition Pack</h2>
    <select bind:value={selectedPack}>
      <option value={null}>Choose a pack...</option>
      {#each packs as pack}
        <option value={pack.id}>{pack.name}</option>
      {/each}
    </select>
    <button on:click={startGame} disabled={!selectedPack}>Start Game</button>
  {:else}
    <h2>{currentQuestion.question_text}</h2>
    <!-- Add logic for displaying and answering questions here -->
  {/if}
  
  <style>
    .error {
      color: red;
    }
  </style>