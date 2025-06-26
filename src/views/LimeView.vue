<template>
  <div class="video-container" @click="goHome" @touchstart="goHome">
    <!-- <div class="video-wrapper">
      <video 
        ref="videoElement"
        autoplay 
        loop 
        playsinline
        class="background-video"
        src="/lime.mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div> -->
    
    <div class="overlay">
      <div class="content">
        <img src="/lets-go-lime.webp">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const videoElement = ref(null)

let eventSource = null

const goHome = () => {
  router.push('/')
}

onMounted(async () => {
  // Ensure video plays when component mounts (including on refresh)
  if (videoElement.value) {
    try {
      // Wait for the video to be ready
      await new Promise((resolve) => {
        const video = videoElement.value
        if (video.readyState >= 2) {
          resolve()
        } else {
          video.addEventListener('loadeddata', resolve, { once: true })
        }
      })
      
      // Check if component is still mounted before playing
      if (videoElement.value) {
        await videoElement.value.play()
      }
    } catch (error) {
      // Only log if it's not an AbortError (which happens during navigation)
      if (error.name !== 'AbortError') {
        console.log('Auto-play was prevented:', error)
      }
    }
  }
  
  // Listen for reset events
  if (typeof EventSource !== 'undefined') {
    eventSource = new EventSource('/api/video-events')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'reset-voting') {
        router.push('/')
      }
    }
    
    eventSource.onerror = (error) => {
      console.log('EventSource error:', error)
    }
  }
})

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>

<style scoped>
.video-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* filter: hue-rotate(100deg) saturate(1.5); */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 255, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* display: none; */
}

.overlay img {
  width: 100vw;
}

.content {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.content small {
  font-size: 1rem;
  opacity: 0.8;
  animation: blink 3s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes blink {
  0%, 50% { opacity: 0.8; }
  51%, 100% { opacity: 0.3; }
}

@media (max-width: 768px) {
  .content h1 {
    font-size: 2.5rem;
  }
  
  .content p {
    font-size: 1.2rem;
  }
}
</style>