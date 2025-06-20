<script>
	import { tabs } from '$lib/utils/tabs';
	import Tab, { Icon, Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import List, { Item, Graphic, Text, Separator } from '@smui/list';
	import { page } from '$app/state';
	import { goto, preloadData } from '$app/navigation';
	import { enableBlog, managers } from '$lib/utils/leagueInfo';

	let active = $state(
		tabs.find(tab =>
			tab.dest === page.url.pathname ||
			(tab.nest && tab.children.some(sub => sub.dest === page.url.pathname))
		)
	);

	let display = $state(false);
	let el = $state();
	let width = $state(0);
	let height = $state(0);
	let left = $state(0);

	let innerWidth = $state();
	$svelte.window.innerWidth = innerWidth;

	const open = () => {
		display = !display;
	};

	const subGoto = (dest) => {
		display = false;
		goto(dest);
	};

	let tabChildren = $state([]);
	for (const tab of tabs) {
		if (tab.nest) {
			tabChildren = tab.children;
		}
	}

	$effect(() => {
		if (el) {
			const rect = el.getBoundingClientRect();
			top = rect.top;
			left = rect.left;
			width = rect.width;
			height = rect.height;
		}
	});
</script>

<style>
	:global(.navBar) {
		display: inline-flex;
		position: relative;
		justify-content: center;
	}

	:global(.navBar .material-icons) {
		font-size: 1.8em;
		height: 25px;
		width: 22px;
	}

	.subMenu {
		position: absolute;
		z-index: 10;
		background-color: white;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
		border: 1px solid #ccc;
		border-top: none;
		overflow: hidden;
		transition: max-height 0.3s ease;
	}

	:global(.subText) {
		font-size: 0.9em;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 5;
		display: none;
	}
</style>

<!-- Overlay to close dropdown when clicking outside -->
<div class="overlay" style="display: {display ? 'block' : 'none'};" on:click={() => display = false}></div>

<div class="parent">
	<TabBar class="navBar" {tabs} key={tab => tab.key} bind:active>
		{#each tabs as tab}
			{#if tab.nest}
				<div bind:this={el}>
					<Tab minWidth on:click={open}>
						<Icon class="material-icons">{tab.icon}</Icon>
						<Label>{tab.label}</Label>
					</Tab>
				</div>
			{:else}
				{#if tab.label !== 'Blog' || enableBlog}
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
			{/if}
		{/each}
	</TabBar>

	<!-- Submenu dropdown -->
	<div
		class="subMenu"
		style="
			display: {display ? 'block' : 'none'};
			width: {width}px;
			top: {height}px;
			left: {left}px;
		"
	>
		<List>
			{#each tabChildren as subTab, ix}
				{#if subTab.label === 'Managers' && !managers.length}
					<!-- Don't show Managers if empty -->
				{:else if subTab.label === 'League Rules' || subTab.label === 'Go to Sleeper'}
					<Item style="padding: 0;">
						<a
							href={subTab.dest}
							target="_blank"
							rel="noopener noreferrer"
							style="display: flex; align-items: center; padding: 12px 16px; width: 100%; text-decoration: none; color: inherit;"
						>
							<span class="material-icons">{subTab.icon}</span>
							<span class="subText">{subTab.label}</span>
						</a>
					</Item>
				{:else}
					<Item
						on:click={() => subGoto(subTab.dest)}
						on:touchstart={() => preloadData(subTab.dest)}
						on:mouseover={() => preloadData(subTab.dest)}
					>
						<Graphic class="material-icons">{subTab.icon}</Graphic>
						<Text class="subText">{subTab.label}</Text>
					</Item>
				{/if}
				{#if ix < tabChildren.length - 1}
					<Separator />
				{/if}
			{/each}
		</List>
	</div>
</div>
