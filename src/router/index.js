import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    // component: Home
    redirect: "/frp"
  },
  {
    path: "/frp",
    component: Home,
    children: [
      {
        path: "",
        name: "faceIndex",
        component: () => import("../views/main/mainindex.vue")
      },
      {
        path: "trajectory",
        name: "faceTrajectory",
        component: () => import("../views/customer/trajectory.vue")
      },
      {
        path: "statistics",
        name: "facestatistics",
        component: () => import("../views/customer/statistics.vue")
      },
      {
        path: "heat",
        name: "faceheat",
        component: () => import("../views/customer/heat.vue")
      },
      {
        path: "comparison",
        name: "facecomparison",
        component: () => import("../views/security/comparison.vue")
      },
      {
        path: "playback",
        name: "faceplayback",
        component: () => import("../views/security/playback.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
