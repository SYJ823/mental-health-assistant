<template>
  <div class="markdown-content" :class="{ 'ai-markdown': isAiMessage }">
    <div v-html="renderedContent"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  isAiMessage: {
    type: Boolean,
    default: false
  }
})

// 简单的Markdown渲染器
const renderedContent = computed(() => {
  let html = props.content

  // 转义HTML标签（防止XSS）
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 处理代码块 (```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `<pre class="code-block"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`
  })

  // 处理行内代码 (`)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // 处理粗体 (**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // 处理斜体 (*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // 处理标题
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')

  // 处理链接
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // 处理无序列表
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // 处理有序列表
  html = html.replace(/^\d+\. (.*)$/gm, '<li>$1</li>')

  // 处理引用
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')

  // 处理分割线
  html = html.replace(/^---$/gm, '<hr>')

  // 处理换行
  html = html.replace(/\n/g, '<br>')

  // 清理多余的br标签
  html = html.replace(/<br><br>/g, '<br>')

  return html
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: inherit;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin: 1em 0 0.5em 0;
  font-weight: 600;
  line-height: 1.3;
}

.markdown-content h1 {
  font-size: 1.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.3em;
  color: #374151;
}

.markdown-content h3 {
  font-size: 1.1em;
  color: #4b5563;
}

.markdown-content p {
  margin: 0.5em 0;
}

.markdown-content ul,
.markdown-content ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content li {
  margin: 0.3em 0;
}

.markdown-content blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
  background: #f9fafb;
  border-radius: 0 0.5em 0.5em 0;
  padding: 0.5em 1em;
}

.ai-markdown blockquote {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.markdown-content hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 1.5em 0;
}

/* 下面是补充的缺失样式 */
/* 代码块样式 */
.markdown-content .code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.8em 0;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.markdown-content .code-block code {
  background: transparent;
  padding: 0;
}

/* 行内代码样式 */
.markdown-content .inline-code {
  background: #f3f4f6;
  color: #ef4444;
  padding: 0.15em 0.4em;
  border-radius: 0.3em;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

/* 链接样式 */
.markdown-content a {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.markdown-content a:hover {
  border-bottom-color: #3b82f6;
}

/* 粗体、斜体样式增强 */
.markdown-content strong {
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
}

/* 有序列表样式 */
.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content ul {
  list-style-type: disc;
}

/* 针对AI消息的额外样式 */
.ai-markdown {
  /* 可以根据需要调整，比如字体、颜色等 */
}

/* 防止列表被嵌套错误包裹 */
.markdown-content ul,
.markdown-content ol {
  display: block;
}
</style>