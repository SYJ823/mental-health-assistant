<template>
  <el-dialog
    :title="isEdit? '编辑文章' : '新增文章'"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose()"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入文章标题"
          maxlength="200"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择文章分类">
          <el-option
            v-for="item in props.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input
          type="textarea"
          v-model="formData.summary"
          placeholder="请输入文章摘要（可选）"
          maxlength="2000"
          show-word-limit
          :rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <el-select
          v-model="formData.tagArray"
          placeholder="请选择文章标签(逗号分隔)"
          multiple
          filterable
          allow-create
          style="width: 100%"
        >
          <el-option
            v-for="item in commonTags"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面">
        <div class="cover-upload">
          <el-upload
            class="cover-upload"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            :show-file-list="false"
            accept="image/*,"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传文章封面</p>
            </div>
            <img v-else :src="imgUrl" class="cover-image" alt="封面图片" />
          </el-upload>
          <div v-if="imgUrl" class="cover-remove">
            <el-button type="danger" size="small" @click="handleRemove"
              >移除封面</el-button
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
          v-model="formData.content"
          :max-char-count="5000"
          placeholder="请输入文章内容"
          @created="handleEditorCreated"
          @change="handleContentChange"
          min-height="200px"
        />
      </el-form-item>
    </el-form>
    <div v-if="btnPreview">
      <h3>预览效果</h3>
      <p v-html="formData.content"></p>
    </div>
    <template #footer>
      <el-button @click="btnPreview = !btnPreview">{{btnPreview ? "隐藏预览" : "预览效果"
      }}</el-button>
      <el-button @click="handleClose">取消</el-button>
      <el-button  type="primary" @click="handleSubmit" :loading="loading" >{{isEdit ? '更新文章' : '创建文章'}}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, nextTick, watch } from "vue";
import { ElMessage } from "element-plus";
import { uploadFile, createArticle, updateArticle } from "@/api/admin";
import { fileBaseUrl } from "@/config/index.js";
import RichTextEditor from "@/components/RichTextEditor.vue";

const formData = reactive({
  title: "",
  content: "",
  coverImage: "",
  categoryId: 1,
  summary: "",
  tags: "",
  id: "",
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  article: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "success"]);

const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

//编辑或新增状态判断
const isEdit = computed(() => !!props.article?.id);

//校验规则
const rules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    { max: 200, message: "文章标题最多200个字符", trigger: "blur" },
  ],
  categoryId: [
    { required: true, message: "请选择文章分类", trigger: "change" },
  ],
  content: [
    { required: true, message: "请输入文章内容", trigger: "blur" },
    { max: 5000, message: "文章内容最多5000个字符", trigger: "blur" },
  ],
});

const commonTags = [
  "情绪管理",
  "焦虑",
  "抑郁",
  "压力",
  "睡眠",
  "冥想",
  "正念",
  "放松",
  "心理健康",
  "自我成长",
  "人际关系",
  "工作压力",
  "学习方法",
  "生活技巧",
];

//上传封面
const imgUrl = ref("");
const businessId = ref(null);
const beforeUpload = (file) => {
  // 针对图片上传的校验
  const isImage = file.type.startsWith("image/");
  // 校验文件大小
  const isLt5M = file.size / 1024 / 1024 <= 5;
  if (!isLt5M) {
    ElMessage.error("图片大小不能超过5MB");
    return false;
  }
  if (!isImage) {
    ElMessage.error("请上传图片文件");
    return false;
  }
  return true;
};
const handleUploadRequest = async ({ file }) => {
  //UUID生成id
  businessId.value = crypto.randomUUID();
  console.log(file, businessId.value);

  const fileRes = await uploadFile(file, {
    businessId: businessId.value,
  });
  console.log(fileRes, "返回结果");

  imgUrl.value = fileBaseUrl + fileRes.filePath;
  formData.coverImage = fileRes.filePath;
};
//移除封面
const handleRemove = () => {
  imgUrl.value = "";
  formData.coverImage = "";
};

//富文本编辑器
const editorInstance = ref(null); //富文本编辑器实例
const handleEditorCreated = (editor) => {
  editorInstance.value = editor;
  if (formData.content && editor) {
    //如果文章内容存在且编辑器实例存在
    nextTick(() => {
      editor.setHtml(formData.content); //设置文章内容到编辑器
    });
  }
};
//修改文章内容时回显
const handleContentChange = (data) => {
  console.log(data, "文章内容");
  //将文章内容赋值给formData.content
  formData.content = data.html;
};

//取消按钮业务
const handleClose = () => {
  //重置表单
  formRef.value.resetFields();
  //重置businessId
  businessId.value = null;
  //重置标签
  formData.tagArray = [];
  //重置封面
  handleRemove();
  emit("update:modelValue", false);
};

//创建文章
const loading = ref(false);
const btnPreview = ref(false);
const formRef = ref();
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      console.log(formData, "formData");
      const submitData = {
        ...formData,
        tags: formData.tagArray?.join(",")|| "",
      };
      delete submitData.tagArray;
      if( !isEdit.value) { //新增文章
        createArticle(submitData).then((res) => {
        loading.value = false;
        emit("success");
        });
      }
      else { //编辑文章
        updateArticle(props.article.id, submitData).then((res) => {
        loading.value = false;
        emit("success");
        });
      }
    }
  });
};

//编辑文章数据回显
watch(() => props.article, (newVal) => {
  if (newVal) {
    nextTick(() => {
      Object.assign(formData, newVal)
       //封面
      businessId.value = newVal.id;
      imgUrl.value = fileBaseUrl + newVal.coverImage;
    })
 
  }
})



</script>
<style scoped lang="scss">
.cover-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 120px;
  background-color: #f5f5f5;
  border-radius: 4px;
  flex-direction: column;
  color: #8b949e;
  background: #f6f8fa;
}
.cover-image {
  width: 200px;
  height: 120px;
  display: block;
}
</style>
