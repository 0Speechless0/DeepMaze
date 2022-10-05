<script setup>
    import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <RouterLink to="./mazeCreate" class="btn btn-outline-success m-2"> 建立迷宮</RouterLink>
            <RouterLink to="./mazeInter" class="btn btn-outline-success m-2"> 遊玩迷宮</RouterLink>

            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Pricing</a>
            <a class="nav-link disabled">Disabled</a> -->
        </div>
        </div>
    </div>
    </nav>

    <RouterView/>

</template>

<style scoped>


</style>


    