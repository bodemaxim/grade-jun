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

interface ITopicsVisible {
  youtrack: boolean
  git: boolean
  infrastructure: boolean
  softSkills: boolean
  general: boolean
  css: boolean
  javascript: boolean
  vue: boolean
}

const topicsVisibleDefault = {
  youtrack: false,
  git: false,
  infrastructure: false,
  softSkills: false,
  general: false,
  css: false,
  javascript: false,
  vue: false
}

const topicsVisible = ref(topicsVisibleDefault)

const toggleTopicVisibility = <T extends keyof ITopicsVisible>(key: T) => {
  const newValue = !topicsVisible.value[key]
  console.log('newValue', newValue)
  topicsVisible.value = JSON.parse(JSON.stringify(topicsVisibleDefault))
  console.log('topicsVisible', topicsVisible.value)
  topicsVisible.value[key] = newValue
  console.log('topicsVisible.value[key]', topicsVisible.value[key])
}

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

const generalYoutrackQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.generalYoutrack)
)

const generalGitQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.generalGit)
)

const generalInfrustructureQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.generalInfrastructure)
)

const generalSoftSkillsQuestions = computed(() =>
  questions.value.filter((item) => item.topic === Topics.generalSoftSkills)
)

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
  <div>
    <div class="panel-content">
      <h2 class="topic-group mb-5">Общие компетенции Младший специалист</h2>
      <h3 @click="toggleTopicVisibility('youtrack')" class="topic-title">Youtrack</h3>
      <ol v-if="topicsVisible.youtrack">
        <li
          v-for="item in generalYoutrackQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('git')" class="topic-title">Git</h3>
      <ol v-if="topicsVisible.git">
        <li
          v-for="item in generalGitQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('infrastructure')" class="topic-title">Инфраструктура</h3>
      <ol v-if="topicsVisible.infrastructure">
        <li
          v-for="item in generalInfrustructureQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('softSkills')" class="topic-title">Soft skills</h3>
      <ol v-if="topicsVisible.softSkills">
        <li
          v-for="item in generalSoftSkillsQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>

      <h2 class="topic-group mt-10 mb-5">Навыки Frontend</h2>
      <h3 @click="toggleTopicVisibility('general')" class="topic-title">Общетехнические навыки</h3>
      <ol v-if="topicsVisible.general">
        <li
          v-for="item in frontGeneralQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('css')" class="topic-title">Верстка</h3>
      <ol v-if="topicsVisible.css">
        <li
          v-for="item in frontCssQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('javascript')" class="topic-title">JavaScript</h3>
      <ol v-if="topicsVisible.javascript">
        <li
          v-for="item in frontJsQuestions"
          :key="item.id"
          @click="viewAnswer(item)"
          class="question-item"
        >
          {{ item.question }}
        </li>
      </ol>
      <h3 @click="toggleTopicVisibility('vue')" class="topic-title">VueJS</h3>
      <ol v-if="topicsVisible.vue">
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
  </div>
</template>

<style lang="scss" scoped>
$font-family-main: 'Montserrat', sans-serif;
$transition-time: 0.2s;
$hover-background-color: var(--bg-darker);

* {
  color: var(--grey-10);
}

h2 {
  font-size: 20px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

.panel-content {
  font-family: $font-family-main;
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  padding: 30px 15px 10px;
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

.topic-group {
  color: lightgreen;
}

.topic-title {
  cursor: pointer;
}

/* XS */
@media (min-width: 320px) and (max-width: 575px) {
  .scrollable-container {
    height: calc(60vh - 150px);
  }
}
</style>
