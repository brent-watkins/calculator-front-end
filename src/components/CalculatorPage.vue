<script setup>
import { ref, watch } from "vue";

const props = defineProps(["loggedIn", "username"]);

const balance = ref();
const form = ref(false);
const loading = ref(false);
const operations = [
  "Add",
  "Subtract",
  "Multiply",
  "Divide",
  "Square Root",
  "Random String",
];
const operands = ref([]);
const result = ref("");
const selectedOption = ref("");
const url = ref("");

function addOperand() {
  operands.value.push({ num: "" });
}

function getBalance() {
  fetch("http://127.0.0.1:8000/api/balance/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: props.username }),
  })
    .then((response) => response.json())
    .then((data) => {
      balance.value = data;
    })
    .catch((error) => {
      console.log(
        "Encountered an error while attempting to get balance:",
        error
      );
    });
}

// Get the balance when the page loads
getBalance();

function removeOperand(removeIndex) {
  operands.value = operands.value.filter(
    (operand, index) => index !== removeIndex
  );
}

function onSubmit() {
  loading.value = true;
  const operationBody = operands.value.map((operand) => operand.num);
  fetch(url.value, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operands: operationBody,
      username: props.username,
    }),
    // credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      result.value = data;
    })
    .catch((error) => {
      console.log(
        "Encountered an error while submitting operation request:",
        error
      );
    })
    .finally(() => {
      loading.value = false;
      getBalance();
    });
}

watch(selectedOption, () => {
  result.value = ""; // Clear the result
  // Set the required operands and the url
  switch (selectedOption.value) {
    case "Add":
      operands.value = [{ num: "" }, { num: "" }];
      url.value = "http://127.0.0.1:8000/api/add/";
      break;
    case "Divide":
      operands.value = [{ num: "" }, { num: "" }];
      url.value = "http://127.0.0.1:8000/api/divide/";
      break;
    case "Multiply":
      operands.value = [{ num: "" }, { num: "" }];
      url.value = "http://127.0.0.1:8000/api/multiply/";
      break;
    case "Random String":
      operands.value = [];
      url.value = "http://127.0.0.1:8000/api/random_string/";
      break;
    case "Square Root":
      operands.value = [{ num: "" }];
      url.value = "http://127.0.0.1:8000/api/square_root/";
      break;
    case "Subtract":
      operands.value = [{ num: "" }, { num: "" }];
      url.value = "http://127.0.0.1:8000/api/subtract/";
      break;
    default:
      operands.value = [];
      url.value = "";
  }
});
</script>

<template>
  <header>
    <div v-if="props.loggedIn">
      <h1>Welcome to the Web Calculator!</h1>
      <h3>Your balance currently is: {{ balance }}</h3>
      <v-alert v-if="balance < 3" type="warning">
        Your balance is low. You might not be able to perform certain
        operations.
      </v-alert>
    </div>
    <div v-else>
      <h1>You need to log in before accessing this page.</h1>
    </div>
  </header>
  <body v-if="props.loggedIn">
    <h4>What would you like to do?</h4>
    <br />
    <div class="selection">
      <v-select
        label="Operation"
        :items="operations"
        v-model="selectedOption"
      ></v-select>
      <div class="operands" v-if="selectedOption !== ''">
        <v-form v-model="form" @submit.prevent="onSubmit">
          <div
            v-if="
              selectedOption !== 'Square Root' &&
              selectedOption !== 'Random String'
            "
            class="multiple"
          >
            <v-btn @click="addOperand">Add another operand</v-btn>
            <br />
            <br />
            <hr />
            <br />
            <div v-for="(operand, index) in operands" :key="index">
              <div class="operand">
                <v-text-field
                  label="Operand"
                  :rules="[
                    () => !!operands[index].num || 'This field is required',
                  ]"
                  type="number"
                  v-model="operands[index].num"
                ></v-text-field>
                <v-btn
                  @click="removeOperand(index)"
                  :disabled="operands.length < 3"
                  icon="mdi-close"
                >
                </v-btn>
              </div>
            </div>
          </div>
          <v-text-field
            :rules="[
              () => !!operands[0].num || 'This field is required',
              () => !!operands[0].num >= 0 || 'Value must be non-negative',
            ]"
            type="number"
            v-else-if="selectedOption === 'Square Root'"
            v-model="operands[0].num"
          ></v-text-field>
          <v-btn
            @click="onSubmit"
            :disabled="
              balance === 0
                ? true
                : selectedOption !== 'Random String'
                ? !form
                : false
            "
            :loading="loading"
          >
            Submit
          </v-btn>
        </v-form>
      </div>
    </div>
    <br />
    <div v-if="selectedOption !== ''">
      <p><strong>Result:</strong> {{ result }}</p>
    </div>
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
header {
  text-align: center;
}
.operand {
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.selection {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 25%;
  max-width: 75%;
}
</style>
