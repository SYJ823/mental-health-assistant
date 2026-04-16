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
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";

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
    options: [
      { label: "心理健康基础", value: "心理健康基础" },
      { label: "情绪管理", value: "情感健康" },
    ],
  },
];

const handleSearch = (formData) => {
    console.log(formData);
}
</script>
