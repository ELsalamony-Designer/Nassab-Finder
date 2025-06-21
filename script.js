document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reportForm');
  const reportsList = document.getElementById('reportsList');

  // Save report
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const report = {
        name: form.name.value,
        contact: form.contact.value,
        type: form.type.value,
        location: form.location.value,
        desc: form.desc.value,
        date: new Date().toLocaleDateString()
      };

      let reports = JSON.parse(localStorage.getItem('scamReports')) || [];
      reports.unshift(report);
      localStorage.setItem('scamReports', JSON.stringify(reports));

      alert('Report submitted!');
      form.reset();
    });
  }

  // Show reports
  if (reportsList) {
    const reports = JSON.parse(localStorage.getItem('scamReports')) || [];

    reports.slice(0, 10).forEach(report => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${report.name}</strong> (${report.type}) <br>
        📍 ${report.location} <br>
        🗓️ ${report.date}<br>
        🔗 ${report.contact}<br>
        <em>${report.desc}</em>
        <hr>
      `;
      reportsList.appendChild(div);
    });
  }
});
