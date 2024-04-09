// calendarioController.js

class CalendarioController {
    calendario(req, res) {
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);

        if (isNaN(year) || isNaN(month)) {
            res.render('calendario', { calendarData: null });
            return;
        }

        const calendarData = generateCalendar(year, month);

        res.render('calendario', { calendarData: calendarData });
    }
}

function generateCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const numDays = endDate.getDate();
    const calendarData = {
        year: year,
        month: month,
        numDays: numDays,
        days: []
    };

    for (let day = 1; day <= numDays; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        calendarData.days.push({
            day: day,
            dayOfWeek: dayOfWeek
            // Adicione aqui a lógica para seleção de feriados e/ou folgas
        });
    }

    return calendarData;
}

module.exports = new CalendarioController();