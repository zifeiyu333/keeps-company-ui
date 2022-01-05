<template>
  <div>
    <el-select class="width:100px" v-model="selectValue" autocomplete clearable :disabled="disabled" :placeholder="placeholder" filterable>
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { request } from '@/api/service'
export default {
  name: 'el-dict',
  componentName: 'ElDict',
  data () {
    return {
      placeholder: '请选择',
      options: [],
      selectValue: ''
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // 导入的url地址
    code: {
      type: String
    },
    // 接受外部v-model传入的值，必须使用value
    value: {
      type: String
    }
  },
  watch: {
    // 判断下拉框的值是否有改变
    selectValue (val, oldVal) {
      if (val !== oldVal) {
        const obj = this.options.find((item) => {
          return item.value === this.selectValue
        })
        this.$emit('selectData', obj)
        this.$emit('input', this.selectValue)
      }
    },
    value: {
      immediate: true, // immediate选项可以开启首次赋值监听
      async handler (val, oldVal) {
        if (typeof val === 'number') {
          this.selectValue = val.toString()
        } else {
          this.selectValue = val.toString()
        }
      }
    }
  },
  mounted () {
    request({
      url: '/sys/dictdata/' + this.code,
      method: 'get'
    }).then(ret => {
      for (let i = 0; i < ret.data.length; i++) {
        const op = {
          label: ret.data[i].label,
          value: ret.data[i].value.toString(),
          key: i
        }
        this.options.push(op)
      }
    })
  },
  methods: {
  }
}
</script>
