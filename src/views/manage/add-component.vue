<template>
  <div class="prooseInd">
    <div class="Pfrmd">
      <h2>Add Component</h2>
      <div class="tip">(*required field)</div>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-position="top"
      >
        <el-form-item label="ComponentName:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="description">
          <el-input
              type="textarea"
              :rows="4"
              :autosize="{ minRows: 4, maxRows: 4 }"
              v-model="ruleForm.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Websites (one per line):" prop="find">
          <el-input v-model="ruleForm.websites"></el-input>
        </el-form-item>
        <!--        <el-form-item label="lmage FilePath:" prop=" imagePath">-->
        <!--          <el-upload-->
        <!--            class="upload-demo"-->
        <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--            :on-preview="handlePreview"-->
        <!--            :on-remove="handleRemove"-->
        <!--            :before-remove="beforeRemove"-->
        <!--            multiple-->
        <!--            :limit="3"-->
        <!--            :on-exceed="handleExceed"-->
        <!--            :file-list="fileList"-->
        <!--          >-->
        <!--            <el-button size="small" type="primary">Click Upload</el-button>-->
        <!--            <div slot="tip" class="el-upload__tip">-->
        <!--              Only jpg/png files can be uploaded, and no more than 500kb-->
        <!--            </div>-->
        <!--          </el-upload>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="PDF FilePath:" prop=" pdfPath">-->
        <!--          <el-upload-->
        <!--            class="upload-demo"-->
        <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--            :on-preview="PDFhandlePreview"-->
        <!--            :on-remove="PDFhandleRemove"-->
        <!--            :before-remove="PDFbeforeRemove"-->
        <!--            multiple-->
        <!--            :limit="3"-->
        <!--            :on-exceed="PDFhandleExceed"-->
        <!--            :file-list="PDFfileList"-->
        <!--          >-->
        <!--            <el-button size="small" type="primary">Click Upload</el-button>-->
        <!--            <div slot="tip" class="el-upload__tip">-->
        <!--              Only PDF files can be uploaded, and no more than 5000kb-->
        <!--            </div>-->
        <!--          </el-upload>-->
        <!--        </el-form-item>-->
        <el-form-item label="Categony:" prop="Categony">
          <el-input
              v-model="ruleForm.categories"
              @focus="inputfocus"
          ></el-input>
        </el-form-item>
        <el-form-item label="Cupboard:" prop="Cupboard">
          <el-select v-model="Cupboardvalue" placeholder="Please enter">
            <el-option
                v-for="item in Cupboardoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Add UniquelD:">
          <div class="list">
            <el-table
                height="200"
                :data="ruleForm.identifies"
                style="width: 50%;margin-bottom: 10px;"
                :header-cell-style="headerCellStyle"
            >
              <el-table-column prop="id" label="componentId">
              </el-table-column>
              <el-table-column prop="status" label="status"></el-table-column>
            </el-table>
          </div>
          <el-input v-model="ruleForm.UniquelD" class="UniquelD"></el-input>
          <el-button type="primary" @click="addList">Add to list</el-button>
          <!--          <el-button type="success">Undo</el-button>-->
          <el-checkbox v-model="Uniqchecked" class="checkedC"
          >No unigue identifiers (e.g.: cables, PSUs)
          </el-checkbox
          >
        </el-form-item>
        <el-form-item label="Quantity:" prop="Quantity">
          <el-input v-model="ruleForm.qty"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit
          </el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
          title="Categony search"
          :visible.sync="dialogVisible"
          width="30%"
          class="elDiaCl"
          @close="handleClose"
      >
        <div class="categoneCl">
          <div class="sp1">Search item</div>
          <div class="sp2">
            <el-select v-model="selvalue" filterable placeholder="Please enter">
              <el-option
                  v-for="item in seloptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">cancel</el-button>
          <el-button type="primary" @click="handleSelected">OK</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'

