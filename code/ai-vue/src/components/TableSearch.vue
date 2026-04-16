<template>
  <el-form :model="formData" ref="formRef">
    <el-row :gutter="24">
      <template v-for="item in formItemAtters" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- 动态组件 -->
            <component
              v-model="formData[item.prop]"
              :is="isComp(item.comp)"
              :placeholder="item.placeholder"
            >
              <template v-if="item.comp === 'select'">
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(formRef)">重置</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { reactive, computed, ref } from "vue";

const emit = defineEmits(["search"]);

const formRef = ref()


const props = defineProps({
  formItem: {
    type: Array,
    default: () => [],
  },
});

const formItemAtters = computed(() => {
  const { formItem } = props;
  formItem.forEach((item) => {
    item.col = { xs: 24, sm: 12, md: 6, lg: 6 };
  });
  return formItem;
});

const formData = reactive({});
const isComp = (comp) => {
  return {
    input: "el-input",
    select: "el-select",
  }[comp];
};

const handleSearch = () => {
  emit("search", formData);
};
const handleReset = (formEL) => {
  //先重置表单，再触发查询事件
  if(!formEL) return;
  formEL.resetFields();

  emit("search", formData);
};
</script>
