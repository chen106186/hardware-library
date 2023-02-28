import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout";

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ "@/views/login"),
  },
  {
    path: "/",
    component: Layout,
    hidden: true,
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    hidden: false,
    redirect: "/home/index",
    component: Layout,
    meta: { title: "Hardware library", role: ["1", "6"] },
    children: [
      {
        path: "index",
        name: "HomeIndex",
        component: () => import(/* webpackChunkName: "about" */ "@/views/home"),
        meta: { title: "Hardware library" },
      },
      {
        path: "detail",
        name: "Detail",
        component: () => import("@/views/detail"),
      },
    ],
  },
  {
    path: "/components",
    name: "components",
    component: Layout,
    redirect: "/components/index",
    hidden: false,
    meta: { title: "My components", role: ["6"] },
    children: [
      {
        path: "index",
        name: "ComponentsIndex",
        component: () => import("@/views/components"),
      },
    ],
  },
  {
    path: "/proposal",
    name: "Proposal",
    redirect: "/proposal/index",
    component: Layout,
    hidden: false,
    meta: { title: "My proposals", role: ["6"] },
    children: [
      {
        path: "index",
        name: "ProposalIndex",
        component: () => import("@/views/proposal"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    redirect: "/cart/index",
    hidden: false,
    component: Layout,
    meta: { title: "My Cart", role: ["6"] },
    children: [
      {
        path: "index",
        name: "CartIndex",
        component: () => import("@/views/cart"),
      },
    ],
  },
  {
    path: "/propose",
    name: "Propose",
    redirect: "/propose/index",
    hidden: false,
    component: Layout,
    meta: { title: "Propose Component", role: ["6"] },
    children: [
      {
        path: "index",
        name: "ProposeIndex",
        component: () => import("@/views/propose"),
      },
    ],
  },
  {
    path: "/faq",
    name: "Faq",
    redirect: "/faq/index",
    component: Layout,
    hidden: false,
    meta: { title: "FAQ", role: ["6"] },
    children: [
      {
        path: "index",
        name: "FaqIndex",
        component: () => import(/* webpackChunkName: "about" */ "@/views/faq"),
      },
    ],
  },
  {
    path: "/awaiting-reservations",
    name: "AwaitingReservations",
    redirect: "/awaiting-reservations/index",
    hidden: false,
    component: Layout,
    meta: { title: "Awaiting Reservations", role: "1" },
    children: [
      {
        path: "index",
        name: "AwaitingReservationsIndex",
        component: () => import("@/views/manage/awaiting-reservations"),
      },
    ],
  },
  {
    path: "/awaiting-collection",
    name: "AwaitingCollection",
    redirect: "/awaiting-collection/index",
    hidden: false,
    component: Layout,
    meta: { title: "Awaiting Collection", role: ["1"] },
    children: [
      {
        path: "index",
        name: "AwaitingCollectionIndex",
        component: () => import("@/views/manage/awaiting-collection"),
      },
    ],
  },
  {
    path: "/current-bookings",
    name: "CurrentBookings",
    redirect: "/current-bookings/index",
    hidden: false,
    component: Layout,
    meta: { title: "Current Bookings", role: ["1"] },
    children: [
      {
        path: "index",
        name: "CurrentBookingsIndex",
        component: () => import("@/views/manage/current-bookings"),
      },
    ],
  },
  {
    path: "/past-bookings",
    name: "PastBookings",
    redirect: "/past-bookings/index",
    hidden: false,
    component: Layout,
    meta: { title: "Past Bookings", role: ["1"] },
    children: [
      {
        path: "index",
        name: "PastBookingsIndex",
        component: () => import("@/views/manage/past-bookings"),
      },
    ],
  },
  {
    path: "/proposals-manage",
    name: "ProposalsManage",
    redirect: "/proposals-manage/index",
    hidden: false,
    component: Layout,
    meta: { title: "Proposals", role: ["1"] },
    children: [
      {
        path: "index",
        name: "ProposalsManageIndex",
        component: () => import("@/views/manage/proposals"),
      },
    ],
  },
  {
    path: "/past-proposals",
    name: "PastProposals",
    redirect: "/past-proposals/index",
    hidden: false,
    component: Layout,
    meta: { title: "Past Proposals", role: ["1"] },
    children: [
      {
        path: "index",
        name: "PastProposalsIndex",
        component: () => import("@/views/manage/past-proposals"),
      },
    ],
  },
  {
    path: "/add-component",
    name: "AddComponent",
    redirect: "/add-component/index",
    hidden: false,
    component: Layout,
    meta: { title: "Add Component", role: ["1"] },
    children: [
      {
        path: "index",
        name: "AddComponentIndex",
        component: () => import("@/views/manage/add-component"),
      },
    ],
  },
  {
    path: "/admin-members",
    name: "AdminMembers",
    redirect: "/admin-members/index",
    hidden: false,
    component: Layout,
    meta: { title: "Admin Members", role: ["1"] },
    children: [
      {
        path: "index",
        name: "AdminMembersIndex",
        component: () => import("@/views/manage/admin-members"),
      },
    ],
  },
  {
    path: "/statistics",
    name: "Statistics",
    redirect: "/statistics/index",
    hidden: false,
    component: Layout,
    meta: { title: "Statistics", role: ["1"] },
    children: [
      {
        path: "index",
        name: "StatisticsIndex",
        component: () => import("@/views/manage/statistics"),
      },
    ],
  },
  {
    path: "/faq-manage",
    name: "FaqManage",
    redirect: "/faq-manage/index",
    hidden: false,
    component: Layout,
    meta: { title: "FAQ", role: ["1"] },
    children: [
      {
        path: "index",
        name: "FaqManageIndex",
        component: () => import("@/views/manage/faq"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    hidden: true,
    component: () => import("@/views/404"),
  },
  {
    path: "/:catchAll(.*)",
    hidden: true,
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
