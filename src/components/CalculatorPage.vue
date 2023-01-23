<script setup>
import { ref, watch } from "vue";

const balance = ref(10);
const result = ref("");
const selectedOption = ref("");
const operations = [
  "Add",
  "Subtract",
  "Multiply",
  "Divide",
  "Square Root",
  "Random String",
];
const operands = ref([]);

function addOperand() {
  operands.value.push({ num: "" });
}

function removeOperand(removeIndex) {
  console.log(operands.value.filter((operand, index) => index !== removeIndex));
  operands.value = operands.value.filter(
    (operand, index) => index !== removeIndex
  );
}

watch(selectedOption, () => {
  switch (selectedOption.value) {
    case "Add":
      operands.value = [{ num: "" }, { num: "" }];
      break;
    case "Subtract":
      operands.value = [{ num: "" }, { num: "" }];
      break;
    case "Multiply":
      operands.value = [{ num: "" }, { num: "" }];
      break;
    case "Divide":
      operands.value = [{ num: "" }, { num: "" }];
      break;
    case "Square Root":
      operands.value = [{ num: "" }];
      break;
    case "Random String":
      operands.value = [];
      break;
    default:
      operands.value = [];
  }
});
watch(selectedOption, () => {
  result.value = "";
});
</script>

<template>
  <header>
    <h1>Welcome to the Web Calculator!</h1>
    <h3>Your balance currently is: {{ balance }}</h3>
    <v-alert v-if="balance === 0" type="warning">
      Your balance has reached 0. You will not be able to make any new requests.
    </v-alert>
  </header>
  <body>
    <h4>What would you like to do?</h4>
    <br />
    <div class="selection">
      <v-select
        label="Operation"
        :items="operations"
        v-model="selectedOption"
      ></v-select>
      <div class="operands" v-if="selectedOption !== ''">
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
                required
                :rules="[() => !!operands[index] || 'This field is required']"
                type="number"
                v-model="operands[index]"
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
          required
          type="number"
          v-else-if="selectedOption === 'Square Root'"
        ></v-text-field>
        <v-btn>Submit</v-btn>
      </div>
    </div>
    <div>
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
