<template>
  <div class="display-container">
    <video 
      ref="videoElement"
      autoplay
      playsinline
      :loop="isLooping"
      class="fullscreen-video"
      :src="videoSrc"
      @ended="onVideoEnded"
    >
      Your browser does not support the video tag.
    </video>
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

let eventSource = null

const onVideoEnded = () => {
  // Return to intro loop after lemon/lime videos
  videoSrc.value = '/intro.mp4'
  isLooping.value = true
  
  if (videoElement.value) {
    videoElement.value.load()
    videoElement.value.play().catch(e => {
      console.log('Auto-play was prevented:', e)
    })
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
    videoElement.value.play().catch(e => {
      console.log('Auto-play was prevented:', e)
    })
  }
}

onMounted(() => {
  // Start playing intro video immediately
  if (videoElement.value) {
    videoElement.value.load()
    videoElement.value.play().catch(e => {
      console.log('Auto-play was prevented:', e)
    })
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
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
</style>