document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('create-appointment-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        try {
            const response = await fetch('http://localhost:3000/crear-cita', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            alert(`Cita creada exitosamente. Código: ${result.codigo}`);
        } catch (error) {
            alert('Error al crear la cita.');
            console.error(error);
        }
    });

    document.getElementById('consult-appointments-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        try {
            const response = await fetch(`http://localhost:3000/consultar-citas?startDate=${startDate}&endDate=${endDate}`);
            const appointments = await response.json();
            const resultsContainer = document.getElementById('appointments-results');
            resultsContainer.innerHTML = '';
            appointments.forEach(appointment => {
                resultsContainer.innerHTML += `<p>Cita: ${appointment.codigo}, Paciente: ${appointment.cc}, Fecha: ${appointment.date}, Estado: ${appointment.estado}</p>`;
            });
        } catch (error) {
            alert('Error al consultar las citas.');
            console.error(error);
        }
    });

    document.getElementById('cancel-appointment-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const appointmentCode = document.getElementById('appointment-code').value;
        try {
            const response = await fetch(`http://localhost:3000/cancelar-cita/${appointmentCode}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            alert(result.mensaje);
        } catch (error) {
            alert('Error al cancelar la cita.');
            console.error(error);
        }
    });
});
