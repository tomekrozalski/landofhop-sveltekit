<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';

	// export let details: Details;

	onMount(() => {
		// serverCall(fetch, Endpoints.beverageAdminDetails, {
		// 	pathParams: [details.id],
		// 	token
		// })
		// 	.then(({ editorial, updated }) => {
		// 		// setNotes(editorial?.notes ?? '');
		// 		// setUpdated(updated ?? null);
		// 		// setStatus(Status.resolved);
		// 	})
		// 	.catch(() => {
		// 		// setStatus(Status.rejected);
		// 	});
	});
</script>

<div>
	Notes
	<!-- <Markdown>{notes}</Markdown> -->
	<!-- {updated && (
    <dl style={{ color: 'var(--color-grey-1)' }}>
      <dt>
        <FormattedMessage id="admin.lastTimeUpdated" />
      </dt>
      <dd>
        {format(
          new Date(updated),
          locale === 'pl' ? 'dd.MM.yyyy' : 'dd/MM/yyyy',
        )}
      </dd>
    </dl>
  )} -->
</div>

<style>
</style>
