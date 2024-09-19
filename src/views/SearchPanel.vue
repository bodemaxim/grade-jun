<script setup lang="ts">
import { ref, computed } from 'vue'
import { store } from '@/store/store'
import initDb from '@/db/InitDb'
import type { IQuestion } from '@/interfaces/IData'
import { Topics } from '@/enum/Enum'

const emits = defineEmits<{
  questionView: [value: IQuestion | null]
}>()

const setLoadingTrue = () => {
  store.dispatch('toggleLoading', true)
}

const setLoadingFalse = () => {
  store.dispatch('toggleLoading', false)
}

const questions = ref<IQuestion[]>([])

const initData = async () => {
  setLoadingTrue()

  const dataFromDb: initSqlJs.QueryExecResult[] = await initDb()
  transformDataFromDb(dataFromDb)

  setLoadingFalse()
}

const transformDataFromDb = (dataFromDb: initSqlJs.QueryExecResult[]) => {
  const data: initSqlJs.QueryExecResult = dataFromDb[0]

  const transformedData: any[] = []

  for (const item of data.values) {
    const newItem = {
      id: item[0],
      question: item[1],
      answer: item[2],
      topic: item[3],
      links: item[4],
      level: item[5]
    }

    transformedData.push(newItem)
  }

  questions.value = JSON.parse(JSON.stringify(transformedData))
}

const viewAnswer = (question: IQuestion) => {
  emits('questionView', question)
}

const frontGeneralQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.frontGeneral)
)

const frontCssQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.frontCss)
)

const frontJsQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.frontJavascript)
)

const frontVueQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.frontVue)
)

initData()
</script>

<template>
  <div class="panel-content mt-5">
    <h3>Общетехнические навыки</h3>
    <ol>
      <li
        v-for="item in frontGeneralQuestions"
        :key="item.id"
        @click="viewAnswer(item)"
        class="question-item"
      >
        {{ item.question }}
      </li>
    </ol>
    <h3>Верстка</h3>
    <ol>
      <li
        v-for="item in frontCssQuestions"
        :key="item.id"
        @click="viewAnswer(item)"
        class="question-item"
      >
        {{ item.question }}
      </li>
    </ol>
    <h3>JavaScript</h3>
    <ol>
      <li
        v-for="item in frontJsQuestions"
        :key="item.id"
        @click="viewAnswer(item)"
        class="question-item"
      >
        {{ item.question }}
      </li>
    </ol>
    <h3>VueJS</h3>
    <ol>
      <li
        v-for="item in frontVueQuestions"
        :key="item.id"
        @click="viewAnswer(item)"
        class="question-item"
      >
        {{ item.question }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
$font-family-main: 'Montserrat', sans-serif;
$transition-time: 0.2s;
$hover-background-color: lightskyblue;

.panel-content {
  font-family: $font-family-main;
  overflow-y: auto;
  max-height: 400px;
  max-width: 100%;
}

.question-item {
  margin: 0;
  padding: 0;
  &:hover {
    background-color: $hover-background-color;
    cursor: pointer;
    transition: $transition-time;
  }
}

.filter-btn {
  width: 150px;
}

/* XS */
@media (min-width: 320px) and (max-width: 575px) {
  .scrollable-container {
    height: calc(60vh - 150px);
  }
}
</style>
