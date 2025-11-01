document.addEventListener("DOMContentLoaded", () => {
  // Carrega a sidebar
  fetch("sidebar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("sidebar-container").innerHTML = data;
    });

  // Carrega campos padrão se existir
  const camposContainer = document.getElementById("campos-container");
  if (camposContainer) {
    fetch("campos.html")
      .then(response => response.text())
      .then(data => {
        camposContainer.innerHTML = data;
      });
  }

  // Carrega campos de moto se existir
  const camposMotoContainer = document.getElementById("camposMoto-container");
  if (camposMotoContainer) {
    fetch("camposMoto.html")
      .then(response => response.text())
      .then(data => {
        camposMotoContainer.innerHTML = data;
      });
  }

  // Botão PDF
  const pagina = document.querySelector(".pagina");
  const botaoPDF = document.getElementById("btn-pdf");

  if (botaoPDF && pagina) {
    botaoPDF.addEventListener("click", () => {
      botaoPDF.style.visibility = "hidden";

      setTimeout(() => {
        html2canvas(pagina).then(canvas => {
          const imgData = canvas.toDataURL("image/png");
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF("p", "mm", "a4");

          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgProps = pdf.getImageProperties(imgData);
          const imgWidth = pageWidth;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("orcamento.pdf");

          botaoPDF.style.visibility = "visible";
        });
      }, 100);
    });
  }
});