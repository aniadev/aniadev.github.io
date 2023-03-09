<template>
  <SwitchTheme class="switch ml-6"> </SwitchTheme>
  <el-button type="danger" class="mt-6">Danger</el-button>
  <div class="block text-center mt-8">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <p class="">ahihi</p>
  <router-link to="/login">LOGIN</router-link>
  <router-view />
</template>

<script setup lang="ts">
  import getRepository from './services'
  import UserRepository from './services/repositories/user'
  import { onMounted } from 'vue'
  import SwitchTheme from './components/SwitchTheme.vue'
  // import { IAppTheme } from './interfaces/store.interface'
  // import { peeUseStore } from './store'

  // const peeStore = peeUseStore()
  const userApi: UserRepository = getRepository('user')

  onMounted(() => {
    callApi()
  })

  async function callApi() {
    const rs = await userApi.getAllUsers()
    console.log('>>> / file: App.vue:30 / rs:', rs)
  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
