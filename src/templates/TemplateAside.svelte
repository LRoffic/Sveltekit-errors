<script>
    import Aside from "$components/Aside.svelte";
</script>
<div class="px-8 pt-6 mt-16 text-white">
    <div class="lg:grid-cols-8 sm:grid-cols-1 grid gap-8">
        <Aside />
        <div class="lg:col-span-6 md:col-span-full sm:col-span-full lg:order-first">
            <slot></slot>
        </div>
    </div>
</div>