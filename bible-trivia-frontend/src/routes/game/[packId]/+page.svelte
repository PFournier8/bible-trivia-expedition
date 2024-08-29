<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    import axios from 'axios';
    import { page } from '$app/stores';
  
    let packId;
    let questions = [];
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;
    let loading = true;
    let error = null;
    let gameOver = false;
  
    $: currentQuestion = questions[currentQuestionIndex];
  
    onMount(async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        goto('/login');
        return;
      }
  
      packId = $page.params.packId;
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/questions/by-pack/${packId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        questions = response.data.map(q => ({
          ...q,
          correctAnswer: q.Answers.find(a => a.isCorrect).answerText
        }));
        loading = false;
      } catch (err) {
        error = "Failed to load questions. Please try again later.";
        loading = false;
      }
    });
  
    function selectAnswer(answer) {
      selectedAnswer = answer;
    }
  
    function submitAnswer() {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
      }
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedAnswer = null;
      } else {
        gameOver = true;
      }
    }
  
    function restartGame() {
      currentQuestionIndex = 0;
      selectedAnswer = null;
      score = 0;
      gameOver = false;
    }
  </script>
  
  <svelte:head>
    <title>Bible Trivia Expedition - Game</title>
  </svelte:head>
  
  <div class="min-h-screen text-gray-800 pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-100 to-purple-100">
    <div class="max-w-3xl mx-auto">
      {#if loading}
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      {:else if error}
        <div class="text-center text-red-600 text-xl">{error}</div>
      {:else if gameOver}
        <div class="text-center" in:fade>
          <h2 class="text-4xl font-bold mb-4 text-indigo-800">Game Over!</h2>
          <p class="text-2xl mb-8">Your score: {score} out of {questions.length}</p>
          <button 
            on:click={restartGame}
            class="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Play Again
          </button>
        </div>
      {:else}
        <div class="bg-white rounded-lg p-8 shadow-xl border border-gray-200" in:fade>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-2 text-indigo-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div class="bg-indigo-600 h-2.5 rounded-full" style="width: {((currentQuestionIndex + 1) / questions.length) * 100}%"></div>
            </div>
          </div>
          <h3 class="text-xl mb-6">{currentQuestion.questionText}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each currentQuestion.Answers as answer, index}
              <button 
                on:click={() => selectAnswer(answer.answerText)}
                class="p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-105 hover:shadow-md {selectedAnswer === answer.answerText ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border border-gray-300'}"
                in:fly={{ y: 20, delay: 50 * index, duration: 300, easing: elasticOut }}
              >
                {answer.answerText}
              </button>
            {/each}
          </div>
          <div class="mt-8 flex justify-between items-center">
            <div class="text-xl font-bold">Score: {score}</div>
            <button 
              on:click={submitAnswer}
              disabled={!selectedAnswer}
              class="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>