<template>
  <div>
    <PageHead title="知识文章">
      <template #button>
        <el-button type="primary">新增</el-button>
        <!-- type="primary"：主要按钮样式（蓝色） -->
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import { categoryTree } from "@/api/admin";

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

// 分类映射表
const categoryMap = reactive({});
// 分类列表
const categories = ref([]);

onMounted(async () =>{
  const data = await categoryTree()

  categories.value = data.map(item => {
    categoryMap[item.id] = item.categoryName
    return {
    label: item.categoryName, 
    value: item.id,
    }
  });
  formItem[1].options = categories.value;
})

const handleSearch = (formData) => {
    console.log(formData);
}
</script>
