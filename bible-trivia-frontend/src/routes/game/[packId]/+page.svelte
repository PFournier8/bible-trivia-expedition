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

  let answerSubmitted = false;
  let feedbackMessage = '';

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
        Answers: q.answers.map(a => ({ answerText: a.text, isCorrect: a.isCorrect }))
      }));
      console.log('Processed questions:', questions);
      loading = false;
    } catch (err) {
      console.error('Error fetching questions:', err);
      error = "Failed to load questions. Please try again later.";
      loading = false;
    }
  });

  function selectAnswer(answer) {
    if (!answerSubmitted) {
      selectedAnswer = answer;
    }
  }

  function submitAnswer() {
    if (!answerSubmitted && selectedAnswer) {
      answerSubmitted = true;
      const correctAnswer = currentQuestion.Answers.find(a => a.isCorrect);
      if (selectedAnswer === correctAnswer.answerText) {
        score++;
        feedbackMessage = 'Correct!';
      } else {
        feedbackMessage = `Incorrect. The correct answer was: ${correctAnswer.answerText}`;
      }
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      selectedAnswer = null;
      answerSubmitted = false;
      feedbackMessage = '';
    } else {
      gameOver = true;
    }
  }

  function restartGame() {
    currentQuestionIndex = 0;
    selectedAnswer = null;
    score = 0;
    gameOver = false;
    answerSubmitted = false;
    feedbackMessage = '';
  }
</script>

<svelte:head>
  <title>Bible Trivia Expedition - Game</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl w-full space-y-8">
    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    {:else if error}
      <div class="text-center text-red-600 text-xl bg-white p-8 rounded-lg shadow-xl">{error}</div>
    {:else if questions.length === 0}
      <div class="text-center text-red-600 text-xl bg-white p-8 rounded-lg shadow-xl">No questions found for this pack.</div>
    {:else if gameOver}
      <div class="text-center bg-white rounded-lg p-8 shadow-xl" in:fade>
        <h2 class="text-4xl font-bold mb-4 text-indigo-800">Game Over!</h2>
        <p class="text-2xl mb-8">Your score: {score} out of {questions.length}</p>
        <button 
          on:click={restartGame}
          class="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Play Again
        </button>
      </div>
    {:else if currentQuestion}
      <div class="bg-white rounded-lg p-8 shadow-xl" in:fade>
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2 text-indigo-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-indigo-600 h-2 rounded-full transition-all duration-500" style="width: {((currentQuestionIndex + 1) / questions.length) * 100}%"></div>
          </div>
        </div>
        <h3 class="text-xl mb-6">{currentQuestion.questionText}</h3>
        <div class="space-y-4 mb-8">
          {#each currentQuestion.Answers as answer, index}
            <button 
              on:click={() => selectAnswer(answer.answerText)}
              class="w-full p-4 rounded-lg text-left transition-all duration-200 
                     {selectedAnswer === answer.answerText ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border border-gray-300'} 
                     {answerSubmitted ? (answer.isCorrect ? 'bg-green-100 border-green-500' : (selectedAnswer === answer.answerText ? 'bg-red-100 border-red-500' : '')) : ''}
                     hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={answerSubmitted}
              in:fly={{ y: 20, delay: 50 * index, duration: 300, easing: elasticOut }}
            >
              {answer.answerText}
            </button>
          {/each}
        </div>
        {#if feedbackMessage}
          <div class="text-center mb-6 text-lg font-semibold {feedbackMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'}" in:fade>
            {feedbackMessage}
          </div>
        {/if}
        <div class="flex justify-between items-center">
          <div class="text-xl font-bold text-indigo-800">Score: {score}</div>
          <button 
            on:click={answerSubmitted ? nextQuestion : submitAnswer}
            disabled={!selectedAnswer && !answerSubmitted}
            class="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {answerSubmitted ? 'Next Question' : 'Submit Answer'}
          </button>
        </div>
      </div>
    {:else}
      <div class="text-center text-red-600 text-xl bg-white p-8 rounded-lg shadow-xl">No current question available.</div>
    {/if}
  </div>
</div>