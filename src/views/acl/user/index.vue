<template>
  <div>
    <el-card>
      <div>
        <el-input style="width:300px" placeholder="用户名" v-model="keyword" />
        <el-button type="primary" @click="checkHandle">查询</el-button>
        <el-button @click="clearHandle">清空</el-button>
      </div>
      <div>
        <el-button type="primary" @click="showUpdateUser">添加</el-button>
        <el-button @click="delateAll">批量删除</el-button>
      </div>
      <div>
        <el-table @selection-change="changeHandel" :data="userList">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="用户昵称" prop="nickName"></el-table-column>
          <el-table-column label="用户列表" prop="roleName"></el-table-column>
          <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
          <el-table-column label="更新时间" prop="gmtModified"></el-table-column>
          <el-table-column label="操作">
            <template #default="{row,index}">
              <el-button size="mini" type="info" @click="Allocation(row)" icon="el-icon-message"></el-button>
              <el-button size="mini" type="primary" @click="addUserInfo(row)" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" @click="deleteHandel(row)" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[5, 10, 20, 30]"
        style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @size-change="getUser(page, $event)"
        @current-change="getUser($event, limit)" @prev-click="getUser($event, limit)"
        @next-click="getUser($event, limit)" />


      <!-- 添加修改 -->
      <el-dialog :title="addId?'编辑用户':'添加用户'" :visible.sync="isShow">
        <el-form label-width="120px" :rules="rules" :model="userInfo">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="userInfo.nickName"></el-input>
          </el-form-item>
          <el-form-item v-if="!addId" label="用户密码" prop="password">
            <el-input v-model="userInfo.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearUser">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 设置角色 -->
      <el-dialog title="设置角色" :visible.sync="userShow">
        <el-form label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="rowName"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group  v-model="checkedItem">
              <el-checkbox v-for="item in allocationList" @change="changeHandel($event)"  :key="item.id" :label="item.id">{{ item.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<!-- roleName -->

<script>
import { reqUser, reqAddUser, reqDeleteArr ,reqAllocation,reqPutUserInfo,reqDelete} from '@/apis/acl/acl.js';
export default {
  name: "user",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      userList: [],
      keyword: '',
      isShow: false,
      userInfo: {
        username: '',
        password: '',
        nickName: '',
      },
      deleteAll: [],
      rules: {
        username: [
          { required: true, message: '用户名必须输入' },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
      },
      userShow: false,
     allocationList:[],
     checkedCities:[],
     checkedItem:[],
      rowName:'',
      changeValue:'',
      addId:''
    }
  },


  mounted() {
    this.getUser(this.page, this.limit)
  },

  methods: {
    // 初始化数据
    async getUser(page, limit, keyword) {
      try {
        let res = await reqUser(page, limit, keyword)
        this.userList = res.data.items
        this.total = res.data.total
      } catch (error) {
        console.log(error);
      }

    },
    // 查询
    checkHandle() {
      this.getUser(this.page, this.limit, this.keyword)
    },
    // 清空
    clearHandle() {
      this.keyword = ''
    },
    // 添加
    async addUser() {

      let userInfo = this.userInfo
      try {
        if (this.addId) {
          await reqPutUserInfo(userInfo)
        }else{
           await reqAddUser(userInfo)
        }
       
        this.userInfo = {}
        this.isShow = false,

          this.getUser(this.page, this.limit)

      } catch (error) {
        console.log(error);
      }
    },
    // 取消
    clearUser() {
      this.userInfo = {}
      this.isShow = false
    },
    // 勾选
    changeHandel(item) {
      console.log(item);
      this.deleteAll = item.map(arr => arr.id)
    },
    // 批量删除
    async delateAll() {
      try {
        await reqDeleteArr(this.deleteAll)
        this.getUser(this.page, this.limit)
      } catch (error) {
        console.log(error);
      }
    },
    // 分配角色
    async Allocation(row){
      this.rowName=row.nickName
      this.userShow= true
      let res= await reqAllocation(row.id)
      this.allocationList=res.data.allRolesList
      this.checkedItem=res.data.assignRoles
    },
    changeHandel(value){
      console.log(value);
    },
    // 编辑
    addUserInfo(row){
      this.userInfo=row
      this.isShow=true
      this.addId=row.id

    },
    // 添加
    showUpdateUser(){
      this.addId='',
      this.userInfo={}

      this.isShow=true
    },
    // 删除
    async deleteHandel(row){
      await reqDelete(row.id)
      this.getUser(this.page, this.limit)
    }
  },
}
</script>

<style scoped></style>