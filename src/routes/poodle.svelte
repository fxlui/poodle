<script lang="ts">
	export let title = 'Poodle';
	import Header from '$lib/Header.svelte';
	import Timer from '$lib/Timer.svelte';
	import sha1 from 'sha1';
	import { browser } from '$app/env';

	let changed = false;
	let check = [false, false, false, false, false, false];
	const handleChange = (e: Event, length: number) => {
		changed = true;
		let i = 0;
		for (i = 0; i < 6; i++) {
			if (i <= length) check[i] = true;
			else check[i] = false;
		}
	};

	const today = new Date();
	const length = today.getDate() + today.getMonth() + 1 + today.getFullYear();
	const tempresult = sha1(length.toString()).replace(/\D/g, '');
	let result = tempresult.replace(/0/g, '1')[0] % 6;
	result = result === 0 ? 1 : result;

	let currentTry = 0;
	let try1 = undefined;
	let try2 = undefined;
	let try3 = undefined;
	let guessed = false;
	if (browser) {
		if (
			localStorage.getItem('poodleStatus') &&
			localStorage.getItem('lastPoodle') &&
			localStorage.getItem('lastPoodle') === length.toString()
		) {
			if (!localStorage.getItem('bugFix1Applied') && length === 2044) {
				localStorage.removeItem('poodleStatus');
				localStorage.setItem('lastPoodle', '2043');
				const totalPoodle = localStorage.getItem('totalPoodle');
				const maxPoodleStreaks = localStorage.getItem('maxPoodleStreaks');
				localStorage.setItem('totalPoodle', (parseInt(totalPoodle) - 1).toString());
				localStorage.setItem('currentPoodleStreaks', parseInt(maxPoodleStreaks).toString());
				localStorage.setItem('bugFix1Applied', 'true');
			}
			if (localStorage.getItem('poodleStatus') === 'win') {
				guessed = true;
				for (let i = 0; i < result; i++) check[i] = true;
			}
			currentTry = localStorage.getItem('poodleStatus') === 'lose' ? 3 : 0;
		}
	}
	// read local storage here

	const poop = () => {
		const sum = check.reduce(
			(previousValue, currentValue) => previousValue + (currentValue ? 1 : 0),
			0
		);

		if (sum === result) {
			guessed = true;
			if (browser) {
				const totalPoodle = localStorage.getItem('totalPoodle');
				const totalPoodleWins = localStorage.getItem('totalPoodleWins');
				const currentPoodleStreaks = localStorage.getItem('currentPoodleStreaks');
				const maxPoodleStreaks = localStorage.getItem('maxPoodleStreaks');
				const totalPoodleObj = localStorage.getItem('totalPoodleObj');
				localStorage.setItem('lastPoodleTries', (currentTry + 1).toString());

				if (!totalPoodleObj) {
					const newObj = {
						1: currentTry === 0 ? 1 : 0,
						2: currentTry === 1 ? 1 : 0,
						3: currentTry === 2 ? 1 : 0
					};
					localStorage.setItem('totalPoodleObj', JSON.stringify(newObj));
				} else {
					let old = JSON.parse(totalPoodleObj);
					old[currentTry + 1] = old[currentTry + 1] + 1;
					localStorage.setItem('totalPoodleObj', JSON.stringify(old));
				}

				if (!totalPoodle) {
					localStorage.setItem('totalPoodle', '1');
				} else {
					localStorage.setItem('totalPoodle', (parseInt(totalPoodle) + 1).toString());
				}

				if (!totalPoodleWins) {
					localStorage.setItem('totalPoodleWins', '1');
				} else {
					localStorage.setItem('totalPoodleWins', (parseInt(totalPoodleWins) + 1).toString());
				}

				if (!currentPoodleStreaks) {
					localStorage.setItem('currentPoodleStreaks', '1');
				} else {
					localStorage.setItem(
						'currentPoodleStreaks',
						(parseInt(currentPoodleStreaks) + 1).toString()
					);
				}

				if (!maxPoodleStreaks) {
					localStorage.setItem('maxPoodleStreaks', '1');
				} else {
					localStorage.setItem('maxPoodleStreaks', (parseInt(maxPoodleStreaks) + 1).toString());
				}
				localStorage.setItem('poodleStatus', 'win');
				localStorage.setItem('lastPoodle', length.toString());
			}
			return;
		}

		changed = false;
		check = [false, false, false, false, false, false];

		switch (currentTry) {
			case 0:
				try1 = sum;
				break;
			case 1:
				try2 = sum;
				break;
			case 2:
				try3 = sum;
				break;
			default:
				break;
		}
		currentTry++;

		if (currentTry === 3 && !guessed && browser) {
			const totalPoodle = localStorage.getItem('totalPoodle');
			if (!totalPoodle) {
				localStorage.setItem('totalPoodle', '1');
			} else {
				localStorage.setItem('totalPoodle', (parseInt(totalPoodle) + 1).toString());
			}
			localStorage.setItem('currentPoodleStreaks', '1');
			localStorage.setItem('poodleStatus', 'lose');
			localStorage.setItem('lastPoodle', length.toString());
			localStorage.setItem('lastPoodleTries', '0');
		}
	};

	const share = () => {
		if (browser) {
			const lastPoodleTries = localStorage.getItem('lastPoodleTries')
				? parseInt(localStorage.getItem('lastPoodleTries'))
				: 0;
			console.log(lastPoodleTries);
			const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
			const shareString = `${title} #${length - 2032}

${
	lastPoodleTries === 0 ? '🚽🚽🚽' : '💩'.repeat(lastPoodleTries) + '🚽'.repeat(3 - lastPoodleTries)
}

https://ihate.games/${title.toLowerCase()}`;
			if (isMobile) {
				navigator.share({
					text: shareString
				});
			} else {
				navigator.clipboard.writeText(shareString);
				alert('Copied to clipboard.');
			}
		}
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta
		property="og:description"
		content="Guess the {title} (length of poop) in 3 tries. New {title} available every day!"
	/>
	<meta property="og:image" content="/buttocks.png" />
</svelte:head>

<div class="h-screen-ios h-screen flex flex-col">
	<Header {title} />
	<div class="flex-1 poodle flex flex-col justify-center items-center">
		<img class="w-24" src="buttocks.png" alt="butt" />
		<div class="mt-4 flex space-x-10">
			{#if try1}
				<div class="space-y-1 flex flex-col">
					{#each check as value, i}
						<div class="pastblock{i}">
							<input
								type="checkbox"
								class="pastblock opacity-0 absolute h-10 w-10 {try1 < result ? 'cold' : 'hot'}"
								checked={i < try1}
								disabled
							/>
							<div
								class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
							/>
						</div>
					{/each}
				</div>
			{/if}
			{#if currentTry < 3 || guessed}
				<div class="space-y-1 flex flex-col">
					{#each check as value, i}
						<div class="poopblock{i}">
							<input
								type="checkbox"
								class="poopblock opacity-0 absolute h-10 w-10"
								bind:checked={value}
								on:change={(e) => handleChange(e, i)}
								disabled={guessed}
							/>
							<div
								class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
							>
								<p class="poop hidden pointer-events-none text-2xl">💩</p>
							</div>
						</div>
					{/each}
				</div>
			{:else if try3 && !guessed}
				<div class="space-y-1 flex flex-col">
					{#each check as value, i}
						<div class="pastblock{i}">
							<input
								type="checkbox"
								class="pastblock opacity-0 absolute h-10 w-10 {try3 < result ? 'cold' : 'hot'}"
								checked={i < try3}
								disabled
							/>
							<div
								class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
							/>
						</div>
					{/each}
				</div>
			{/if}
			{#if try1 && !try2}
				<div class="h-10 w-10" />
			{/if}
			{#if try2}
				<div class="space-y-1 flex flex-col">
					{#each check as value, i}
						<div class="pastblock{i}">
							<input
								type="checkbox"
								class="pastblock opacity-0 absolute h-10 w-10 {try2 < result ? 'cold' : 'hot'}"
								checked={i < try2}
								disabled
							/>
							<div
								class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		{#if guessed}
			<p class="mt-8 font-bold text-xl">
				{#if result > 4}
					wow!
				{:else if result > 1}
					good job!
				{:else}
					nice.
				{/if}
			</p>
			<Timer />
			<p class="mt-2">till next {title}</p>
			<button
				class="p-4 font-bold bg-amber-400 hover:scale-110 transition-all text-black rounded-md mt-10"
				on:click={share}>Share</button
			>
		{:else if currentTry === 3 && !guessed}
			<p class="mt-8 font-bold text-xl">better luck tomorrow!</p>
			<Timer />
			<p class="mt-2">till next {title}</p>
			<button
				class="p-4 font-bold bg-amber-400 hover:scale-110 transition-all text-black rounded-md mt-10"
				on:click={share}>Share</button
			>
		{:else}
			<button
				class="p-4 disabled:hover:scale-100 disabled:hover:opacity-70 disabled:bg-neutral-500 disabled:text-white disabled:font-normal font-bold bg-amber-400 hover:scale-110 transition-all text-black rounded-md mt-10"
				disabled={!changed}
				on:click={poop}>Poop</button
			>
		{/if}
	</div>
</div>
