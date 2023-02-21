<template>
    <div class="card-container" @click="emitDetail(info)">
        <img class="card-img" :src="info.image" alt="">
        <div class="card-name">
            {{ info.name }}
        </div>
        <div class="card-available">
            <span class="label">available:</span>
            <span class="count">{{ info.available }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        info: {
            type: Object,
            default() {
                return {
                    image: '',
                    name: '',
                    available: 0
                }
            }
        }

    },
    methods: {
        emitDetail(data) {
            this.$emit('show', data);
        }
    }
}
</script>
<style lang="scss" scoped>
.card-container {
    cursor: pointer;
    width: 200px;
    height: 245px;
    display: grid;
    grid-template-rows: 1fr auto auto;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #e3e3e3;
    border-radius: 12px;
    padding: 6px 6px 18px;

    &:hover {
        border-color: #098556;
    }

    .card-img {
        width: 195px;
        height: auto;
    }

    .card-name {
        color: #333;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10px;
    }

    .card-available {
        display: flex;
        justify-content: flex-start;

        .label {
            align-self: flex-end;
            color: #666;
            font-size: 14px;
            font-weight: 400;
            white-space: nowrap;
            margin-right: 10px;
        }

        .count {
            color: #098556;
            font-size: 18px;
            font-weight: 500;
            margin-left: 5px;
            white-space: nowrap;
        }
    }
}
</style>