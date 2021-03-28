<template>
  <div class="input">
    <div class="title" style="text-align:left; font-size: 15px">
      <template v-if="need">
        <div style="color: red">*</div>
      </template>
      {{ title }}
    </div>
    <el-input
        :placeholder="title"
        v-model="value"
        :name="name"
        :type="type"
        @input="input">
    </el-input>
    <template v-if="error">
      <p style="text-align:left; color: red; font-size: 10px"> {{ error }}</p>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ml-input',
  data() {
    return {
      text: ''
    }
  },
  props: {
    need: {
      type: Boolean,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    error: {
      type: String,
      default: ''
    },
    value: {
      type: String
    }
  },
  methods: {
    input() {
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
