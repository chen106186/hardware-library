<template>
  <div class="bookings">
    <div class="list">
      <h3>Past Bookings</h3>
      <div class="search">
        <el-input
          placeholder="Search by Component"
          v-model="searchTxt"
        ></el-input>
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </div>
      <div class="tips">
        Below you can see the most recent 20 past bookings or all the bookings
        for a person,component or identifier.
      </div>
      <el-table
        class="bookings-table"
        border
        :data="tableData"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column label="Full Name" prop="fullName"></el-table-column>
        <el-table-column
          label="School"
          prop="school"
          width="80"
        ></el-table-column>
        <el-table-column
          label="Component Name"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="component" @click="handleEditComponent(scope.row)">{{
              scope.row.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="UniqueID" prop="uniqueID"></el-table-column>
        <el-table-column label="Due Date" prop="dueDate"></el-table-column>
        <el-table-column
          label="Return Date"
          prop="returnDate"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import table from "@/mixins/table";
import api from "@/api/index";
export default {
  name: "past-bookings",
  data() {
    return {
      searchTxt: "",
      oriTableData: [],
      tableData: [],
      insertDlgVisible: false,
      insertForm: { personId: "", component: "", uniqueID: "", dueDate: "" },
      width: "300px",
      idList: [],
      componentList: [],
      rules: {
        personId: {
          required: true,
          message: "This field should be a 7 or 8 digit number",
          trigger: "blur",
        },
        component: {
          required: true,
          message: "A component should be selected",
          trigger: "change",
        },
        uniqueID: {
          required: true,
          message: "An identifier should be selected",
          trigger: "change",
        },
        dueDate: {
          required: true,
          message: "A date should be selected",
          trigger: "blur",
        },
      },
      mailDlgVisible: false,
      isMailAll: false,
      mailItem: "late items",
      mailName: "",
    };
  },
  mixins: [table],
  mounted() {
    this.tableData = JSON.parse(JSON.stringify(this.oriTableData));
    this.idList = this.oriTableData.map((m) => m.uniqueID);
    this.componentList = this.oriTableData.map((m) => m.name);
    this.getPageData();
    this.getfindList();
  },
  methods: {
    getPageData() {
      this.getfindList();
    },
    getfindList() {
      let params = {
        name: this.searchTxt,
      };
      api.findList(params).then((res) => {
        this.oriTableData = res.map((it) => {
          return {
            fullName: it.userName,
            school: it.userSchool,
            name: it.componentName,
            uniqueID: it.componentId,
            dueDate: it.dueDate,
            info: it.statusInfo,
          };
        });
        this.tableData = this.oriTableData;
      });
    },
    handleSearch() {
      this.getfindList();
      const tableData = JSON.parse(JSON.stringify(this.oriTableData));
      const txt = this.searchTxt.trim();
      this.tableData = tableData.filter(
        (v) =>
          v.fullName.includes(txt) ||
          v.uniqueID.includes(txt) ||
          v.name.includes(txt)
      );
    },
    handleEditComponent() {},
  },
};
</script>

<style lang="scss" scoped>
.bookings {
  height: 100%;
  width: 1200px;

  .list {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #f3f3f3;
    overflow: auto;

    .search {
      display: flex;
      margin-bottom: 20px;

      .el-button {
        margin-left: 20px;
      }
    }

    .tips {
      margin: 10px 0;
      color: #2f2b2b;
    }

    .bookings-table {
      .return {
        :deep {
          .el-button {
            width: 90px;
          }

          .el-button + .el-button {
            margin-top: 10px;
            margin-left: 0;
          }
        }
      }
    }
  }

  .tip {
    color: red;
    font-size: 12px;
  }

  .mail-content {
    .note {
      padding: 0 10px 10px;
      border: #ccc 1px solid;
      border-radius: 5px;
    }

    .mail-all {
      margin: 10px 0;

      .pre-txt {
        margin-right: 10px;
      }
    }

    .mail-name {
      margin: 10px 0;
    }
  }
}
</style>