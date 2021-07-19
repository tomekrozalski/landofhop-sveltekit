<script>
  import "../app.postcss";
  import Header from '$lib/header.svelte'
</script>

<nav>
  <Header />
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
<slot />
