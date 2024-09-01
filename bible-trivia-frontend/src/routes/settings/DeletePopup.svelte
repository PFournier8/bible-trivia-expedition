<script>
  export let handleAction;
  export let closePopup;

  let confirmDelete = '';
</script>

<h2 class="text-2xl font-semibold text-red-600 mb-4">Delete Account</h2>
<p class="mb-4 text-gray-700">This action cannot be undone. Please type "DELETE" in all caps to confirm.</p>
<input
  type="text"
  bind:value={confirmDelete}
  placeholder="Type DELETE to confirm"
  class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
/>
<div class="flex justify-end space-x-4">
  <button on:click={closePopup} class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
  <button
    on:click={() => handleAction('deleteAccount', {})}
    disabled={confirmDelete !== 'DELETE'}
    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Delete Account
  </button>
</div>
