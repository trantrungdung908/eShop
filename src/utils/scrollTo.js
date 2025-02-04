const scrollTo = (e) => {
  e?.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export default scrollTo;
