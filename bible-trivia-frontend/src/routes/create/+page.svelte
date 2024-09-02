<script>
    import { onMount } from 'svelte';
    import { fade, fly, slide } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    import axios from 'axios';
    import { goto } from '$app/navigation';
  
    let stage = 'pack';
    let packName = '';
    let packDescription = '';
    let questions = [];
    let currentQuestion = {
      questionText: '',
      questionType: 'multiplechoice',
      correctAnswer: '',
      wrongAnswers: ['', '', ''],
      difficulty: 1
    };
    let error = '';
    let success = '';
  
    const MAX_NAME_LENGTH = 100;
    const MAX_DESCRIPTION_LENGTH = 500;
    const MIN_QUESTIONS = 5;
  
    function nextStage() {
      if (stage === 'pack' && packName && packDescription) {
        stage = 'questions';
      } else if (stage === 'questions' && questions.length >= MIN_QUESTIONS) {
        createPack();
      } else {
        error = 'Please fill in all required fields before proceeding.';
      }
    }
  
    function prevStage() {
      if (stage === 'questions') {
        stage = 'pack';
      }
    }
  
    function addQuestion() {
      if (validateQuestion()) {
        questions = [...questions, { ...currentQuestion }];
        resetCurrentQuestion();
      }
    }
  
    function resetCurrentQuestion() {
      currentQuestion = {
        questionText: '',
        questionType: 'multiplechoice',
        correctAnswer: '',
        wrongAnswers: ['', '', ''],
        difficulty: 1
      };
    }
  
    function removeQuestion(index) {
      questions = questions.filter((_, i) => i !== index);
    }
  
    function validateQuestion() {
      if (!currentQuestion.questionText || !currentQuestion.correctAnswer) {
        error = 'Question text and correct answer are required.';
        return false;
      }
      if (currentQuestion.questionType === 'multiplechoice' && 
          currentQuestion.wrongAnswers.some(answer => !answer)) {
        error = 'All wrong answers must be filled for multiple choice questions.';
        return false;
      }
      if (currentQuestion.questionType === 'truefalse' && 
          !['true', 'false'].includes(currentQuestion.correctAnswer)) {
        error = 'Please select true or false for the correct answer.';
        return false;
      }
      error = '';
      return true;
    }
  
    async function createPack() {
      try {
        if (questions.length === 0) {
          error = 'Please add at least one question before creating the pack.';
          return;
        }

        const packData = {
          name: packName,
          description: packDescription,
          questions: questions.map(q => ({
            questionText: q.questionText,
            questionType: q.questionType,
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.questionType === 'truefalse'
              ? [q.correctAnswer === 'true' ? 'false' : 'true']
              : q.wrongAnswers,c
            difficulty: q.difficulty
          }))
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/expedition-packs`, 
          packData
        );

        success = 'Expedition Pack created successfully!';
        setTimeout(() => goto('/game'), 2000);
      } catch (err) {
        error = 'Failed to create Expedition Pack. Please try again.';
        console.error(err);
        if (err.response) {
          console.error('Error response:', err.response.data);
          error += ' ' + (err.response.data.message || err.response.data.error || '');
        }
      }
    }

    $: if (packName.length > MAX_NAME_LENGTH) {
      error = 'Pack name exceeds the maximum character limit.';
    } else if (packDescription.length > MAX_DESCRIPTION_LENGTH) {
      error = 'Pack description exceeds the maximum character limit.';
    } else {
      error = '';
    }
  </script>
  
  <svelte:head>
  <title>Create Expedition Pack - Bible Trivia</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-poppins">
  <div class="max-w-4xl w-full bg-white bg-opacity-85 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
    <div class="px-8 py-10">
      <h2 class="text-4xl font-bold text-center text-indigo-800 mb-8">Create Your Biblical Expedition Pack</h2>
      
      {#if error}
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert" transition:fade>
          <p class="font-medium">Oops!</p>
          <p>{error}</p>
        </div>
      {/if}

      {#if success}
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6" role="alert" transition:fade>
          <p class="font-medium">Success!</p>
          <p>{success}</p>
        </div>
      {/if}

      <div class="mb-10">
        <div class="flex justify-center items-center space-x-4">
          <div class="flex items-center">
            <div class="w-8 h-8 flex items-center justify-center rounded-full {stage === 'pack' ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-600'}">
              1
            </div>
            <span class="ml-2 text-sm font-medium {stage === 'pack' ? 'text-indigo-600' : 'text-indigo-400'}">Pack Details</span>
          </div>
          <div class="w-8 h-1 bg-indigo-200"></div>
          <div class="flex items-center">
            <div class="w-8 h-8 flex items-center justify-center rounded-full {stage === 'questions' ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-600'}">
              2
            </div>
            <span class="ml-2 text-sm font-medium {stage === 'questions' ? 'text-indigo-600' : 'text-indigo-400'}">Questions</span>
          </div>
        </div>
      </div>

      {#if stage === 'pack'}
        <div transition:fade={{ duration: 300 }}>
          <div class="mb-8">
            <label for="packName" class="block text-sm font-medium text-indigo-700 mb-2">Pack Name</label>
            <input
              type="text"
              id="packName"
              bind:value={packName}
              maxlength={MAX_NAME_LENGTH}
              class="w-full px-4 py-3 border-2 {packName.length > MAX_NAME_LENGTH ? 'border-red-500' : 'border-indigo-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              placeholder="Enter an exciting name for your pack"
            />
          </div>

          <div class="mb-8">
            <label for="packDescription" class="block text-sm font-medium text-indigo-700 mb-2">Pack Description</label>
            <textarea
              id="packDescription"
              bind:value={packDescription}
              maxlength={MAX_DESCRIPTION_LENGTH}
              rows="4"
              class="w-full px-4 py-3 border-2 {packDescription.length > MAX_DESCRIPTION_LENGTH ? 'border-red-500' : 'border-indigo-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none"
              placeholder="Describe your expedition pack in a few sentences"
            ></textarea>
          </div>
        </div>
      {:else if stage === 'questions'}
        <div transition:fade={{ duration: 300 }}>
          <div class="mb-4">
            <h3 class="text-xl font-semibold text-indigo-800 mb-2">Your Questions ({questions.length})</h3>
            <div class="max-h-40 overflow-y-auto">
              {#each questions as question, index (index)}
                <div class="bg-indigo-50 p-2 rounded-lg mb-2 text-sm" transition:fly="{{ y: 20, duration: 300, easing: elasticOut }}">
                  <span class="font-medium text-indigo-700">Q{index + 1}:</span> {question.questionText}
                  <button on:click={() => removeQuestion(index)} class="ml-2 text-xs text-red-600 hover:text-red-800">Remove</button>
                </div>
              {/each}
            </div>
          </div>

          <div class="bg-indigo-50 p-6 rounded-xl mb-4 shadow-md">
            <h3 class="text-lg font-semibold text-indigo-800 mb-4">Add New Question</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  bind:value={currentQuestion.questionText}
                  class="w-full px-4 py-3 border border-indigo-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Question text"
                />
              </div>
              <div>
                <select
                  bind:value={currentQuestion.questionType}
                  class="w-full px-4 py-3 border border-indigo-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  <option value="multiplechoice">Multiple Choice</option>
                  <option value="truefalse">True/False</option>
                </select>
              </div>
            </div>

            {#if currentQuestion.questionType === 'multiplechoice'}
              <div class="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  bind:value={currentQuestion.correctAnswer}
                  class="px-4 py-3 border border-indigo-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Correct answer"
                />
                {#each currentQuestion.wrongAnswers as _, index}
                  <input
                    type="text"
                    bind:value={currentQuestion.wrongAnswers[index]}
                    class="px-4 py-3 border border-indigo-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder={`Wrong answer ${index + 1}`}
                  />
                {/each}
              </div>
            {:else}
              <div class="flex justify-center space-x-8 mb-4">
                <label class="inline-flex items-center">
                  <input type="radio" bind:group={currentQuestion.correctAnswer} value="true" class="form-radio text-indigo-600 h-5 w-5">
                  <span class="ml-2 text-lg">True</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" bind:group={currentQuestion.correctAnswer} value="false" class="form-radio text-indigo-600 h-5 w-5">
                  <span class="ml-2 text-lg">False</span>
                </label>
              </div>
            {/if}

            <div class="mb-4">
              <label for="difficulty" class="block text-sm font-medium text-indigo-700 mb-2">Difficulty: {currentQuestion.difficulty}</label>
              <input
                type="range"
                id="difficulty"
                bind:value={currentQuestion.difficulty}
                min="1"
                max="5"
                class="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              on:click={addQuestion}
              class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg text-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Add Question
            </button>
          </div>
        </div>
      {/if}

      <div class="flex justify-between items-center">
        {#if stage === 'questions'}
          <button
            on:click={prevStage}
            class="bg-gray-200 text-indigo-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            Back to Pack Details
          </button>
        {:else}
          <div></div>
        {/if}
        <button
          on:click={nextStage}
          class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 text-lg"
        >
          {stage === 'pack' ? 'Next: Add Questions' : 'Create Expedition Pack'}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Poppins', sans-serif;
  }

  .backdrop-filter {
    backdrop-filter: blur(10px);
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #4F46E5;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    background: #4338CA;
    transform: scale(1.1);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #4F46E5;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]::-moz-range-thumb:hover {
    background: #4338CA;
    transform: scale(1.1);
  }
</style>