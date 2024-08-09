<script>
  import "./style.css";
  import { onMount } from "svelte";
  import { initializeApp } from "./app_init";

  import Router from "svelte-spa-router";
  import routes from "./routes";

  onMount(() => {
    initializeApp();
  });
</script>

<main>
  <Router {routes} />
</main>
