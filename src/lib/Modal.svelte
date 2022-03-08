<script>
	import { fade, blur } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	export let open = false;
	const dispatch = createEventDispatcher();
</script>

{#if open}
	<div
		transition:fade={{ duration: 150, easing: sineInOut }}
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
	>
		<div class="modal-overlay fixed w-full h-full bg-black opacity-50" />
		<div class="bg-dark w-full lg:h-max lg:w-1/2 mx-auto rounded-md shadow-xl z-50 overflow-y-auto">
			<div class="content p-8 flex justify-center items-center flex-col">
				<slot name="body" />
				<button
					class="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full mt-6"
					on:click={() => dispatch('close')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 0 24 24"
						width="20px"
						fill="#000000"
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
{/if}
