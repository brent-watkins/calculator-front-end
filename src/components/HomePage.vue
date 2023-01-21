<template>
  <header>
    <h1>Your problems simplified.</h1>
  </header>
  <body>
    <div class="info">
      <p>Offering simple-to-use operations such as:</p>
      <ul>
        <li>Add</li>
        <li>Subtract</li>
        <li>Multiply</li>
        <li>Divide</li>
        <li>Square Root</li>
        <li>Random String Generation</li>
      </ul>
    </div>
    <div class="login">
      <p>Log in or create an account to get started!</p>
      <br />
      <v-btn href="/#/login">Get Started</v-btn>
    </div>
  </body>
</template>

<style scoped>
header {
  text-align: center;
}
.info {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.login {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
</style>
