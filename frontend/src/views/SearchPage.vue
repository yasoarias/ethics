<template>
  <div class="search-page-container">
    <div class="search-header">
      <h1>Ethics Search Engine</h1>
      <p>Explore core ethical theories and moral issues</p>
    </div>
    <div class="search-bar-container">
      <input type="text" placeholder="Search ethics topics..." class="search-input" v-model="searchQuery" @keyup.enter="performSearch">
      <button class="search-icon-button" @click="performSearch">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M10.5 10.5c-1.767 0-3.535.672-4.849 1.985A6.876 6.876 0 0 0 3.75 16.5a6.876 6.876 0 0 0 1.801 4.515C6.965 22.328 8.733 23 10.5 23a6.876 6.876 0 0 0 4.515-1.801C16.328 19.035 17 17.267 17 15.5a6.876 6.876 0 0 0-1.801-4.515A6.876 6.876 0 0 0 10.5 10.5Zm0 11.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11ZM20.28 20.97l-4.51-4.51A7.01 7.01 0 0 0 17 15.5a7 7 0 1 0-14 0a7.01 7.01 0 0 0 1.28 3.94l-4.51 4.51L2.53 22.47l4.51-4.51A6.97 6.97 0 0 0 10.5 19a6.97 6.97 0 0 0 3.94-1.28l4.51 4.51l1.41-1.41Z"/>
        </svg>
      </button>
    </div>
    <div class="results-section">
      <div v-if="results">
        <p class="result-text" v-html="formattedResults">
        </p>
      </div>
      <div v-else>
        <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        </div>
        <p v-else>
          <span v-if="loadingState">Loading...</span>
          <span v-else>Search results will appear here.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const searchQuery = ref('');
const results = ref("");
const errorMessage = ref('');
const loadingState = ref(false);

const formattedResults = computed(() => {
  const text = results.value || "";
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/###(.*?)/g, "<b style='font-size: 1.5rem'>$1</b>");
});

const performSearch = async () => {
  if (!searchQuery.value) return;

  loadingState.value = true;
  results.value = "";
  errorMessage.value = "";

  try {
    const response = await axios.post('http://localhost:3000/search', {
      query: searchQuery.value,
    });

    if (response.data.result?.invalidSearch) {
      errorMessage.value = 'Invalid search. Search must be related to ethics.';
      results.value = "Invalid search. Search must be related to ethics.";
      return;
    }

    errorMessage.value = '';
    results.value = response.data.result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    results.value = [];
  }
};
</script>


<style scoped>
.search-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5; /* Match the background color */
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-header h1 {
  font-size: 2.5rem;
  color: #1a73e8; /* Google Blue */
  margin-bottom: 0.5rem;
}

.search-header p {
  font-size: 1.2rem;
  color: #5f6368; /* Google Grey */
}

.search-bar-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 24px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: hidden; /* Ensure content stays within rounded corners */
}

.search-input {
  flex-grow: 1;
  padding: 0.8rem 1.2rem; /* Adjusted padding */
  border: none; /* Remove default border */
  outline: none; /* Remove outline on focus */
  font-size: 1rem;
}

.search-icon-button {
  background-color: #1a73e8; /* Google Blue */
  color: white;
  border: none;
  padding: 0.8rem; /* Adjusted padding for circular shape */
  border-radius: 50%; /* Circular shape */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px; /* Space between input and button */
}

.search-icon-button svg {
  fill: white; /* Ensure the icon is white */
}

.search-icon-button:hover {
  background-color: #1558b3; /* Darker blue on hover */
}

.results-section {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem; /* Increased margin top */
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-result {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.search-result:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.search-result h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.search-result a {
  color: #0066cc;
  text-decoration: underline;
}

.search-result a:hover {
  color: #004080;
}

.search-result p {
  margin-bottom: 0.5rem;
  color: #555;
}
</style> 