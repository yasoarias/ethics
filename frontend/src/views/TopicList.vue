<template>
  <div class="topic-list">
    <h1>Ethics Topics</h1>
    
    <div class="filters">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Filter topics..."
        class="filter-input"
      />
      <select v-model="selectedCategory" class="category-select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="topics-grid">
      <div v-for="topic in filteredTopics" :key="topic.id" class="topic-card">
        <h3>{{ topic.title }}</h3>
        <p class="category">{{ topic.category }}</p>
        <p class="content">{{ topic.content.substring(0, 150) }}...</p>
        <div class="keywords" v-if="topic.keywords && topic.keywords.length">
          <span v-for="keyword in topic.keywords" :key="keyword" class="keyword">
            {{ keyword }}
          </span>
        </div>
        <router-link :to="'/topics/' + topic.id" class="read-more">
          Read More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const topics = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const uniqueCategories = new Set(topics.value.map(topic => topic.category))
  return Array.from(uniqueCategories)
})

const filteredTopics = computed(() => {
  return topics.value.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || topic.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const fetchTopics = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/topics')
    topics.value = response.data
  } catch (error) {
    console.error('Error fetching topics:', error)
  }
}

onMounted(fetchTopics)
</script>

<style scoped>
.topic-list {
  padding: 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-input,
.category-select {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-input {
  flex: 1;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.topic-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.topic-card h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.content {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.keyword {
  background: #e9ecef;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #495057;
}

.read-more {
  display: inline-block;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}
</style> 