<template>
  <el-dialog
      class="admin-dialog"
      width="1000px"
      top="6vh"
      center
      :visible.sync="dVisible"
      @close="handleAdminClose"
  >
    <div slot="title">
      <span class="edit-title" contenteditable="true">
        {{ adminDetailData.name }}
      </span>
    </div>
    <div class="note">
      <span class="el-icon-warning"></span>
      Please note you can edit all the bordered areas on this page if you hover
      over and click on the highlighted fields. All the changes will be saved to
      the database once you will press the Save button ff you need to add a new
      category. please separate these by comma. In the websites area. you can
      Ctrl + LeftClick or RightClick to follow link instead of editing it.
    </div>
    <el-form
        ref="adminDetailForm"
        :model="adminDetailData"
        class="edit-form"
        label-width="120px"
    >
      <el-form-item class="detail-item">
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-model="adminDetailData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Available:">
        <el-input
            style="width: 100px"
            v-model="adminDetailData.available"
        ></el-input>
        <span class="at">/</span>
        <el-input
            style="width: 100px"
            v-model="adminDetailData.total"
        ></el-input>
      </el-form-item>
      <el-form-item label="categories:">
        <el-input
            style="width: 300px"
            v-model="adminDetailData.categories"
        ></el-input>
        <span class="cs">(comma separateed)</span>
      </el-form-item>
      <el-form-item label="Websites:">
        <el-input
            style="width: 300px"
            v-model="adminDetailData.websites"
        ></el-input>
      </el-form-item>
      <!--      <el-form-item label="Image file path:">-->
      <!--        <el-input-->
      <!--          style="width: 300px"-->
      <!--          v-model="adminDetailData.imagePath"-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="Identifies:">
        <el-table
            :data="adminDetailData.identifies"
            style="width: 100%"
            :header-cell-style="headerCellStyle"
        >
          <el-table-column prop="uniqueID" label="uniqueID">
          </el-table-column>
          <el-table-column prop="statusEn" label="status"></el-table-column>
          <el-table-column label="operate">
            <template slot-scope="scope">
              <!--              <el-button-->
              <!--                @click="handleEditClick(scope.row)"-->
              <!--                type="warning"-->
              <!--                size="small"-->
              <!--                >edit</el-button-->
              <!--              >-->
              <el-button
                  type="danger"
                  size="small"
                  @click="handleRemoveClick(scope.row)"
              >remove
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="New UniqueID:">
        <el-input style="width: 180px" v-model="componentId"></el-input>
        <el-button
            style="margin-left: 20px"
            type="primary"
            @click="handleAddUniqueID(componentId)"
        >Add
        </el-button
        >
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="goSave">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from '@/api/index'

export default {
  name: 'ComponentDialog',
  props: {
    cVisible: false,
    cData: {
      type: Object,
      default() {
        return { fileList: [], pdfFilePath: '', identifies: [], total: 0 }
      }
    }
  },
  data() {
    return {
      adminDlgVisible: false,
      componentId: ''
    }
  },
  computed: {
    dVisible: {
      get() {
        return this.cVisible
      },
      set(val) {
        this.$emit('update:cVisible', val)
      }
    },
    adminDetailData() {
      return this.cData
    }
  },
  mounted() {
    //   this.getPageData();
  },
  methods: {
    goSave() {
      this.getUpdate(this.adminDetailData)
      this.dVisible = false
    },
    getUpdate(adminDetailData) {
      api.updateContent(adminDetailData).then((res) => {
        this.$message.success('update succcess')
        this.$emit('save')
      })
    },
    insertInventory(data) {
      api.insertInventory(data).then((res) => {
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `limit 1 file but you selected ${files.length} files`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Are you sure remove ${file.name}？`)
    },
    headerCellStyle() {
      return { backgroundColor: '#2A323F', color: '#fff', padding: 0 }
    },
    handleEditClick() {
    },
    handleRemoveClick({ uniqueID }) {
      this.$confirm('Are you sure to remove this item?', 'warning', {
        type: 'warning'
      })
          .then((_) => {
            const idIndex = this.adminDetailData.identifies.findIndex(
                (v) => v.uniqueID === uniqueID
            )
            this.adminDetailData.identifies.splice(idIndex, 1)
            this.adminDetailData.available = +this.adminDetailData.available - 1
            this.adminDetailData.total = +this.adminDetailData.total - 1
          })
          .catch((_) => {
            console.log('cancel')
          })
    },
    handleAddUniqueID(componentId) {
      // let data = {
      //   componentName: "string",
      //   createtime: "2023-03-22T11:19:03.759Z",
      //   serialNumber: "string",
      //   statusInfo: 0,
      //   updatetime: "2023-03-22T11:19:03.759Z",
      // };
      // data.componentId = componentId;
      // this.insertInventory(data);
      if (!this.componentId.trim()) {
        this.$message.error('UniqueID can not be empty!')
        return
      }
      this.adminDetailData.identifies.push({
        uniqueID: this.componentId,
        serialNumber: this.componentId,
        status: 1,
        statusEn: 'Available'
      })
      this.adminDetailData.available = +this.adminDetailData.available + 1
      this.adminDetailData.total = +this.adminDetailData.total + 1
      this.componentId = ''
    },

    handleAdminClose() {
      this.$emit('update:cVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-dialog {
  :deep .el-dialog {
    height: 770px;
    overflow: hidden;

    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 0;
      margin: 10px 0;
    }
  }

  .edit-title {
    padding: 5px;
    border: 1px dashed #2a323f;
    border-radius: 5px;
  }

  .note {
    padding: 5px;
    font-size: 14px;
    font-weight: bold;

    :deep .el-icon-warning {
      color: orange;
    }
  }

  .edit-form {
    margin-top: 10px;
    padding: 10px 15px;
    border: 1px solid #283240;
    height: 540px;
    overflow: auto;

    .at {
      margin: 0 20px;
      font-size: 20px;
    }

    .cs {
      color: orange;
      padding-left: 10px;
    }

    .detail-item {
      :deep .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>