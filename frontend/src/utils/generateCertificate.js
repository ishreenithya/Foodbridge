import jsPDF from 'jspdf';

const generateCertificate = (donation) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Food Donation Certificate", 20, 20);

  doc.setFontSize(12);
  doc.text(`This is to certify that ${donation.username} has generously donated food to the community.`, 20, 40);
  doc.text(`Food Item: ${donation.name}`, 20, 50);
  doc.text(`Quantity: ${donation.quantity}`, 20, 60);
  doc.text(`Location: ${donation.location}`, 20, 70);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);

  doc.text("Thank you for making a difference!", 20, 100);

  doc.save(`Donation_Certificate_${donation.name}.pdf`);
};

export default generateCertificate;