export default {
  name: 'ProposeIndex',
  data() {
    return {
      Cupboardvalue: '',
      Uniqchecked: '',
      seloptions: [
        {
          value: 'o1',
          label: 'Alabama'
        },
        {
          value: 'o2',
          label: 'Alaska'
        },
        {
          value: 'o3',
          label: 'Arizona'
        }
      ],
      selvalue: [],
      sellist: [],
      selloading: false,
      selstates: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ],
      cataValue: '',
      cetaList: [
        {
          id: '1',
          name: 'All'
        },
        {
          id: '2',
          name: 'adafruit'
        },
        {
          id: '3',
          name: 'arduino'
        }
      ],
      iscate: false,
      dialogVisible: false,
      Cupboardoptions: [
        {
          value: '125',
          label: 'Cupboard'
        }
      ],
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      PDFfileList: [],
      list: [],
      ruleForm: {
        name: '',
        description: '',
        websites: '',
        imagePath: '',
        pdfPath: '',
        categories: '',
        // Cupboard: "",
        UniquelD: '',
        identifies: [],
        qty: '',
        id: 0,
        statusInfo: 1
      },
      rules: {
        name: [{ required: true, message: 'Please enter', trigger: 'blur' }],
        description: [
          { required: true, message: 'Please enter', trigger: 'blur' }
        ],
        categories: [
          { required: true, message: 'Please enter', trigger: 'blur' }
        ],
        UniquelD: [
          { required: true, message: 'Please enter', trigger: 'blur' }
        ]
      },
      LoacalArr: null
    }
  },
  mounted() {
  },
  methods: {
    headerCellStyle() {
      return { backgroundColor: '#2A323F', color: '#fff', padding: 0 }
    },
    handleSelected() {
      const category = this.seloptions.find((v) => v.value === this.selvalue)
      this.ruleForm.categories = category.label
      this.dialogVisible = false
    },
    insertContent(ruleForm) {
      api.insertContent(ruleForm).then((res) => {
        this.$message({
          message: 'Saved successfully',
          type: 'success'
        })
      })
          .catch(_ => {
            this.$message({
              message: 'Saved Failed',
              type: 'error'
            })
          })
    },
    handleClose() {
      this.dialogVisible = false
    },
    remoteMethod() {
      this.iscate = true
    },
    lifun(v) {
      console.log(v)
      this.cataValue = v.name
    },
    inputfocus() {
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    PDFhandleRemove(file, fileList) {
      console.log(file, fileList)
    },
    PDFhandlePreview(file) {
      console.log(file)
    },
    PDFhandleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      )
    },
    PDFbeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    addList() {
      this.ruleForm.identifies.push({ serialNumber: this.ruleForm.UniquelD, status: 'Available' })
      this.ruleForm.UniquelD = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 数据验证成功
        if (valid) {
          // 如果无数据
          if (!this.ruleForm) {
            return
          } else {
            // 有数据
            this.insertContent(this.ruleForm)
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
$Maincolor: #76b0e3;
$BGcolor: #b1d6f7;
$EmailColoe: #409eff;
$borderColor: #283240;
.prooseInd {
  height: 100%;
  padding: 20px 10px 20px 10px;
  border: 1px solid $borderColor;
  width: 1200px;

  h2 {
    text-align: left;
  }

  .Pfrmd {
    padding: 10px 20px;
    border-radius: 5px;

    .tip {
      font-size: 12px;
      margin: 10px 0;
      color: #ff0000;
    }

    .demo-ruleForm {
      :deep .el-form-item__content {
        &:last-child {
          // text-align: center;
        }
      }
    }

    :deep .UniquelD {
      width: 140px;
      margin-right: 15px;
    }

    :deep {
      .el-form-item__label {
        color: #000;
      }

      .checkedC {
        margin-left: 15px;
      }
    }
  }
}

.elDiaCl {
  height: 600px;

  :deep {
    .el-dialog__body {
      // height: 300px;
    }
  }

  .categoneCl {
    display: flex;
    align-items: center;
    height: 35px;
    padding: 0 0 100px 0;

    .sp1 {
      width: 100px;
    }

    .sp2 {
      width: 200px;
      // height: 20px;
      // border: 1px solid $borderColor;
    }
  }

  .cwlist {
    .cateli {
      background: $BGcolor;
      margin: 10px 0;
      padding: 10px;
      font-size: 18px;
    }
  }
}
</style>