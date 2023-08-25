<template>
    <div>
        <div>
            <el-input style="width:300px" placeholder="用户名" v-model="keyword" />
            <el-button type="primary">查询</el-button>
            <el-button>清空</el-button>
        </div>
        <div>
            <el-button type="primary">添加</el-button>
            <el-button>删除</el-button>
        </div>
        <el-table :data="roleList">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="角色昵称" prop="roleName"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button size="mini" type="info" icon="el-icon-message"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        

    </div>
</template>

<script>
import { reqRole } from '@/apis/acl/acl.js';
export default {
    name: "",
    data() {
        return {
            page: 1,
            limit: 5,
            total: 0,
            roleList:[],
            keyword: ''
        }
    },

    mounted() {
        this.getRoleList(this.page ,this.limit ,this.keyword)
    },

    methods: {
        async getRoleList(page, limit, keyword) {
            try {
                let res = await reqRole(page, limit, keyword)
                this.roleList = res.data.items
                this.total = res.total
            } catch (error) {
                console.log(error);
            }
        }
    }

}
</script>

<style scoped></style>