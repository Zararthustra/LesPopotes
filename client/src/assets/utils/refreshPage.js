export const refreshPage = (scrollTop) => {
  if (scrollTop) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
  window.location.reload(false);
};
