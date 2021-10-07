<template>
    <div class="home">
      <v-container>
        <br><br>
        
        <center>
          <h1 class="display-3 font-weight-black">Welcome to Bonfire, </h1>
          <h1 class="display-1 font-weight-black"> The Student Designed Organization Board </h1>
          <br>
          <h1 class="subtitle-2 font-weight-black"> Create, customize, and organize your schedule with Bonfire Cards. Take your education into your own hands by registering today.</h1>
          <br><br><br><br><br>
  
          <v-btn v-for="link in links" :key="link" :to="link.to" text>
            {{ link.name }}
          </v-btn>
        </center>
        <br><br><br><br><br><br>
      </v-container>
  
      <v-layout align-center justify-center>
        <v-img src="../assets/img/create.png" contain="true" height="150" width="150"> </v-img>
        <v-img src="../assets/img/customize.png" contain="true" height="150" width="150"> </v-img>
        <v-img src="../assets/img/organize.png" contain="true" height="150" width="150"> </v-img>
      </v-layout>
  
      <br><br>
      <v-layout align-center justify-center>
        Create your own classes, boards, and more &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        Customize your work, spaces, and more &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        Organize your school or work life &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      </v-layout>
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { name: "Register", to: "/register" },
          { name: "Sign In", to: "/signin" },
        ],
      };
    },
    mounted() {
      console.log(this.links);
    },
  };
  </script>