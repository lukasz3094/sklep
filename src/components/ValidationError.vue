<template>
    <div v-if="show" class="text-danger p-1">
        <div v-for="m in messages" v-bind:key="m">{{ m }}</div>
    </div>
</template>
<script>
export default {
    props: ["validation"],
    computed: {
        show() {
            return this.validation.$dirty && this.validation.$invalid
        },
        messages() {
            let messages = []
            if (this.validation.$dirty) {
                if (this.hasValidationError("required")) {
                    messages.push("Proszę wprowadzić wartość")
                } else if (this.hasValidationError("email")) {
                    messages.push("Proszę wprowadzić prawidłowy adres e-mail")
                }
            }
            return messages
        }
    },
    methods: {
        hasValidationError(type) {
            return this.validation.$silentErrors[0].$params["type"] === type
        }
    }
}
</script>