<template>
  <div>
    <PageHead title="知识文章">
      <template #button>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
        <!-- type="primary"：主要按钮样式（蓝色） -->
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <el-table :data="tableData" width="100%">
      <el-table-column label="文章标题" fixed="left" width="450"> 
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon><timer /></el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类"  width="200" >
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon><timer /></el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column prop="authorName" label="作者" width="200" />
       <el-table-column prop="readCount" label="阅读量" width="200" />
       <el-table-column prop="updatedAt" label="发布时间" width="200" />
       <el-table-column label="操作"  width="240"  fixed="right">
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-button text type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0||scope.row.status === 2"  text type="success">发布</el-button>
            <el-button @click="handleUnpublish(scope.row)" v-else-if="scope.row.status === 1"  text type="warning">下线</el-button>
            <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px;"
      :total="pagination.total"
      v-model:page-size="pagination.size"
      layout="prev, pager, next"
      @change="handleChange"
    />
    <ArticleDialog v-model:modelValue="dialogVisible" :categories="categories" :article="currentArticle" @success="handleSuccess"></ArticleDialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import { categoryTree, articlePage,getArticleDetail,changeArticleStatus,deleteArticle } from "@/api/admin";
import ArticleDialog from "@/components/ArticleDialog.vue";
import { ElMessageBox,ElMessage } from "element-plus";

const formItem = [
  {
    comp: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comp: "select",
    prop: "categoryID",
    label: "文章分类",
    placeholder: "请选择分类",
  },
  {
    comp: "select",
    prop: "status",
    label: "状态",
    placeholder: "请选择状态",
    options: [
      {
        label: "草稿",
        value: 0,
      },
      {
        label: "已发布",
        value: 1,
      },
      {
        label: "已下载",
        value: 2,
      },
    ],
  },
];

//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
// 表格数据
const tableData = ref();

const handleSearch = async (formData) => {
  // console.log(formData);

  const params = {
    ...pagination,
    ...formData,
  };
  //调用文章分页查询接口并接受返回数据
  const { records, total } = await articlePage(params);
  tableData.value = records;
  pagination.total = total;
};

// 分类映射表
const categoryMap = reactive({});
// 分类列表
const categories = ref([]);

// 分页改变时触发
const handleChange = (val) => {
  pagination.currentPage = val;
  handleSearch();
};  

// 提交文章
const handleSuccess =  () => {
  dialogVisible.value = false;
  handleSearch();
};

//新增和编辑
// 弹窗显示状态
const dialogVisible = ref(false);
// 新增or编辑文章
const currentArticle = ref(null);
const handleEdit = (row) => {
  if(!row.id) {
    //新增文章
    currentArticle.value = null;
    dialogVisible.value = true;
  }
 else { 
  //编辑文章
    getArticleDetail(row.id).then(res =>{
    console.log(res,"res");
    currentArticle.value = res;
    dialogVisible.value = true; //获取文章详情
  });
}
};

// 发布文章
const handlePublish = (row) => {
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`, '确认', {
    confirmButtonText: '确定发布',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    changeArticleStatus(row.id, { status: 1 }).then(() => {
      ElMessage.success('发布成功');
      handleSearch();
    });
  });
};
// 下线文章
const handleUnpublish = (row) => {
  ElMessageBox.confirm(`确认下线文章${row.title}吗？`, '确认', {
    confirmButtonText: '确定下线',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    changeArticleStatus(row.id, { status: 2 }).then(() => {
      ElMessage.success('下线成功');
      handleSearch();
    });
  });
};
// 删除文章
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`, '确认', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'danger',
  }).then(() => {
    deleteArticle(row.id).then(() => {
      ElMessage.success('删除成功');
      handleSearch();
    });
  });
};

onMounted(async () => {
  const data = await categoryTree();

  categories.value = data.map((item) => {
    categoryMap[item.id] = item.categoryName;
    // console.log(categoryMap);
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  
  formItem[1].options = categories.value;
    
  // 获取文章列表
  handleSearch() 
}); 



</script>
