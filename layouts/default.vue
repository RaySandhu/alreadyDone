<template>
    <div> 
        <Navbar />
        <div class="flex"> 
            <Sidebar />
            <div class="overflow-y-auto mt-16">
                <slot />
            </div>
            
        </div>
        
    </div>
</template>