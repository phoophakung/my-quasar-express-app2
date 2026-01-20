&lt;template&gt;
&lt;q-page padding&gt;
&lt;div class=&quot;text-h4 q-mb-md&quot;&gt;
Advanced Full-Stack Demo (Quasar + Express)
&lt;/div&gt;
&lt;!-- Git Workflow (จากตัวอย่างก่อน) --&gt;
&lt;q-card class=&quot;q-mb-md&quot;&gt;
&lt;q-card-section&gt;
&lt;div class=&quot;text-h6&quot;&gt;Git Workflow&lt;/div&gt;
&lt;q-list bordered separator class=&quot;q-mt-sm&quot;&gt;
&lt;q-item v-for=&quot;(step, index) in gitSteps&quot; :key=&quot;index&quot;&gt;
&lt;q-item-section avatar&gt;
&lt;q-badge&gt;{{ index + 1 }}&lt;/q-badge&gt;
&lt;/q-item-section&gt;
&lt;q-item-section&gt;
&lt;q-item-label&gt;{{ step.title }}&lt;/q-item-label&gt;
&lt;q-item-label caption&gt;{{ step.detail }}&lt;/q-item-label&gt;
&lt;/q-item-section&gt;
&lt;/q-item&gt;
&lt;/q-list&gt;
&lt;/q-card-section&gt;
&lt;/q-card&gt;
&lt;!-- Docker Concepts (จากตัวอย่างก่อน) --&gt;
&lt;q-card class=&quot;q-mb-md&quot;&gt;
&lt;q-card-section&gt;
&lt;div class=&quot;text-h6&quot;&gt;Docker Concepts&lt;/div&gt;
&lt;q-list bordered separator class=&quot;q-mt-sm&quot;&gt;
&lt;q-item v-for=&quot;(item, index) in dockerItems&quot; :key=&quot;index&quot;&gt;
&lt;q-item-section&gt;
&lt;q-item-label&gt;{{ item.title }}&lt;/q-item-label&gt;
&lt;q-item-label caption&gt;{{ item.detail }}&lt;/q-item-label&gt;
&lt;/q-item-section&gt;
&lt;/q-item&gt;
&lt;/q-list&gt;

&lt;/q-card-section&gt;
&lt;/q-card&gt;
&lt;!-- New: API Data from Backend --&gt;
&lt;q-card&gt;
&lt;q-card-section&gt;
&lt;div class=&quot;text-h6&quot;&gt;Data from Backend API&lt;/div&gt;
&lt;q-spinner v-if=&quot;loading&quot; color=&quot;primary&quot; size=&quot;2em&quot; /&gt;
&lt;q-list v-else bordered separator class=&quot;q-mt-sm&quot;&gt;
&lt;q-item&gt;
&lt;q-item-section&gt;
&lt;q-item-label&gt;Advanced Git&lt;/q-item-label&gt;
&lt;q-item-label caption&gt;{{ apiData.git.detail }}&lt;/q-item-label&gt;
&lt;/q-item-section&gt;
&lt;/q-item&gt;
&lt;q-item&gt;
&lt;q-item-section&gt;
&lt;q-item-label&gt;Advanced Docker&lt;/q-item-label&gt;
&lt;q-item-label caption&gt;{{ apiData.docker.detail }}&lt;/q-item-label&gt;
&lt;/q-item-section&gt;
&lt;/q-item&gt;
&lt;/q-list&gt;
&lt;q-btn v-if=&quot;!loading&quot; color=&quot;primary&quot; @click=&quot;fetchData&quot;&gt;Refresh Data&lt;/q-btn&gt;
&lt;/q-card-section&gt;
&lt;/q-card&gt;
&lt;/q-page&gt;
&lt;/template&gt;
&lt;script setup&gt;
import { ref, onMounted } from &#39;vue&#39;;
import axios from &#39;axios&#39;;
// จากตัวอย่างก่อน
const gitSteps = [ /* ... (same as before) */ ];
const dockerItems = [ /* ... (same as before) */ ];
const apiData = ref({ git: {}, docker: {} });
const loading = ref(true);

const fetchData = async () =&gt; {
loading.value = true;
try {
const response = await axios.get(import.meta.env.VITE_API_URL + &#39;/api/demo&#39;);
apiData.value = response.data;
} catch (error) {
console.error(&#39;API Error:&#39;, error);
} finally {
loading.value = false;
}
};
onMounted(fetchData);
&lt;/script&gt;