<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>
<div class="flex-col w-screen overflow-clip bg-slate-800 text-white min-h-screen">
    <div>
        <div class="text-white bg-cover header" style="background-image: url('{data.profile.banner}');">
            <div class="flex p-6 pb-10 pt-16 gap-3 items-center">
                <img src={data.profile.avatar} class="avatar w-20 rounded-xl" alt="avatar">
                <div class="flex flex-col -gap-2 text-shadow">
                    <span class="text-2xl font-semibold">{data.profile.displayName}</span>
                    <span class="text-gray-400">@{data.profile.handle}</span>
                </div>
            </div>
            
        </div>
    </div>

    <div class="rounded-xl bg-slate-800 h-10 text-white -translate-y-5 mx-6 -py-5 transform-gpu p-2 w-fit flex gap-2 button">
        <span class="">
            📤 {data.profile.followersCount}
        </span>
        <span class="">
            📥 {data.profile.followsCount}
        </span>
        <span class="">
            📝 {data.profile.postsCount}
        </span>
    </div>

    <div class="px-6 -my-5 pb-4 flex flex-col gap-2">
        
        
        <div class=" whitespace-pre-line">
            {data.profile.description}
        </div>

        <div class="">
            {#await data.pinned then pin}
                {#if pin}
                    pinned post: {pin.thread.post.cid}
                {/if}
            {/await }
        </div>
    </div>

</div>


<style>
    .text-shadow {
        filter: drop-shadow(1px 1px rgb(0 0 0 / 0.69));
    }

    .avatar {
        border: solid rgba(255,255,255,0.22);
    }
</style>
