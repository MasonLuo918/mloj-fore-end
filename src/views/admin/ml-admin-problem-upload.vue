<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>问题上传</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
        <el-form ref="form">
          <el-form-item>
            <ml-markdown
                :placeholder="title.desc"
                :title="title.desc"
                :error="title.error"
                need
                @update="titleChange">
            </ml-markdown>

          </el-form-item>
          <el-form-item>
            <ml-markdown
                type="edit"
                :placeholder="description.desc"
                :title="description.desc"
                :error="description.error"
                need
                @update="descriptionChange"
            >
            </ml-markdown>
          </el-form-item>

          <el-form-item>
            <ml-markdown
                type="edit"
                :placeholder="inputDescription.desc"
                :title="inputDescription.desc"
                :error="inputDescription.error"
                :text="inputDescription.value"
                need
                @update="inputDescriptionChange"
            >
            </ml-markdown>
          </el-form-item>

          <el-form-item>
            <ml-markdown
                type="edit"
                :placeholder="outputDescription.desc"
                :title="outputDescription.desc"
                :error="outputDescription.error"
                :text="outputDescription.value"
                need
                @update="outputDescriptionChange"
            >
            </ml-markdown>
          </el-form-item>

          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="4">
                <p style="text-align: left; margin-left: 20px">Time Limit</p>
                <el-input-number v-model="timeLimit" :min="1000" :max="1000000">
                </el-input-number>
              </el-col>

              <el-col :span="4">
                <p style="text-align: left; margin-left: 20px">Memory Limit(MB)</p>
                <el-input-number v-model="memoryLimit" :min="20" :max="2048" label="Memory Limit">

                </el-input-number>
              </el-col>

              <!-- 困难等级-->
              <el-col :span="4">
                <p style="text-align: left; margin-left: 20px">Diffcult</p>
                <el-select v-model="difficulty.value" placeholder="请选择">
                  <el-option
                      v-for="item in difficulty.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <ml-markdown
                type="edit"
                :placeholder="hint.desc"
                :title="hint.desc"
                :error="hint.error"
                :text="hint.value"
                @update="hintDescriptionChange"
            >
            </ml-markdown>
          </el-form-item>

          <el-form-item>
            <el-row type="flex" style="float: left">
              <el-col :span="24">
                <span>Tags: </span>
                <el-tag
                    :key="tag.id"
                    v-for="tag in tags.content"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag.id)">
                  {{ tag.name }}
                </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="tags.inputVisible"
                    v-model="tags.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <ml-addable-textarea :ioSamples="ioSamples"></ml-addable-textarea>
          </el-form-item>
          <el-form-item>
            <p><b>TestCase</b></p>
            <el-upload
                class="upload-demo"
                drag
                action="/api/problem/testCase"
                multiple
                :limit="1"
                :on-success="upload"
                :on-exceed="handleExceed"
                name="testCaseFile">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处， 或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传zip文件</div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" round @click="uploadProblem">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
</template>

<script>
import MlInput from './ml-admin-input'
import MlMarkdown from './ml-admin-markdown'
import MlAddableTextarea from './ml-admin-addable-textarea'

export default {
  name: 'ProblemUpload',
  components: {MlAddableTextarea, MlMarkdown, MlInput},
  data() {
    return {
      title: {
        value: '',
        error: '',
        desc: 'Title'
      },
      description: {
        desc: 'Description',
        value: '',
        error: ''
      },
      inputDescription: {
        desc: 'Input Description',
        value: '',
        error: ''
      },
      outputDescription: {
        desc: 'Output Description',
        value: '',
        error: ''
      },
      timeLimit: 1000,
      memoryLimit: 50,
      difficulty: {
        value: 0,
        options: [
          {
            value: 0,
            label: 'Low'
          },
          {
            value: 1,
            label: 'Mid'
          },
          {
            value: 2,
            label: 'Hard'
          }
        ]
      },
      hint: {
        value: '',
        desc: 'Hint',
        error: ''
      },
      tags: {
        // content里面的对象，有id和text两个属性
        content: [],
        inputVisible: false,
        inputValue: ''
      },
      ioSamples: [],
      testCaseId: ''
    }
  },
  methods: {
    validTitle() {
      this.title.error = this.title.value === '' ? 'Title is require' : ''
    },
    validDescription() {
      this.description.error = this.description.value === '' ? 'Description is require' : ''
    },
    validInputDescription() {
      this.inputDescription.error = this.inputDescription.value === '' ? 'InputDescription is require' : ''
    },
    validOutputDescription() {
      this.outputDescription.error = this.outputDescription.value === '' ? 'OutputDescription is require' : ''
    },
    descriptionChange(value) {
      this.description.value = value
      this.validDescription()
    },
    inputDescriptionChange(value) {
      this.inputDescription.value = value
      this.validInputDescription()
    },
    outputDescriptionChange(value) {
      this.outputDescription.value = value
      this.validOutputDescription()
    },
    hintDescriptionChange(value) {
      this.hint.value = value
    },
    handleClose(id) {
      const content = this.tags.content
      let i
      for (i = 0; i < content.length; i++) {
        if (content[i].id === id) {
          break
        }
      }
      this.tags.content.splice(i, 1)
    },
    showInput() {
      this.tags.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm() {
      let tagName = this.tags.inputValue
      if (tagName === '') {
        return
      }
      let content = {
        id: 1,
        name: ''
      }
      let url = '/tag/' + tagName
      await this.axios
          .post(url)
          .then((resp) => {
            content = resp.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      this.tags.content.push(content)
      this.tags.inputVisible = false
      this.tags.inputValue = ''
    },
    upload(response, file, fileList) {
      const data = response.data
      this.testCaseId = data.testCaseId
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    titleChange(text) {
      this.title.value = text;
      this.validTitle()
      console.log(this.title.value)
    },
    uploadProblem() {
      const tagIds = []
      for (let i = 0; i < this.tags.content.length; i++) {
        tagIds[i] = this.tags.content[i].id
      }

      const data = {
        title: this.title.value,
        description: this.description.value,
        inputDescription: this.inputDescription.value,
        outputDescription: this.outputDescription.value,
        timeLimit: this.timeLimit,
        memoryLimit: this.memoryLimit,
        level: this.difficulty.value,
        hint: this.hint.value,
        tags: tagIds,
        ioSamples: this.ioSamples,
        testCaseId: this.testCaseId
      }
      console.log(data)
      const headers = {
        'X-HTTP-TOKEN': '1'
      }
      this.axios.post('/problem', data, {
        headers
      })
          .then(() => {
            this.$notify.success({
              message: '上传成功'
            })
            this.$router.push('/adminProblemList')
          })
          .catch(err => {
            this.$notify.error({
              message: err
            })
          })
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
