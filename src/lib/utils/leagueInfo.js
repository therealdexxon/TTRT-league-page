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
  import CountdownTimer from './CountdownTimer.svelte'; // Adjust the path if needed
</script>

<div>
  <h1>Welcome to the {leagueName}!</h1>
  <p>League Info, Rules, previous draft results, and more available here!</p>
  <p>Draft Date and time is TBD - Check back soon!</p>

  <!-- Insert the countdown timer here -->
  <CountdownTimer />
</div>

