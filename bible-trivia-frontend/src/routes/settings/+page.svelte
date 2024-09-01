<script>
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import axios from '$lib/axios';
  
  let error = '';
  let success = '';
  let activePopup = null;
  
  function showPopup(popupName) {
    activePopup = popupName;
  }
  
  function closePopup() {
    activePopup = null;
    error = '';
    success = '';
  }
  
  async function handleAction(action, data) {
    error = '';
    success = '';
    try {
      const token = localStorage.getItem('token');
      let response;
      switch (action) {
        case 'updateEmail':
          response = await axios.put('/users/update-email', { email: data.email }, { headers: { Authorization: `Bearer ${token}` } });
          success = 'Email updated successfully!';
          break;
        case 'updateUsername':
          response = await axios.put('/users/update-username', { username: data.username }, { headers: { Authorization: `Bearer ${token}` } });
          success = 'Username updated successfully!';
          break;
        case 'changePassword':
          response = await axios.put('/users/change-password', { currentPassword: data.currentPassword, newPassword: data.newPassword }, { headers: { Authorization: `Bearer ${token}` } });
          success = 'Password changed successfully!';
          break;
        case 'deleteAccount':
          response = await axios.delete('/users/delete-account', { headers: { Authorization: `Bearer ${token}` } });
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
      }
      closePopup();
    } catch (err) {
      error = err.response?.data?.message || `Failed to ${action}. Please try again.`;
    }
  }
  
  import EmailPopup from './EmailPopup.svelte';
  import UsernamePopup from './UsernamePopup.svelte';
  import PasswordPopup from './PasswordPopup.svelte';
  import DeletePopup from './DeletePopup.svelte';
</script>

<svelte:head>
  <title>Settings - Bible Trivia Expedition</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-poppins">
  <div class="max-w-4xl w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
    <div class="px-8 py-12">
      <h1 class="text-5xl font-bold text-center text-indigo-800 mb-12">Account Settings</h1>

      {#if error || success}
        <div class="mb-8" transition:fade>
          <div class="p-4 rounded-lg {error ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-green-100 border-l-4 border-green-500 text-green-700'}">
            <p class="font-medium">{error ? 'Error' : 'Success'}</p>
            <p>{error || success}</p>
          </div>
        </div>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold text-indigo-700 mb-4">Profile Settings</h2>
          <button on:click={() => showPopup('email')} class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg">
            Update Email
          </button>
          <button on:click={() => showPopup('username')} class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg">
            Change Username
          </button>
        </div>
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold text-indigo-700 mb-4">Security Settings</h2>
          <button on:click={() => showPopup('password')} class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg">
            Change Password
          </button>
          <button on:click={() => showPopup('delete')} class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

{#if activePopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" on:click={closePopup} transition:fade>
    <div class="bg-white rounded-lg p-8 max-w-md w-full" on:click|stopPropagation transition:fly="{{ y: 50, duration: 300, easing: cubicOut }}">
      {#if activePopup === 'email'}
        <EmailPopup {handleAction} {closePopup} />
      {:else if activePopup === 'username'}
        <UsernamePopup {handleAction} {closePopup} />
      {:else if activePopup === 'password'}
        <PasswordPopup {handleAction} {closePopup} />
      {:else if activePopup === 'delete'}
        <DeletePopup {handleAction} {closePopup} />
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(body) {
    font-family: 'Poppins', sans-serif;
  }

  .backdrop-filter {
    backdrop-filter: blur(10px);
  }
</style>