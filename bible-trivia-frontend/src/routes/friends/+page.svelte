<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import axios from '$lib/axios';
  
  let friends = [];
  let pendingRequests = [];
  let searchQuery = '';
  let searchResults = [];
  let error = '';
  let success = '';
  let loading = false;
  let activeTab = 'friends';
  let isSearchOpen = false;
  
  onMount(async () => {
    await fetchFriends();
    await fetchPendingRequests();
  });
  
  async function fetchFriends() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/friends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      friends = response.data;
    } catch (err) {
      if (err.response && err.response.status !== 304) {
        error = "Failed to load friends. Please try again.";
        console.error(err);
      }
    }
  }
  
  async function fetchPendingRequests() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/friends', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: 'pending' }
      });
      pendingRequests = response.data;
    } catch (err) {
      if (err.response && err.response.status !== 304) {
        error = "Failed to load pending requests. Please try again.";
        console.error(err);
      }
    }
  }
  
  async function searchUsers() {
      if (searchQuery.length < 3) {
          error = "Search query must be at least 3 characters long";
          return;
      }
      loading = true;
      error = '';
      try {
          const token = localStorage.getItem('token');
          const response = await axios.post('/users/search', 
              { query: searchQuery },
          {
              headers: { Authorization: `Bearer ${token}` }
          }
      );
      searchResults = response.data;
      if (searchResults.length === 0) {
          error = "No users found matching your search.";
      }
      } catch (err) {
          error = err.response?.data?.message || "Failed to search users. Please try again.";
          console.error(err);
      } finally {
          loading = false;
      }
  }
  
  async function sendFriendRequest(userId) {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/friends/request', { friendId: userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      success = "Friend request sent successfully!";
      searchResults = searchResults.filter(user => user.id !== userId);
    } catch (err) {
      error = "Failed to send friend request. Please try again.";
      console.error(err);
    }
  }
  
  async function respondToRequest(requestId, status) {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/friends/respond', { friendshipId: requestId, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      success = `Friend request ${status === 'accepted' ? 'accepted' : 'rejected'}.`;
      await fetchFriends();
      await fetchPendingRequests();
    } catch (err) {
      error = "Failed to respond to friend request. Please try again.";
      console.error(err);
    }
  }
  
  async function removeFriend(friendId) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/friends/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      success = "Friend removed successfully.";
      await fetchFriends();
    } catch (err) {
      error = "Failed to remove friend. Please try again.";
      console.error(err);
    }
  }
  
  function toggleSearch() {
    isSearchOpen = !isSearchOpen;
    if (!isSearchOpen) {
      searchQuery = '';
      searchResults = [];
    }
  }
</script>
  
<svelte:head>
  <title>Friends - Bible Trivia Expedition</title>
</svelte:head>
  
<div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 md:p-12 flex items-center justify-center">
  <div class="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
    <div class="p-8">
      <h1 class="text-4xl font-extrabold text-center text-white mb-8">Your Biblical Companions</h1>

      {#if error || success}
        <div class="mb-6" transition:fade>
          <div class="p-4 rounded-lg {error ? 'bg-red-500 bg-opacity-20 text-red-100' : 'bg-green-500 bg-opacity-20 text-green-100'}">
            <p class="font-medium">{error ? 'Error' : 'Success'}</p>
            <p>{error || success}</p>
          </div>
        </div>
      {/if}

      <div class="flex justify-between items-center mb-8">
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 rounded-full text-white {activeTab === 'friends' ? 'bg-indigo-600' : 'bg-indigo-800 bg-opacity-50'} transition-colors duration-300"
            on:click={() => activeTab = 'friends'}
          >
            Friends
          </button>
          <button
            class="px-4 py-2 rounded-full text-white {activeTab === 'pending' ? 'bg-indigo-600' : 'bg-indigo-800 bg-opacity-50'} transition-colors duration-300"
            on:click={() => activeTab = 'pending'}
          >
            Pending Requests
          </button>
        </div>
        <button
          class="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
          on:click={toggleSearch}
        >
          {isSearchOpen ? 'Close Search' : 'Find Friends'}
        </button>
      </div>

      {#if isSearchOpen}
        <div class="mb-8" transition:fly="{{ y: -20, duration: 300, easing: cubicOut }}">
          <div class="flex space-x-4">
            <input 
              type="text" 
              bind:value={searchQuery} 
              placeholder="Search by username or email" 
              class="flex-grow px-4 py-2 bg-white bg-opacity-20 border-2 border-indigo-300 border-opacity-50 rounded-full text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
            />
            <button 
              on:click={searchUsers}
              class="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {#if loading}
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              {/if}
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {#if searchResults.length > 0}
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {#each searchResults as user (user.id)}
                <div class="bg-indigo-800 bg-opacity-30 p-4 rounded-xl flex items-center justify-between" transition:fly="{{ y: 20, duration: 300, easing: cubicOut }}">
                  <div>
                    <p class="font-medium text-white">{user.username}</p>
                    <p class="text-sm text-indigo-200">{user.email}</p>
                  </div>
                  <button 
                    on:click={() => sendFriendRequest(user.id)}
                    class="bg-pink-600 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-700 transition-colors duration-300"
                  >
                    Add Friend
                  </button>
                </div>
              {/each}
            </div>
          {:else if searchQuery.length >= 3}
            <p class="text-indigo-200 italic mt-4">No users found. Try a different search term.</p>
          {/if}
        </div>
      {/if}

      <div class="max-h-[60vh] overflow-y-auto pr-4 -mr-4">
        {#if activeTab === 'friends'}
          <div class="space-y-4">
            {#if friends.length > 0}
              {#each friends as friend (friend.id)}
                <div class="bg-indigo-800 bg-opacity-30 p-4 rounded-xl flex items-center justify-between" transition:fly="{{ y: 20, duration: 300, easing: cubicOut }}">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {friend.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p class="font-medium text-white">{friend.username}</p>
                      <p class="text-sm text-indigo-200">Joined: {new Date(friend.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button 
                    on:click={() => removeFriend(friend.id)}
                    class="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              {/each}
            {:else}
              <p class="text-indigo-200 italic">You haven't added any friends yet. Start your biblical journey together!</p>
            {/if}
          </div>
        {:else}
          <div class="space-y-4">
            {#if pendingRequests.length > 0}
              {#each pendingRequests as request (request.id)}
                <div class="bg-purple-800 bg-opacity-30 p-4 rounded-xl" transition:fly="{{ y: 20, duration: 300, easing: cubicOut }}">
                  <div class="flex items-center space-x-4 mb-2">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {request.username[0].toUpperCase()}
                    </div>
                    <p class="font-medium text-white">{request.username} wants to be your friend!</p>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      on:click={() => respondToRequest(request.id, 'accepted')}
                      class="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition-colors duration-300"
                    >
                      Accept
                    </button>
                    <button 
                      on:click={() => respondToRequest(request.id, 'rejected')}
                      class="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition-colors duration-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              {/each}
            {:else}
              <p class="text-indigo-200 italic">No pending friend requests.</p>
            {/if}
          </div>
        {/if}
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
</style>