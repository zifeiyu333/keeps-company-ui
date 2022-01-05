<template>
  <div>
    <el-dropdown size="small" class="d2-mr">
      <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modifyPassword">
          <d2-icon name="expeditedssl" class="d2-mr-5"/>
          修改密码
        </el-dropdown-item>
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5"/>
          注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="dataRule" label-width="120px">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="form.password" :maxlength="30" ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="form.newPassword" :maxlength="30" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" :maxlength="30" ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogModifyPassword">确认</el-button>
        <el-button @click="handleDialogCancel" >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { request } from '@/api/service'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        password: null,
        newPassword: null,
        confirmPassword: null
      },
      dataRule: {
        password: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    modifyPassword () {
      this.dialogVisible = true
    },
    handleDialogModifyPassword () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.$confirm('确定要修改密码吗？', '确认?', {
          type: 'warning'
        }).then(() => {
          request({
            url: '/sys/user/password',
            method: 'post',
            params: { password: this.form.password, newPassword: this.form.newPassword }
          }).then(ret => {
            if (ret.code === 200) {
              this.$message.success(ret.msg)
              this.dialogVisible = false
            } else {
              this.$message.error(ret.msg)
            }
          })
        }).then(() => {
        }).catch(() => {})
      })
    },
    handleDialogCancel () {
      this.dialogVisible = false
    }
  }
}
</script>
