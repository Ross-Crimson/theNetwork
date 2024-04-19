<script setup>
import { Bonus } from '../models/Bonus.js';


defineProps({ bonus: { type: Bonus, required: true } })

</script>
<template>
    <section class="container">
        <div class="row">
            <div class="my-3">
                <img :src="bonus.tall" alt="" class="img-fluid">
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>