<template>
    <div> 
        <Navbar />
        <div class="flex"> 
            <Sidebar />
            <div class="overflow-y-auto w-full m-16 mr-0 md:ml-64">
                <slot />
            </div>
            
        </div>
        
    </div>
</template>