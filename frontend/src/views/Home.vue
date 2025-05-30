<template>
  <div class="search-engine-home">
    <h1>GE11 Ethics Search Engine</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search ethics topics..."
        @input="search"
        class="search-input"
      />
      <button @click="search" class="search-button">Search</button>
    </div>

    <div class="filters">
      <select v-model="selectedCategory" class="category-select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="results">
      <div v-if="filteredLocalResults.length" class="local-results-section">
        <h2>Local Topics</h2>
        <div class="topic-grid">
          <div v-for="topic in filteredLocalResults" :key="topic.id" class="topic-card">
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.content.substring(0, 150) }}...</p>
            <router-link :to="'/topics/' + topic.id" class="read-more">
              Read More
            </router-link>
          </div>
        </div>
      </div>
      <div v-else-if="searchQuery && !isLoading" class="no-results">No local topics found.</div>

      <div v-if="googleResults.length" class="google-results-section">
        <h2>Web Results (via Google)</h2>
        <div class="google-grid">
          <div v-for="googleResult in googleResults" :key="googleResult.link" class="google-card">
            <a :href="googleResult.link" target="_blank" rel="noopener" class="google-title">{{ googleResult.title }}</a>
            <p class="google-link">{{ googleResult.displayLink }}</p>
            <p class="google-snippet">{{ googleResult.snippet }}</p>
          </div>
        </div>
      </div>
      <div v-else-if="searchQuery && !isLoading && !filteredLocalResults.length" class="no-results">
        No results found.
      </div>
    </div>

    <!-- Google Custom Search Element -->
    <div class="google-cse-container">
      <div class="gcse-search"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const allTopics = ref([])
const selectedCategory = ref('')
const googleResults = ref([])
const isLoading = ref(false)
const error = ref(null)

const fetchTopics = async () => {
  if (!searchQuery.value) {
    allTopics.value = []
    googleResults.value = []
    return
  }

  isLoading.value = true
  error.value = null
  
  try {
    const response = await axios.get('http://localhost:8000/api/topics/search?query=' + encodeURIComponent(searchQuery.value))
    allTopics.value = response.data.local
    googleResults.value = response.data.google || []
  } catch (error) {
    console.error('Error fetching topics:', error)
    error.value = 'Failed to fetch results. Please try again.'
    allTopics.value = []
    googleResults.value = []
  } finally {
    isLoading.value = false
  }
}

const categories = computed(() => {
  const uniqueCategories = new Set(allTopics.value.map(topic => topic.category))
  return Array.from(uniqueCategories)
})

const filteredLocalResults = computed(() => {
  return allTopics.value.filter(topic => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || topic.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const search = () => {
  fetchTopics()
}

onMounted(fetchTopics)
</script>

<style scoped>
.search-engine-home {
  text-align: center;
}

.search-container {
  max-width: 600px;
  margin: 2rem auto 1rem auto;
  display: flex;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #34495e;
}

.filters {
  max-width: 600px;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: flex-end;
}

.category-select {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.results {
  margin-top: 2rem;
}

.local-results-section {
    margin-bottom: 3rem;
    text-align: left;
}

.local-results-section h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.topic-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.topic-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}

.no-results {
  color: #888;
  margin-top: 2rem;
}

.google-results-section {
  margin-top: 3rem;
  text-align: left;
}

.google-results-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.google-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.google-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.google-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1a237e;
  text-decoration: none;
}

.google-title:hover {
    text-decoration: underline;
}

.google-link {
    font-size: 0.9rem;
    color: #006621;
    margin-bottom: 0.5rem;
}

.google-snippet {
  margin: 0.5rem 0 1rem 0;
  color: #333;
}

.google-cse-container {
  margin-top: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.google-cse-container .gcse-search {
  max-width: 800px;
  margin: 0 auto;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}
</style> 