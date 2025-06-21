/*   STEP 1   */
export const leagueID = "1179271510066319360"; // your league ID
export const leagueName = "Welcome to the TTRT fantasy football league!"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

export const homepageText = `
  <p>League Info, Rules, previous draft results, and more available here!</p>
  <p>Draft Date and time is TBD - Check back soon!</p>
`;

/*   STEP 3   */
//add a timer for the draft 
<script>
  import { onMount } from 'svelte';

  // Set the countdown target date: August 30, 2025, 7:00 PM CDT
  const countdownDate = new Date('2025-08-31T00:00:00Z'); // This is the UTC time equivalent of 7:00 PM CDT on August 30, 2025
  let countdownText = '';

  const updateCountdown = () => {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    // Time calculations
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
    // Update countdown every second
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup when the component is removed
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

<!-- Countdown Timer Display -->
<div id="countdown-timer">
  {countdownText}
</div>
