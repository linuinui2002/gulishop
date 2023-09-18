<template>
  <div>
    <el-table default-expand-all :data="permissionList"  row-key="id" border lazy :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="code" label="权限值" width="180">
      </el-table-column>
      <el-table-column prop="address" label="跳转权限值">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button size="mini" type="primary" icon="el-icon-plus"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqPermission} from '@/apis/acl/acl.js';
export default {
  name: "",
  data() {
    return {
     permissionList:[]
    }
  },

  mounted(){
    this.getPermission()
  },

  methods:{
    async getPermission(){
      try {
        let res = await reqPermission()
        this.permissionList=res.data.children

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped></style>