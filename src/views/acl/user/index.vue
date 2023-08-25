<template>
  <div>
    <el-card>
      <div>
        <el-input style="width:300px" placeholder="用户名" v-model="keyword" />
        <el-button type="primary" @click="checkHandle">查询</el-button>
        <el-button @click="clearHandle">清空</el-button>
      </div>
      <div>
        <el-button type="primary" @click="isShow = true">添加</el-button>
        <el-button>删除</el-button>
      </div>
      <div>
        <el-table :data="userList">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="用户昵称" prop="nickName"></el-table-column>
          <el-table-column label="用户列表" prop="roleName"></el-table-column>
          <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
          <el-table-column label="更新时间" prop="gmtModified"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button size="mini" type="info" icon="el-icon-message"></el-button>
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[5, 10, 20, 30]"
        style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @size-change="getUser(page, $event)"
        @current-change="getUser($event, limit)" @prev-click="getUser($event, limit)" @next-click="getUser($event, limit)" />


      <!-- 添加修改 -->
      <el-dialog title="添加用户" :visible.sync="isShow">
        <el-form label-width="120px" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="nickName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearUser">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { reqUser, reqAddUser } from '@/apis/acl/acl.js';
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
      username: '',
      password: '',
      nickName: '',
      rules: {
        username: [
          { required: true, message: '用户名必须输入' },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [
          { required: true, message: '请输入密码'}
        ],
      }
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
      let userInfo = {
        username: this.username,
        password: this.password,
        nickName: this.nickName,
      }
      try {
        await reqAddUser(userInfo)
      this.isShow=false
      this.username= ''
      this.password=''
      this.nickName=''
      this.getUser(this.page, this.limit)
      } catch (error) {
        console.log(error);
      }
    },
    // 取消
    clearUser() {
      this.username= ''
      this.password=''
      this.nickName=''
      this.isShow=false
    } 
  },
}
</script>

<style scoped></style>