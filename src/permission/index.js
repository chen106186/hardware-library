import router from "../router";

const whitePaths = ["/404", "/login"];

router.beforeEach((to, from, next) => {
  if (whitePaths.includes(to.path)) {
    next();
  } else {
    const token = sessionStorage.getItem("token");
    if (!token) {
      next("/login");
    } else if (from.path === to.path) {
      next(false);
    } else {
      next();
    }
  }
});
