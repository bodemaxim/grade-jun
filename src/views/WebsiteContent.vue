<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import { marked } from 'marked'

import SpinningLoader from './SpinningLoader.vue'
import SearchPanel from './SearchPanel.vue'

import { Levels, Topics } from '@/enum/Enum'

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

const getLevelText = (level: Levels): string => {
  switch (level) {
    case Levels.beginner:
      return 'начинающий'
    case Levels.intermediate:
      return 'средний'
    case Levels.advanced:
      return 'продвинутый'
    default:
      return 'неизвестно'
  }
}

const getTopicsText = (topic: Topics): string => {
  switch (topic) {
    case Topics.frontGeneral:
      return 'Общетехнические навыки'
    case Topics.frontCss:
      return 'CSS'
    case Topics.frontJavascript:
      return 'JavaScript'
    case Topics.frontVue:
      return 'Vue'
    default:
      return 'неизвестно'
  }
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
            <p><b>Тема: </b>{{ getTopicsText(question.topic) }}</p>
            <p><b>Уровень: </b>{{ getLevelText(question.level) }}</p>
          </div>
          <p v-else class="mt-7">Выберите вопрос, чтобы посмотреть ответ на него.</p>
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
}

.panels-container {
  display: flex;
  flex-grow: 1;
}

.search-panel,
.view-panel {
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin: 1em;
  padding: 1em;
  max-height: calc(100vh - 100px);
}

.search-panel {
  max-width: 30%;
}

.view-panel {
  flex-grow: 1;
  margin-right: 2em;
}

.view-panel-question {
  height: calc(100vh - 140px);
  overflow-y: auto;
}

.search-panel {
  margin-left: 2em;
}

hr {
  border: 2px solid gray;
}

/* XS */
@media (min-width: 320px) and (max-width: 575px) {
  main {
    font-size: 14px;
    overflow-y: auto;
  }

  .panels-container {
    display: block;
  }

  .search-panel {
    display: block;
    width: 100%;
    max-width: calc(100% - 24px);
    height: auto;
    max-height: 60vh;
    margin: 1em;
  }

  .view-panel {
    margin: 1em;
  }

  .view-panel-question {
    height: auto;
  }
}

/* S */
@media (min-width: 576px) and (max-width: 767px) {
  main {
    font-size: 15px;
  }
}
</style>
