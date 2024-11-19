<script>
	import Image00 from "$lib/images/rating/00.png";
	import Image05 from "$lib/images/rating/05.png";
	import Image10 from "$lib/images/rating/10.png";
	import Image15 from "$lib/images/rating/15.png";
	import Image20 from "$lib/images/rating/20.png";
	import Image25 from "$lib/images/rating/25.png";
	import Image30 from "$lib/images/rating/30.png";
	import Image35 from "$lib/images/rating/35.png";
	import Image40 from "$lib/images/rating/40.png";
	import Image45 from "$lib/images/rating/45.png";
	import Image50 from "$lib/images/rating/50.png";

    export let note
    export let w = "100%"
</script>

{#if !note || note == 0}
    <img src="{Image00}" alt="00" style="width: {w}" />
{:else if note == 0.5}
    <img src="{Image05}" alt="0.5" style="width: {w}" />
{:else if note == 1.0}
    <img src="{Image10}" alt="1.0" style="width: {w}" />
{:else if note == 1.5}
    <img src="{Image15}" alt="1.5" style="width: {w}" />
{:else if note == 2.0}
    <img src="{Image20}" alt="2.0" style="width: {w}" />
{:else if note == 2.5}
    <img src="{Image25}" alt="2.5" style="width: {w}" />
{:else if note == 3.0}
    <img src="{Image30}" alt="3.0" style="width: {w}" />
{:else if note == 3.5}
    <img src="{Image35}" alt="3.5" style="width: {w}" />
{:else if note == 4.0}
    <img src="{Image40}" alt="4.0" style="width: {w}" />
{:else if note == 4.5}
    <img src="{Image45}" alt="4.5" style="width: {w}" />
{:else if note == 5.0}
    <img src="{Image50}" alt="5.0" style="width: {w}" />
{/if}