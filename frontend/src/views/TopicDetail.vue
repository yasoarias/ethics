<template>
  <div class="topic-detail" v-if="topic">
    <div class="header">
      <h1>{{ topic.title }}</h1>
      <p class="category">{{ topic.category }}</p>
    </div>

    <div class="content">
      <p>{{ topic.content }}</p>
    </div>

    <div class="keywords" v-if="topic.keywords && topic.keywords.length">
      <h3>Keywords</h3>
      <div class="keyword-list">
        <span v-for="keyword in topic.keywords" :key="keyword" class="keyword">
          {{ keyword }}
        </span>
      </div>
    </div>

    <div class="actions">
      <router-link to="/topics" class="back-button">
        Back to Topics
      </router-link>
    </div>
  </div>
  <div v-else class="loading">
    Loading...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const topic = ref(null)

const fetchTopic = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/topics/${route.params.id}`)
    topic.value = response.data
  } catch (error) {
    console.error('Error fetching topic:', error)
  }
}

onMounted(fetchTopic)
</script>

<style scoped>
.topic-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.category {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.content {
  line-height: 1.8;
  margin-bottom: 2rem;
}

.keywords {
  margin-bottom: 2rem;
}

.keywords h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword {
  background: #e9ecef;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #495057;
}

.actions {
  text-align: center;
}

.back-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #34495e;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style> 