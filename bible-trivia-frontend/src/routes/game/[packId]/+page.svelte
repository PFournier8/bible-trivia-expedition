<script>
  import { onMount, onDestroy } from 'svelte';
  // @ts-ignore
  import { browser } from '$app/environment';
  // @ts-ignore
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut, cubicInOut } from 'svelte/easing';
  import axios from 'axios';
  // @ts-ignore
  import { page } from '$app/stores';
  // @ts-ignore
  import { goto } from '$app/navigation';
  import { shuffle } from './utils'; // Add this import

  // @ts-ignore
  let packId;
  // @ts-ignore
  let questions = [];
  let currentQuestionIndex = 0;
  // @ts-ignore
  let selectedAnswer = null;
  let score = 0;
  let loading = true;
  // @ts-ignore
  let error = null;
  let completedPack = false;
  // @ts-ignore
  let startTime;
  let endTime;
  // @ts-ignore
  let leaderboard = [];

 // @ts-ignore
   $: currentQuestion = questions[currentQuestionIndex];
  $: accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  let answerSubmitted = false;
  let feedbackMessage = '';
  let scoreAnimation = false;
  // @ts-ignore
  let canvasElement;
  // @ts-ignore
  let ctx;

  // @ts-ignore
  let gameContainer;

  onMount(() => {
    // @ts-ignore
    if (browser && gameContainer) {
      gameContainer.style.height = '100vh';
      gameContainer.style.overflow = 'hidden';
    }
    
    const fetchQuestions = async () => {
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
        questions = response.data.map(q => {
          const answers = q.answers.map(a => ({ answerText: a.text, isCorrect: a.isCorrect }));
          return {
            ...q,
            Answers: answers.length > 2 ? shuffle([...answers]) : answers
          };
        });
        loading = false;
        startTime = Date.now();
      } catch (err) {
        console.error('Error fetching questions:', err);
        error = "Failed to load questions. Please try again later.";
        loading = false;
      }
    };

    fetchQuestions();
    initSmoke();
  });

  onDestroy(() => {
    // @ts-ignore
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  // @ts-ignore
  function selectAnswer(answer) {
    if (!answerSubmitted) {
      selectedAnswer = answer;
    }
  }

  function submitAnswer() {
    // @ts-ignore
    if (!answerSubmitted && selectedAnswer) {
      answerSubmitted = true;
      // @ts-ignore
      const correctAnswer = currentQuestion.Answers.find(a => a.isCorrect);
      if (selectedAnswer === correctAnswer.answerText) {
        score++;
        scoreAnimation = true;
        setTimeout(() => scoreAnimation = false, 1000);
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
      completePack();
    }
  }

  async function completePack() {
  completedPack = true;
  endTime = Date.now();
  // @ts-ignore
  const timeTaken = Math.round((endTime - startTime) / 1000); 

  const token = localStorage.getItem('token');
  if (!token) {
        goto('/login');
        return;
      }

  try {
    // @ts-ignore
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/pack-attempts`, {
      // @ts-ignore
      packId,
      score: accuracy,
      timeCompleted: timeTaken
    }, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Fetch leaderboard data
    // @ts-ignore
    const leaderboardResponse = await axios.get(`${import.meta.env.VITE_API_URL}/pack-attempts/pack/${packId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    leaderboard = leaderboardResponse.data;
  } catch (err) {
    // @ts-ignore
    console.error('Error updating pack attempt:', err.response ? err.response.data : err.message);
  }
}

  function restartPack() {
    currentQuestionIndex = 0;
    selectedAnswer = null;
    score = 0;
    completedPack = false;
    answerSubmitted = false;
    feedbackMessage = '';
    startTime = Date.now();
  }

  function selectAnotherPack() {
    goto('/game');
  }

  // @ts-ignore
  let particles = [];
  // @ts-ignore
  let animationFrameId;

  function initSmoke() {
    canvasElement = document.getElementById('smokeCanvas');
    // @ts-ignore
    ctx = canvasElement.getContext('2d');
    // @ts-ignore
    canvasElement.width = window.innerWidth;
    // @ts-ignore
    canvasElement.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
      particles.push({
        // @ts-ignore
        x: Math.random() * canvasElement.width,
        // @ts-ignore
        y: Math.random() * canvasElement.height,
        radius: Math.random() * 20 + 5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.3})`,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
      });
    }

    animateSmoke();
  }

  function animateSmoke() {
    // @ts-ignore
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // @ts-ignore
    particles.forEach(particle => {
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      // @ts-ignore
      ctx.fillStyle = particle.color;
      // @ts-ignore
      ctx.fill();

      particle.x += particle.vx;
      particle.y += particle.vy;

      // @ts-ignore
      if (particle.x < 0 || particle.x > canvasElement.width) particle.vx *= -1;
      // @ts-ignore
      if (particle.y < 0 || particle.y > canvasElement.height) particle.vy *= -1;
    });

    animationFrameId = requestAnimationFrame(animateSmoke);
  }
</script>

<svelte:head>
  <title>Bible Trivia Expedition - Game</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div bind:this={gameContainer} class="game-container">
  <div class="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
  <canvas id="smokeCanvas" class="fixed top-0 left-0 w-full h-full opacity-50"></canvas>

  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-3xl w-full space-y-8">
      {#if loading}
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      {:else if error}
        <div class="text-center text-white text-xl bg-red-600 bg-opacity-80 p-8 rounded-lg shadow-xl">{error}</div>
      {:else if questions.length === 0}
        <div class="text-center text-white text-xl bg-red-600 bg-opacity-80 p-8 rounded-lg shadow-xl">No questions found for this pack.</div>
      {:else if completedPack}
        <div class="flex justify-center items-start space-x-8">
          <!-- Leaderboard -->
          <div class="w-1/3" in:fade={{ duration: 800 }}>
            <div class="bg-gradient-to-b from-blue-900 to-blue-700 rounded-2xl p-6 shadow-2xl h-[600px] flex flex-col">
              <h3 class="text-3xl font-bold mb-4 text-white font-poppins text-center">Leaderboard</h3>
              <div class="flex-grow overflow-y-auto custom-scrollbar">
                {#each leaderboard.slice(0, 10) as entry, index}
                  <div class="flex items-center mb-4 p-3 rounded-lg transition-all duration-300 hover:bg-blue-600" 
                       in:fly={{ y: 20, delay: 50 * index, duration: 300, easing: elasticOut }}>
                    <div class="w-10 h-10 flex-shrink-0 mr-4 relative">
                      {#if index < 3}
                        <img src="/images/medal-{index + 1}.svg" alt="Medal {index + 1}" class="w-full h-full object-contain" />
                      {:else}
                        <div class="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      {/if}
                    </div>
                    <div class="flex-grow">
                      <p class="font-semibold text-white">{entry.User.username}</p>
                      <p class="text-sm text-blue-200">{entry.timeCompleted}s</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Completed Pack Info -->
          <div class="w-2/3 flex items-center justify-center">
            <div class="text-center bg-white bg-opacity-95 rounded-2xl p-10 shadow-2xl max-w-2xl" in:fade={{ duration: 800 }}>
              <div class="mb-8">
                <h2 class="text-5xl font-bold mb-4 text-indigo-800 font-poppins">Congratulations!</h2>
                <p class="text-2xl mb-4 text-indigo-600 font-poppins">You've completed the trivia pack!</p>
              </div>
              <div class="mb-8">
                <p class="text-3xl font-semibold mb-4 text-indigo-800 font-poppins">
                  Your Accuracy: <span class="text-4xl text-indigo-600">{score}</span> / {questions.length}
                </p>
                <div class="flex items-center justify-center">
                  <div class="w-48 h-48 relative">
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                      <circle class="text-gray-200 stroke-current" stroke-width="10" cx="50" cy="50" r="40" fill="transparent"/>
                      <circle class="text-indigo-600 progress-ring stroke-current" stroke-width="10" cx="50" cy="50" r="40" fill="transparent"
                              stroke-dasharray="251.2"
                              stroke-dashoffset={251.2 - (251.2 * accuracy / 100)}
                      />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-4xl font-bold text-indigo-800 font-poppins">{accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center space-x-4 mb-8">
                <button 
                  on:click={restartPack}
                  class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 font-poppins"
                >
                  Restart This Pack
                </button>
                <button 
                  on:click={selectAnotherPack}
                  class="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 font-poppins"
                >
                  Select Another Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      {:else if currentQuestion}
        <div class="bg-white bg-opacity-90 rounded-lg p-8 shadow-xl" in:fade>
          <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-2 text-indigo-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
            <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style="width: {((currentQuestionIndex + 1) / questions.length) * 100}%"
              >
                <div class="w-full h-full opacity-30 animate-pulse bg-white"></div>
              </div>
            </div>
          </div>
          <h3 class="text-xl mb-6 font-medium text-gray-800">{currentQuestion.questionText}</h3>
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
            <div class="text-xl font-bold text-indigo-800 relative">
              Score: {score}
              {#if scoreAnimation}
                <span 
                  class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl text-green-500 font-bold"
                  in:fly={{ y: -20, duration: 500, easing: cubicInOut }}
                  out:fade
                >
                  +1
                </span>
              {/if}
            </div>
            <button 
              on:click={answerSubmitted ? nextQuestion : submitAnswer}
              disabled={!selectedAnswer && !answerSubmitted}
              class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {answerSubmitted ? 'Next Question' : 'Submit Answer'}
            </button>
          </div>
        </div>
      {:else}
        <div class="text-center text-white text-xl bg-red-600 bg-opacity-80 p-8 rounded-lg shadow-xl">No current question available.</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .game-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .animate-gradient-x {
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .progress-ring {
    transition: stroke-dashoffset 0.8s ease-in-out;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  /* Custom scrollbar styles */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    border: transparent;
  }
</style>