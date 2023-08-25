<template>
    <div>
        <div>
            <el-input style="width:300px" placeholder="用户名" v-model="keyword" />
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="clearValue">清空</el-button>
        </div>
        <div>
            <el-button type="primary" @click="addHandel">添加</el-button>
            <el-button @click="deleteAllHandel">批量删除</el-button>
        </div>
        <el-table @selection-change="changeTable" :data="roleList">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="角色昵称" prop="roleName"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button size="mini" type="info" icon="el-icon-message"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-check"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加角色 -->
        <el-dialog title="添加角色" :visible.sync="isAdd" width="30%">
            <el-form>
                <el-form-item label="请输入新名称">
                    <el-input ref="inputRef" v-model="roleName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clear">取 消</el-button>
                <el-button @click="getAddRole">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { reqRole, addRole ,deleteRole} from '@/apis/acl/acl.js';
export default {
    name: "",
    data() {
        return {
            page: 1,
            limit: 5,
            total: 0,
            roleList: [],
            keyword: '',
            isAdd: false,
            roleName: '',
            deleteAll:[]
        }
    },

    mounted() {
        this.getRoleList(this.page, this.limit)
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
        },
        search() {
            this.getRoleList(this.page, this.limit, this.keyword)
        },
        clearValue() {
            this.keyword = ''

        },
        addHandel() {
            this.isAdd = true
            this.$nextTick(function () {      //更新完成后调用
                this.$refs.inputRef.focus()

            })


        },
        // 添加
        async getAddRole() {
            try {
                await addRole({ roleName: this.roleName }),
                    this.roleName = ''
                     this.isAdd=false
                    this.getRoleList(this.page, this.limit)
            } catch (error) {
                console.log(error);
            }
        },
        // 取消
        clear(){
             this.roleName = ''
             this.isAdd=false
        },
        // 批量删除
        async deleteAllHandel(){
            await deleteRole(this.deleteAll)
            this.getRoleList(this.page, this.limit)
        },
        // 选中
        changeTable(value){
            console.log(value);
            this.deleteAll=value.map(item=>item.id)
        }
    }

}
</script>

<style scoped></style>