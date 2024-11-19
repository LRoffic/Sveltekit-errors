<script>
    export let type, color;

    if((color === null || color === undefined) && type != null){
        if(type == "danger" || type == "error")
            color = "bg-red-500";
        if(type == "warning")
            color = "bg-yellow-500";
        if(type == "info")
            color = "bg-blue-500";
        if(type == "Neutral")
            color = "bg-gray-500";
        if(type == "success")
            color = "bg-green-500";
    } else if(color == null && type == null){
        color = "bg-green-500";
    }
    
</script>

<div class="px-6 py-5 mb-4 text-base text-white {color} rounded w-full" role="alert">
    <slot></slot>
</div>