<script>
  import { tabs } from '$lib/utils/tabs';
  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import List, { Item, Graphic, Text, Separator } from '@smui/list';
  import { page } from '$app/stores';
  import { goto, preloadData } from '$app/navigation';
  import { enableBlog, managers } from '$lib/utils/leagueInfo';

  // Track active page
  $: activePath = $page.url.pathname;

  // Identify the parent tab for current path
  $: activeTab = tabs.find(tab =>
    tab.dest === activePath ||
    (tab.nest && tab.children.some(child => child.dest === activePath))
  );

  let showDropdown = false;
  let triggerEl;

  // Dropdown positioning
  let dropdownStyle = "";

  // Get all sub-items
  $: subItems = activeTab?.nest ? activeTab.children : [];

  // Toggle dropdown display and recalc positioning
  function toggleDropdown() {
    showDropdown = !showDropdown;
    if (showDropdown && triggerEl) {
      const rect = triggerEl.getBoundingClientRect();
      dropdownStyle = `
        position: absolute;
        top: ${rect.bottom + window.scrollY}px;
        left: ${rect.left + window.scrollX}px;
        width: ${rect.width}px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 1000;
      `;
    }
  }

  // Navigate on submenu click
  function handleSubClick(item) {
    showDropdown = false;
    if (item.dest.startsWith("http")) {
      window.open(item.dest, "_blank", "noopener");
    } else {
      goto(item.dest);
    }
  }
</script>

<svelte:window on:click="{() => showDropdown = false}" />

<style>
  .navBar {
    display: flex;
    justify-content: center;
  }
  .submenu-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
  .submenu-item:hover {
    background: #f0f0f0;
  }
</style>

<TabBar class="navBar" bind:active={activeTab}>
  {#each tabs as tab}
    {#if tab.nest}
      <div bind:this={triggerEl}>
        <Tab on:click={toggleDropdown} minWidth>
          <Icon class="material-icons">{tab.icon}</Icon>
          <Label>{tab.label}</Label>
        </Tab>
      </div>
    {:else if tab.label !== 'Blog' || enableBlog}
      <Tab
        href={tab.dest}
        minWidth
        on:touchstart={() => preloadData(tab.dest)}
        on:mouseover={() => preloadData(tab.dest)}
      >
        <Icon class="material-icons">{tab.icon}</Icon>
        <Label>{tab.label}</Label>
      </Tab>
    {/if}
  {/each}
</TabBar>

{#if showDropdown && subItems.length}
  <div style={dropdownStyle} on:click|stopPropagation>
    <List>
      {#each subItems as sub, idx}
        {#if sub.label === 'Managers' && managers.length === 0}
          <!-- skip empty managers -->
        {:else}
          <Item on:click={() => handleSubClick(sub)}>
            <Graphic class="material-icons">{sub.icon}</Graphic>
            <Text>{sub.label}</Text>
          </Item>
        {/if}
        {#if idx < subItems.length - 1}
          <Separator />
        {/if}
      {/each}
    </List>
  </div>
{/if}
