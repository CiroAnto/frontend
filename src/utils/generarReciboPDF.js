import { jsPDF } from "jspdf";

export const generarReciboPDF = (cliente, pago) => {
  const doc = new jsPDF();
  
  doc.setFillColor(44, 62, 80); 
  doc.rect(0, 0, 210, 30, 'F'); 
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Comprobante de Pago", 105, 20, null, null, "center");
  
  doc.setTextColor(44, 62, 80);
  doc.setFontSize(14);
  doc.text("Internet TECHNOLOGY", 20, 50);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("¡Gracias por tu preferencia!", 20, 56);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Datos del Cliente:", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${cliente.name}`, 20, 83);
  doc.text(`Folio: ${cliente.clienteId}`, 20, 91);
  doc.text(`Paquete: ${cliente.paquete}`, 20, 99);
  
  doc.setFont("helvetica", "bold");
  doc.text("Detalles del Pago:", 110, 75);
  doc.setFont("helvetica", "normal");
  doc.text(`Fecha: ${new Date(pago.createdAt).toLocaleDateString()}`, 110, 83);
  doc.text(`Mes cubierto: ${pago.mesCorrespondiente}`, 110, 91);
  doc.text(`Método: ${pago.metodoPago}`, 110, 99);
  
  doc.setDrawColor(189, 195, 199);
  doc.line(20, 110, 190, 110);
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Total Pagado:", 110, 125);
  doc.setTextColor(39, 174, 96); // Verde éxito
  doc.text(`$${pago.montoPagado.toFixed(2)} MXN`, 150, 125);
  
  const nombreArchivo = `Recibo_${pago.mesCorrespondiente.replace(" ", "_")}_${cliente.clienteId}.pdf`;
  doc.save(nombreArchivo);
};