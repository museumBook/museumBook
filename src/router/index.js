import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import hallOfText from "@/components/hallOfText";
import hallOfIntro from "@/components/hallOfIntro";
import hallOfLetter from "@/components/hallOfLetter";
import hallOfEnding from "@/components/hallOfEnding";
import ustCilma from "@/components/ustCilma";
import starSbornic from "@/components/starSbornic";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/hallOfText",
      name: "hallOfText",
      component: hallOfText
    },
    {
      path: "/hallOfIntro",
      name: "hallOfIntro",
      component: hallOfIntro
    },
    {
      path: "/hallOfLetter",
      name: "hallOfLetter",
      component: hallOfLetter
    },
    {
      path: "/hallOfEnding",
      name: "hallOfEnding",
      component: hallOfEnding
    },
    {
      path: "/ustCilma",
      name: "ustCilma",
      component: ustCilma
    },
    {
      path: "/starSbornic",
      name: "starSbornic",
      component: starSbornic
    }
  ]
});
