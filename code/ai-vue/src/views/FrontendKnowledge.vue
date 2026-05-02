<template>
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" style="width: 60px; height: 60px;"></el-image>
                <h1>心理健康知识库</h1>
            </div>
        </div>
        <div class="content">
            <!-- 左侧菜单 -->
             <div class="recommend-section">
                <div class="section-title">推荐阅读</div>
                <div class="recommend-list">
                    <div v-for="item in recommendList" :key="item.id" class="recommend-item" @click="goToArticle(item.id)">
                        <h4>{{ item.title }}</h4>
                        <p class="read-count"><el-icon><Histogram /></el-icon> 阅读量：{{ item.readCount }}</p>
                    </div>
                </div>
             </div>
             <!-- 右侧文章列表 -->
             <div class="article-list">
                <div v-for="item in articleList" :key="item.id" class="article-item" @click="goToArticle(item.id)">
                    <el-image :src="getImage(item.coverImage)" style="width: 240px; height: 150px;"></el-image>
                    <div class="info">
                        <div class="title">
                            <h3>{{ item.title }}</h3>
                            <el-tag plain type="primary">{{ item.categoryName }}</el-tag>
                        </div>
                        <div :style="{'margin-top': '10px'}">
                            <div class="flex-box">
                                <el-icon><Avatar /></el-icon>
                                <span>{{ item.authorName }}</span>
                            </div>
                            <div class="flex-box">
                                <el-icon><List /></el-icon>
                                <span>{{ dayjs(item.UpdatedAt).format('YYYY-MM-DD') }}</span>
                            </div>
                        </div>
                        <div :style="{'margin-top': '10px'}">
                            <div class="flex-box">
                                <el-icon><Platform /></el-icon>
                                <span>观看人数：{{ item.readCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- 分页组件 -->
         <div class="pagination-wrapper">
            <el-pagination
                style="margin-top: 25px;"
                layout=" prev, pager, next"
                :total="pagination.total"
                :page-size="pagination.size"
                @change="handleChange"
            />
         </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getKnowledgeList } from '@/api/frontend'
import { dayjs } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

// 推荐文章列表
const recommendList = ref([]);


// 分页参数
const pagination = reactive({
  currentPage: 1,
  size: 5,
  total: 0
});

const iconUrl = new URL("@/assets/images/book.png", import.meta.url).href;
//获取封面图片
const getImage = (url) => {
    return url ? 'http://159.75.169.224:1235' + url : 'https://file.itndedu.com/psychology_ai.png';
}

// 跳转文章详情页
const goToArticle = (id) => {
    router.push(`/knowledge/article/${id}`);
}

// 分页改变时触发
const handleChange = (val) => {
  pagination.currentPage = val;
  getPageList();
};  

//获取列表数据
const articleList = ref([]);
const getPageList = async ()=>{
    const params = {
        sortField: 'PublishedAt',
        sortDirection: 'desc',
        ...pagination,
    };
    const { records, total } = await getKnowledgeList(params);
    articleList.value = records;
    pagination.total = total;
}

// 初始化时获取推荐文章列表
onMounted(async () => {
  const params = {
    sortField: 'readCount',
    sortDirection: 'desc',
    ...pagination,
  };
  const { records } = await getKnowledgeList(params);
  recommendList.value = records;
  await getPageList();
});
</script>

<style scoped lang="scss">
.knowledge-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
    .flex-box {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;
        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .content {
        display: flex;
        gap: 20px;
        margin: 0 auto;
        width: 1200px;
        padding: 20px;
        .recommend-section {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 15px;
            height: 400px;
            .section-title {
                font-size: 12;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .recommend-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding-left: 10px;
                    cursor: pointer;
                    .read-count {
                        margin-top: 15px;
                        font-size: 12px;
                        color: #6b7280;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
        .article-list {
            flex: 1;
            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 15px;
                margin-bottom: 20px;
                display: flex;
                .info {
                    margin-left: 20px;
                    .title {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
    }
    .pagination-wrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
    }
}
</style>
