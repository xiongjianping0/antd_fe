<template>
  <div class="panel-default">
    <div class="page-heading">
      <h4>富文本{{ 'ndjsahdjshdjsjds' | filterTitle }}</h4>
    </div>
    <div class="page-body">
      <div>
        <tinymce
          v-model="content"
          :height="300"
        />
      </div>
      <div
        class="editor-content"
        v-html="content"
      />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: `
      <h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>
      <ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

