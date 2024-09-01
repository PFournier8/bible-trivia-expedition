<script>
  export let handleAction;
  export let closePopup;

  let username = '';
</script>

<div class="username-popup">
  <h2>Change Username</h2>
  <form on:submit|preventDefault={() => handleAction('updateUsername', { username })}>
    <input
      type="text"
      bind:value={username}
      placeholder="New Username"
      required
    />
    <div class="button-group">
      <button type="button" on:click={closePopup} class="cancel-btn">
        Cancel
      </button>
      <button type="submit" disabled={!username} class="submit-btn">
        Update Username
      </button>
    </div>
  </form>
</div>

<style>
  .username-popup {
    width: 100%;
  }

  h2 {
    color: #4f46e5;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  button {
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cancel-btn {
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    color: #4b5563;
  }

  .cancel-btn:hover {
    background: linear-gradient(135deg, #e5e7eb, #d1d5db);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .submit-btn {
    background: linear-gradient(135deg, #4f46e5, #4338ca);
    color: white;
  }

  .submit-btn:hover {
    background: linear-gradient(135deg, #4338ca, #3730a3);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
</style>
