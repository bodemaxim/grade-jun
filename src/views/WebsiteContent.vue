<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import { marked } from 'marked'
import SpinningLoader from './SpinningLoader.vue'
import SearchPanel from './SearchPanel.vue'
import type { IQuestion } from '@/interfaces/IData'

const store = useStore()
const isLoading = computed(() => store.getters.isLoading)

/**
 * Данные вопроса.
 */
const question: Ref<IQuestion | null> = ref<IQuestion | null>(null)

/**
 * Событие изменения вопроса для отображения.
 */
const onQuestionViewChanged = (questionView: IQuestion | null) => {
  question.value = questionView
}
</script>

<template>
  <main>
    <SpinningLoader v-if="isLoading" />
    <div class="mx-7">
      <h1 class="text-danger custom-title mt-2">Аттестация</h1>
    </div>
    <div class="d-flex flex-column">
      <div class="panels-container">
        <SearchPanel @question-view="onQuestionViewChanged($event)" class="search-panel" />
        <div class="view-panel">
          <div v-if="question" class="view-panel-question">
            <h2>{{ question.question }}</h2>
            <p v-html="marked.parse(question.answer)"></p>
            <hr />
          </div>
          <p v-else class="mt-7 ml-5">Выберите вопрос, чтобы посмотреть ответ на него.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  background-color: var(--primary-dark);
}

.panels-container {
  display: flex;
  flex-grow: 1;
}

.search-panel,
.view-panel {
  border: 1px solid var(--primary-accent);
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin: 1em;
  min-height: calc(100vh - 100px);
  background-color: var(--bg-dark);
  overflow: hidden;
}

.search-panel {
  min-width: 300px;
  max-width: 300px;
}

.view-panel {
  flex-grow: 1;
  margin-right: 2em;
}

.view-panel-question {
  height: calc(100vh - 100px);
  padding: 30px 15px 10px;
  overflow-y: auto;
}

.search-panel {
  margin-left: 2em;
}

hr {
  border: 2px solid gray;
}
</style>
