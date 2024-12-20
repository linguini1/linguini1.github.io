function recolour_pulsar(id) {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const pulsar = document.getElementById(id);

  let pulsar_rects = pulsar.contentDocument.getElementsByClassName("pulsar");
  for (let i = 0; i < pulsar_rects.length; i++) {
    pulsar_rects[i].style.fill = styles.getPropertyValue("--fg").trim();
  }
}
