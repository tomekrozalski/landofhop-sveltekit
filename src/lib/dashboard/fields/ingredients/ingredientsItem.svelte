<script lang="ts">
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Button from './actionButton.svelte';
	import Header from './itemHeader.svelte';

	export let i: number;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField } = formData;

	function addNewRow() {
		updateField(`ingredients[${i}].list`, $form.ingredients[i].list.concat(''));
		$errors.ingredients[i].list = $errors.ingredients?.[i]?.list?.concat('') ?? [''];
		$touched.ingredients[i].list = $touched.ingredients?.[i].list?.concat(false) ?? [false];
	}

	function removeRow(j: number) {
		return function () {
			$errors.ingredients[i].list[j] = '';
			$touched.ingredients[i].list[j] = false;
			updateField(
				`ingredients[${i}].list`,
				$form.ingredients[i].list.filter((_, k) => j !== k)
			);
		};
	}
</script>

<div>
	<Header language={$form.ingredients[i].language} />
	<ul>
		{#each $form.ingredients[i].list as _, j}
			<li>
				<TextInput
					errors={$errors.ingredients?.[i]?.list?.[j]}
					fieldName={`ingredients[${i}].list[${j}]`}
					focusOnMount={j === $form.ingredients[i].list.length - 1}
					{handleChange}
					isTouched={$touched.ingredients?.[i]?.list?.[j]}
					onEnter={j === $form.ingredients[i].list.length - 1 ? addNewRow : null}
					value={$form.ingredients[i].list[j]}
				/>
				{#if j !== 0}
					<Button isRemove onClick={removeRow(j)} />
				{/if}
			</li>
		{/each}
	</ul>
	<Button isAdd onClick={addNewRow} />
</div>

<style>
	div {
		grid-column: 2/3;
	}

	li {
		display: flex;
		margin-bottom: 1rem;
	}
</style>
