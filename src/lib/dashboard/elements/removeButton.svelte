<script lang="ts">
	export let formData: any;
	export let fieldName: string;
	export let i: number;
	let { errors, form, touched } = formData;

	const remove = () => {
		$form[fieldName] = $form[fieldName].filter((_, j) => j !== i);
		$errors[fieldName] = $errors[fieldName].filter((_, j) => j !== i);
		$touched[fieldName] = $touched[fieldName].filter((_, j) => j !== i);
	};
</script>

<button type="button" on:click={remove}>-</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: var(--size-input-height);
		padding-bottom: 0.6rem;
		background-color: var(--color-danger-light);
		font-size: 2rem;
		color: var(--color-white);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	button:hover {
		background-color: var(--color-danger);
		color: var(--color-grey-3);
	}
</style>
