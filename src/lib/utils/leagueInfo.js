/*   STEP 1   */
export const leagueID = "1179271510066319360"; // your league ID
export const leagueName = "Welcome to the TTRT fantasy football league!"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

export const homepageText = `
  <p>League Info, Rules, previous draft results, and more available here!</p>
  <p>Draft Date and time is TBD - Check back soon!</p>
  <div id="countdown-timer"></div>
  <script>
    const countdownDate = new Date('2025-08-31T00:00:00Z');
    let countdownText = document.getElementById('countdown-timer');

    const updateCountdown = () => {
      let now = new Date().getTime();
      let distance = countdownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        countdownText.innerHTML = "The Draft is Live!";
      } else {
        countdownText.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    };

    setInterval(updateCountdown, 1000);
  </script>
`;
