// Firebase config (تهيئتها من مشروعك)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP-default-rtdb.firebaseio.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reportForm');
  const reportsList = document.getElementById('reportsList');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const report = {
        name: form.name.value,
        contact: form.contact.value,
        type: form.type.value,
        location: form.location.value,
        desc: form.desc.value,
        date: new Date().toLocaleString()
      };
      const key = db.ref('reports').push().key;
      db.ref('reports/' + key).set(report).then(() => {
        alert('Report submitted successfully!');
        form.reset();
        window.location = 'index.html';
      });
    });
  }

  if (reportsList) {
    db.ref('reports').orderByChild('date').limitToLast(10).on('value', snapshot => {
      reportsList.innerHTML = '';
      snapshot.forEach(child => {
        const r = child.val();
        reportsList.innerHTML = `<div>
          <strong>${r.name}</strong> (${r.type})<br>
          📍 ${r.location} 🗓️ ${r.date}<br>
          🔗 ${r.contact}<br>
          <em>${r.desc}</em><hr>
        </div>` + reportsList.innerHTML;
      });
    });
  }
});
