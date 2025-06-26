<template>
  <div class="welcome-container">
    <!-- Main Title -->
    <div class="main-title">
      <h1 class="brand-title">
        <span class="lem-text">
          <img src="/lem.svg" class="title-logo">
        </span>
        <span class="or-text">OR</span>
        <span class="lime-text">
          <img src="/lime.svg" class="title-logo">
        </span>
      </h1>
      <h2 class="question-text">
        WHAT MAKES<br>
        STARRY SO<br>
        REFRESHING?
      </h2>
      <p class="choose-text">CHOOSE A SIDE!</p>
    </div>

    <div class="split-screen">
      <!-- Left Column - Lemon -->
      <div class="column left-column" :class="{ 'hover-left': isHoveringLeft }" 
           @mouseenter="isHoveringLeft = true" 
           @mouseleave="isHoveringLeft = false">
        
        <!-- Lemon Character -->
        <div class="character-container">
          <img src="/lem-character.png" alt="Lem Character" class="character-image">
        </div>

        <!-- Team Lemon Button -->
        <div class="team-button-container">
          <img src="/team-lem.svg" alt="Team Lem" class="team-button" @click="goToLemon">
        </div>
      </div>

      <!-- Right Column - Lime -->
      <div class="column right-column" :class="{ 'hover-right': isHoveringRight }"
           @mouseenter="isHoveringRight = true" 
           @mouseleave="isHoveringRight = false">
        
        <!-- Lime Character -->
        <div class="character-container">
          <img src="/lime-character.png" alt="Lime Character" class="character-image">
        </div>

        <!-- Team Lime Button -->
        <div class="team-button-container">
          <img src="/team-lime.svg" alt="Team Lime" class="team-button" @click="goToLime">
        </div>
      </div>
    </div>

    <!-- Decorative Stars -->
    <div class="stars">
      <div class="star star-1">✦</div>
      <div class="star star-2">✦</div>
      <div class="star star-3">✦</div>
      <div class="star star-4">✦</div>
      <div class="star star-5">✦</div>
      <div class="star star-6">✦</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isHoveringLeft = ref(false)
const isHoveringRight = ref(false)

const goToLemon = () => {
  fetch('/api/trigger-video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ video: 'lemon' })
  }).catch(error => console.log('Trigger video error:', error))
  
  router.push('/lemon')
}

const goToLime = () => {
  fetch('/api/trigger-video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ video: 'lime' })
  }).catch(error => console.log('Trigger video error:', error))
  
  router.push('/lime')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.welcome-container {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  font-family: 'Arial Black', Arial, sans-serif;
  background-image: url('/home-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.main-title {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  pointer-events: none;
}

.brand-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  line-height: 1;
}

.title-logo {
  height: clamp(3rem, 8vw, 6rem);
  width: auto;
  filter: drop-shadow(3px 3px 0px #000000);
}

.or-text {
  color: #000000;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 900;
  text-shadow: 2px 2px 0px rgba(255,255,255,0.8);
  margin: 0 0.5rem;
}

.question-text {
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 900;
  color: #000000;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0px rgba(255,255,255,0.8);
}

.choose-text {
  font-size: clamp(1rem, 2.5vw, 1.8rem);
  font-weight: 900;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 0px rgba(255,255,255,0.8);
}

.split-screen {
  display: flex;
  width: 100%;
  height: 100%;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.4s ease;
  /* padding: 0 2rem 3rem 2rem; */
}

.left-column {
  align-items: flex-start;
  /* padding-left: 4rem; */
}

.right-column {
  align-items: flex-end;
  /* padding-right: 4rem; */
}

.column.hover-left,
.column.hover-right {
  flex: 1.1;
}

.character-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  margin-top: 2rem;
}

.character-image {
  /* max-width: clamp(200px, 25vw, 350px); */
  max-height: 80vh;
  width: auto;
  height: auto;
  filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.column:hover .character-image {
  transform: scale(1.05);
}

.team-button-container {
  position: relative;
  z-index: 5;
  width: 100%;
  display: flex;
  justify-content: center;
}

.team-button {
  height: 75px;
  width: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.3));
  margin: 2rem;
}

.team-button:hover {
  transform: translateY(-3px) scale(1.05);
  filter: drop-shadow(5px 8px 15px rgba(0, 0, 0, 0.4));
}

.team-button:active {
  transform: translateY(-1px) scale(1.02);
  filter: drop-shadow(2px 3px 8px rgba(0, 0, 0, 0.3));
}

/* Decorative Stars */
.stars {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.star {
  display: none;
  position: absolute;
  font-size: clamp(1rem, 2.5vw, 2rem);
  color: #FFD700;
  text-shadow: 2px 2px 0px #000000;
  animation: twinkle 3s ease-in-out infinite alternate;
}

.star-1 {
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.star-2 {
  top: 25%;
  left: 85%;
  animation-delay: 0.5s;
}

.star-3 {
  top: 75%;
  left: 20%;
  animation-delay: 1s;
}

.star-4 {
  top: 80%;
  left: 80%;
  animation-delay: 1.5s;
}

.star-5 {
  top: 60%;
  left: 10%;
  animation-delay: 2s;
}

.star-6 {
  top: 35%;
  left: 90%;
  animation-delay: 2.5s;
}

@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.3); }
}

/* Minimal Mobile Responsiveness - Only for visibility */
@media (max-width: 768px) {
  .main-title {
    top: 20%;
  }
  
  /* Ensure characters don't get too large and cut off */
  .character-image {
    max-height: 70vh;
    max-width: 90vw;
    object-fit: contain;
  }
  
  /* Make sure buttons are visible and appropriately sized */
  .team-button {
    height: clamp(35px, 5vw, 60px);
    max-width: 80vw;
    object-fit: contain;
  }
  
  /* Ensure button containers don't get cut off */
  .team-button-container {
    margin: 1rem;
    margin-bottom: 2rem; /* Extra space at bottom to prevent cutoff */
  }
}

@media (max-width: 480px) {
  /* Further constraints for very small screens */
  .character-image {
    max-height: 45vh;
    /* max-width: 85vw; */
  }
  
  .team-button {
    height: clamp(30px, 4vw, 50px);
    margin: 0.8rem;
  }
}
</style>