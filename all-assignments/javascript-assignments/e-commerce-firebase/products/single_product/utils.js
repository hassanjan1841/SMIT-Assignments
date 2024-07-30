export const toggleNavbar = () => {
  const closeNavBtn = document.getElementById("closeNavBtn");
  const mobileNav = document.getElementById("mobileNav");
  const burgerBtn = document.getElementById("burgerBtn");
  mobileNav.style.display = "none";
  burgerBtn.addEventListener("click", () => {
    mobileNav.style.display = "flex";
  });
  closeNavBtn.addEventListener("click", () => {
    mobileNav.style.display = "none";
  });
};
