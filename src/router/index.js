import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";

import heritage from "@/components/heritage/main";
import heritage_hall_1 from "@/components/heritage/video_hall/1_hall";
import heritage_hall_2 from "@/components/heritage/video_hall/2_hall";
import heritage_hall_3 from "@/components/heritage/video_hall/3_hall";
import heritage_hall_4 from "@/components/heritage/video_hall/4_hall";

import ust_cilma from "@/components/ust_cilma/main";
import ust_cilma_hall_1 from "@/components/ust_cilma/video_hall/1_hall";
import ust_cilma_hall_2 from "@/components/ust_cilma/video_hall/2_hall";
// import ust_cilma_hall_3 from "@/components/ust_cilma/video_hall/3_hall";

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
      path: "/heritage",
      name: "heritage",
      component: heritage
    },
    {
      path: "/heritage/hall/1",
      name: "heritage/hall/1",
      component: heritage_hall_1
    },
    {
      path: "/heritage/hall/2",
      name: "heritage/hall/2",
      component: heritage_hall_2
    },
    {
      path: "/heritage/hall/3",
      name: "heritage/hall/3",
      component: heritage_hall_3
    },
    {
      path: "/heritage/hall/4",
      name: "heritage/hall/4",
      component: heritage_hall_4
    },
    {
      path: "/ust-cilma",
      name: "ust_cilma",
      component: ust_cilma
    },
    {
      path: "/ust-cilma/hall/1",
      name: "ust_cilma/hall/1",
      component: ust_cilma_hall_1
    },
    {
      path: "/ust-cilma/hall/2",
      name: "ust_cilma/hall/2",
      component: ust_cilma_hall_2
    }
  ]
});
