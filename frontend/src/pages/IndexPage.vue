<template>
  <q-page padding class="bg-grey-1">
    <div class="text-h4 q-mb-md text-primary text-weight-bold">
      Full-Stack Demo (Quasar + Express)
    </div>

    <q-card class="shadow-2" style="max-width: 600px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Data from Backend API</div>
      </q-card-section>

      <q-card-section>
        <div v-if="loading" class="text-center q-pa-lg">
          <q-spinner color="primary" size="3em" />
          <div class="q-mt-md">กำลังโหลดข้อมูลจาก Server...</div>
        </div>

        <q-list v-else bordered separator class="rounded-borders">
          <q-item>
            <q-item-section avatar><q-icon name="code" color="orange" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ apiData.git?.title }}</q-item-label>
              <q-item-label caption>{{ apiData.git?.detail }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar><q-icon name="layers" color="blue" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ apiData.docker?.title }}</q-item-label>
              <q-item-label caption>{{ apiData.docker?.detail }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Refresh Data" color="primary" icon="refresh" @click="fetchData" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiData = ref({ git: {}, docker: {} })
const loading = ref(true)

const fetchData = async () => {
  loading.value = true
  try {
    // อ่านค่าจากไฟล์ .env
    const url = import.meta.env.VITE_API_URL + '/api/demo'
    const response = await axios.get(url)
    apiData.value = response.data
  } catch (error) {
    console.error('API Error:', error)
    apiData.value = { 
      git: { title: 'Error', detail: 'เชื่อมต่อ Backend ไม่ได้' },
      docker: { title: 'Error', detail: 'ตรวจสอบว่ารัน Server หรือยัง' }
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>