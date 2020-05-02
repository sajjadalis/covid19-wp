<template>
    <div>
        <h1>CSV</h1>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    methods: {
        novelData() {
            axios.get("https://corona.lmao.ninja/v2/all")
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.novelData();

    }
}
</script>