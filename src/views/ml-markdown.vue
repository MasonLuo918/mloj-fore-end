<template>
  <div class="markdown">
    <div class="title" style="text-align:left; font-size: 15px">
      <template v-if="need">
        <div style="color: red">*</div>
      </template>
      {{ title }}
    </div>

    <el-input type="textarea"
              :placeholder="placeholder"
              v-model="value"
              @input="update" autosize>
    </el-input>
    <template v-if="error">
      <p style="text-align:left; color: red; font-size: 10px"> {{ error }}</p>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ml-markdown',
  props: {
    text: {
      type: String
    },
    error: {
      type: String,
      default: ''
    },
    need: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    placeholder: {
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    update() {
      this.$emit('update', this.value)
    }
  }
}
</script>

<style scoped>
.title div {
  display: inline;
}
</style>
