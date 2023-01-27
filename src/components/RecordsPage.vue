<script setup>
import { computed, ref } from "vue";

const props = defineProps(["loggedIn", "username"]);

const allRecords = ref([]);
const currentPage = ref(1);
const filter = ref("");
const loading = ref(false);
const rowsPerPage = ref(10);

const rowsPerPageOptions = [10, 25, 50, 75, 100];

const filteredRecords = computed(() => {
  if (filter.value) {
    return allRecords.value
      .filter((record) => {
        return Object.keys(record).some((key) =>
          record[key].toString().includes(filter.value)
        );
      })
      .filter((record) => !record.deleted)
      .slice(
        (currentPage.value - 1) * rowsPerPage.value,
        currentPage.value * rowsPerPage.value
      );
  } else {
    return allRecords.value.filter((record) => !record.deleted);
  }
});
const numPages = computed(() => {
  return filteredRecords.value.length / rowsPerPage.value;
});

function getRecords() {
  loading.value = true;
  fetch("http://127.0.0.1:8000/api/records/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: props.username }),
  })
    .then((response) => response.json())
    .then((data) => {
      allRecords.value = data.records;
    })
    .catch((error) => {
      console.log(
        "Encountered an error while attempting to retrieve records:",
        error
      );
    })
    .finally(() => {
      loading.value = false;
    });
}

// Get records when the page first loads
getRecords();

function hideRecord(recordId) {
  fetch("http://127.0.0.1:8000/api/records/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: props.username, record: recordId }),
  })
    .catch((error) => {
      console.log(
        "Encountered an error while attempting to retrieve records:",
        error
      );
    })
    .finally(() => {
      loading.value = false;
      getRecords();
    });
}
</script>

<template>
  <header>
    <h1>Records</h1>
  </header>
  <body>
    <v-btn @click="getRecords">Refresh</v-btn>
    <v-pagination :length="numPages" v-model="currentPage"></v-pagination>
    <div class="filter">
      <v-text-field label="Filter / Search" v-model="filter">
        <template v-slot:details>
          <p>Search or filter records within the table</p>
        </template>
      </v-text-field>
      &nbsp;
      <v-select :items="rowsPerPageOptions" v-model="rowsPerPage">
        <template v-slot:details>
          <p>Records per page</p>
        </template>
      </v-select>
    </div>
    <v-table v-model="filteredRecords">
      <thead>
        <tr>
          <th>Date</th>
          <th>Result</th>
          <th>Amount</th>
          <th>Your Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.date">
          <td>{{ record.date }}</td>
          <td>{{ record.operation_response }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.user_balance }}</td>
          <td><v-btn @click="hideRecord(record.id)">Hide</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </body>
</template>

<style scoped>
body {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
header {
  text-align: center;
}
</style>
