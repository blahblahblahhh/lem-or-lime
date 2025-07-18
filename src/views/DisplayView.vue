<template>
  <div class="display-container">
    <video 
      ref="videoElement"
      playsinline
      :loop="isLooping"
      class="fullscreen-video"
      :src="videoSrc"
      @ended="onVideoEnded"
    >
      Your browser does not support the video tag.
    </video>
    
    <!-- BEGIN Button -->
    <div v-if="showBeginButton" class="begin-button-overlay">
      <button @click="beginVideo" class="begin-button">
        BEGIN
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const videoElement = ref(null)
const videoSrc = ref('/intro.mp4')
const isLooping = ref(true)
const showBeginButton = ref(true)

let eventSource = null

const onVideoEnded = () => {
  // Return to intro loop after lemon/lime videos
  videoSrc.value = '/intro.mp4'
  isLooping.value = true
  
  if (videoElement.value) {
    videoElement.value.load()
    videoElement.value.addEventListener('loadeddata', () => {
      videoElement.value.play().catch(e => {
        console.log('Auto-play was prevented:', e)
      })
    }, { once: true })
  }
  
  fetch('/api/reset-voting', { method: 'POST' })
    .catch(error => console.log('Reset voting error:', error))
}

const playVideo = (type) => {
  if (type === 'lemon') {
    videoSrc.value = '/lemon.mp4'
  } else if (type === 'lime') {
    videoSrc.value = '/lime.mp4'
  }
  
  // Stop looping for lemon/lime videos
  isLooping.value = false
  
  if (videoElement.value) {
    videoElement.value.load()
    videoElement.value.addEventListener('loadeddata', () => {
      videoElement.value.play().catch(e => {
        console.log('Auto-play was prevented:', e)
      })
    }, { once: true })
  }
}

const beginVideo = () => {
  showBeginButton.value = false
  if (videoElement.value) {
    videoElement.value.load()
    videoElement.value.addEventListener('loadeddata', () => {
      videoElement.value.play().catch(e => {
        console.log('Play failed:', e)
      })
    }, { once: true })
  }
}

onMounted(() => {
  // Don't auto-start video, wait for user to click BEGIN
  if (videoElement.value) {
    videoElement.value.load()
  }
  
  if (typeof EventSource !== 'undefined') {
    eventSource = new EventSource('/api/video-events')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'play-video') {
        playVideo(data.video)
      }
    }
    
    eventSource.onerror = (error) => {
      console.log('EventSource error:', error)
    }
  }
  
  const urlParams = new URLSearchParams(window.location.search)
  const videoType = urlParams.get('video')
  if (videoType) {
    playVideo(videoType)
  }
})

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>

<style scoped>
.display-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #000;
  overflow: hidden;
}

.fullscreen-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
}

.begin-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.begin-button {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #32CD32 100%);
  border: none;
  border-radius: 50px;
  padding: 2rem 4rem;
  font-size: 2rem;
  font-weight: 900;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  letter-spacing: 3px;
  font-family: 'Arial Black', Arial, sans-serif;
  transform: scale(1);
}

.begin-button:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

.begin-button:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .begin-button {
    padding: 1.5rem 3rem;
    font-size: 1.5rem;
  }
}
</style>