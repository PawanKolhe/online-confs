let eventsCal = new Calendar({
  id: '#events-calendar',
  theme: 'glass',
  primaryColor: '#FF6E35',
  headerBackgroundColor: '#FF6E35',
  // weekdayType: 'long-lower',
  dateChanged: (currentDate, events) => {
    const events_display = document.querySelector('.events-display');
    let events_html = '';
    console.log(currentDate, events);
    events.forEach(event => {
      events_html += `
        <div class="event">
          <div class="event-left">
            <div class="event-title">${event.name}</div>
            <a href="${event.url}" target="_blank" class="event-url">${event.url}</a>
            <div class="event-topics">${
              event.topics.map(topic => {
                return `
                  <span class="event-topic">${topic}</span>
                `;
              }).join('')
            }</div>
          </div>
          <div class="event-right ${event.free ? 'event-free' : 'event-paid'}">
            <div class="${event.free ? 'event-free-text' : 'event-paid-text'}">${
              event.free ? 'FREE' : 'PAID'
            }</div>
          </div>
        </div>
      `
    });
    if(events_html) {
      events_display.innerHTML = events_html;
    } else {
      events_display.innerHTML = '<div class="no-events-text">No events on this day :(</div>';
    }
  }
})

fetch('/api/events').then(res => res.json()).then(data => {
  events = data;
  eventsCal.setEventsData(events);
  if(Object.keys(eventsCal.eventDayMap).length === 0) {
    eventsCal.updateCurrentDate(1);
  }
});
