<template>
    <div class="detail">
        <div class="container">
            <div class="left-content">
                <div class="title">{{ detailData.name }}</div>
                <p>
                    {{ detailData.detail }}
                </p>
            </div>
            <div class="right-info">
                <img class="right-img" :src="detailData.image">
                <div class="action">
                    <span>return date</span>
                    <el-date-picker value-format="yyyy-MM-dd" class="select-date" v-model="selectDate"
                        size="small"></el-date-picker>
                    <el-button type="primary" size="small" @click="addCart">Add to cart</el-button>
                </div>
            </div>
            <div class="website">
                <span class="ws-p">website</span> :dasdas
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            detailData: { name: '', detail: '', image: '' },
            selectDate: ''
        }
    },
    created() {
        const strDetail = localStorage.getItem('detail')
        this.detailData = JSON.parse(strDetail)
    },
    methods: {
        addCart() {
            if (!this.selectDate) {
                this.$message.error("Please select return date!")
                return
            }
            this.detailData.dueDate = this.selectDate
            let localCartList = localStorage.getItem('cart-list')
            localCartList = JSON.parse(localCartList)
            if (!this.localCartList) {
                this.localCartList = []
            }
            const findItem = this.localCartList.find(v => v.name === this.detailData.name)
            if (findItem) {
                findItem.quantity++
                findItem.dueDate = this.selectDate
            } else {
                this.localCartList.push(this.detailData)
            }
            localStorage.setItem('cart-list', JSON.stringify(this.localCartList))
            this.$message.success('Add cart success')
        }
    },
    beforeDestroy() {
        //sessionStorage.removeItem('detail')
    }
}
</script>
<style lang="scss" scope>
.detail {
    height: 100%;

    .container {
        padding: 10px 20px;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 10px;

        .left-content {
            .title {
                font-size: 22px;
            }
        }

        .right-info {

            .right-img {
                width: 100%;
                height: 90%;
            }

            .action {
                text-align: center;

                .select-date {
                    margin: 0 10px;
                }
            }


        }

        .website {
            grid-column-start: 1;
            grid-column-end: 3;

            .ws-p {
                font-size: 20px;
            }
        }
    }
}
</style>