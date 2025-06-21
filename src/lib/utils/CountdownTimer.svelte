<script>
  import { onMount } from 'svelte';

  // Set the countdown target date: August 30, 2025, 7:00 PM CDT
  const countdownDate = new Date('2025-08-31T00:00:00Z'); // UTC equivalent of 7:00 PM CDT
  let countdownText = '';

  const updateCountdown = () => {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      countdownText = "The Draft is Live!";
    } else {
      countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  onMount(() => {
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);
    
    return () => clearInterval(interval); 
  });
</script>

<style>
  #countdown-timer {
    font-size: 2em;
    font-weight: bold;
    color: #f5a623;
    padding: 10px;
    background-color: #00316b;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    width: 100%;
  }
</style>

<div id="countdown-timer">
  {countdownText}
</div>
