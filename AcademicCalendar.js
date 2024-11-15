/*
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  const [events, setEvents] = useState({
    '2024-10-15': [
      { title: 'Math Exam', description: 'Chapter 1-5', time: '10:00 AM' },
      { title: 'Parent Meeting', description: 'School Hall', time: '2:00 PM' }
    ],
    '2024-10-17': [
      { title: 'Science Fair', description: 'Project Display', time: '9:00 AM' }
    ],
    '2024-10-18': [
      { title: 'Sports Day', description: 'Main Ground', time: '8:00 AM' },
      { title: 'Art Exhibition', description: 'Art Room', time: '1:00 PM' }
    ],
  });

  // Function to mark days with events
  const markedDates = () => {
    const dates = {};
    Object.keys(events).forEach(date => {
      dates[date] = {
        marked: true,
        dotColor: 'blue',
        selected: true,
        selectedColor: 'lightblue'
      };
    });
    return dates;
  };

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = events[selectedDate] || [];
    
    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ))
    ) : (
      <Text>No Events on this day</Text>
    );
  };

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates()}
        markingType={'multi-dot'}
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default AcademicCalendar;

// */























/*
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Multi-day event added in the events
  const [events, setEvents] = useState({
    '2024-10-15': [
      { title: 'Math Exam', description: 'Chapter 1-5', time: '10:00 AM' }
    ],
    '2024-10-17': [
      { title: 'Science Fair', description: 'Project Display', time: '9:00 AM' }
    ],
    '2024-10-18': [
      { title: 'Sports Day', description: 'Main Ground', time: '8:00 AM' },
      { title: 'Art Exhibition', description: 'Art Room', time: '1:00 PM' }
    ],
    // A multi-day event starting on 2024-10-19 and ending on 2024-10-21
    '2024-10-19': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: '9:00 AM - 2024-10-21' }
    ],
    '2024-10-20': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Continued from 2024-10-19' }
    ],
    '2024-10-21': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Ends today' }
    ]
  });

  // Multi-day events marked with a period
  const markedDates = () => {
    const dates = {
      '2024-10-15': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-17': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-18': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      // Multi-day event marking
      '2024-10-19': { startingDay: true, color: 'green', textColor: 'white' },
      '2024-10-20': { color: 'green', textColor: 'white' },
      '2024-10-21': { endingDay: true, color: 'green', textColor: 'white' }
    };
    return dates;
  };

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = events[selectedDate] || [];

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ))
    ) : (
      <Text>No Events on this day</Text>
    );
  };

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates()}
        markingType={'period'} // This enables marking for periods (multi-day events)
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default AcademicCalendar;
// */




/*
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Events data: single-day and multi-day events
  const [events, setEvents] = useState({
    '2024-10-15': [
      { title: 'Math Exam', description: 'Chapter 1-5', time: '10:00 AM' }
    ],
    '2024-10-17': [
      { title: 'Science Fair', description: 'Project Display', time: '9:00 AM' }
    ],
    '2024-10-18': [
      { title: 'Sports Day', description: 'Main Ground', time: '8:00 AM' },
      { title: 'Art Exhibition', description: 'Art Room', time: '1:00 PM' }
    ],
    '2024-10-19': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: '9:00 AM - 2024-10-21' }
    ],
    '2024-10-20': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Continued from 2024-10-19' },
      { title: 'Parent-Teacher Conference', description: 'School Auditorium', time: '11:00 AM' }
    ],
    '2024-10-21': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Ends today' }
    ],
  });

  // Multi-day events marked with a period
  const markedDates = () => {
    const dates = {
      '2024-10-15': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-17': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-18': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      // Multi-day event marking
      '2024-10-19': { startingDay: true, color: 'green', textColor: 'white' },
      '2024-10-20': { color: 'green', textColor: 'white', marked: true, dotColor: 'blue' }, // Single-day event combined with multi-day event
      '2024-10-21': { endingDay: true, color: 'green', textColor: 'white' }
    };
    return dates;
  };

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = events[selectedDate] || [];

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ))
    ) : (
      <Text>No Events on this day</Text>
    );
  };

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates()}
        markingType={'period'} // Allows period marking for multi-day events
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default AcademicCalendar;
// */


/*
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Events data: single-day and multi-day events
  const [events, setEvents] = useState({
    '2024-10-15': [
      { title: 'Math Exam', description: 'Chapter 1-5', time: '10:00 AM' }
    ],
    '2024-10-17': [
      { title: 'Science Fair', description: 'Project Display', time: '9:00 AM' }
    ],
    '2024-10-18': [
      { title: 'Sports Day', description: 'Main Ground', time: '8:00 AM' },
      { title: 'Art Exhibition', description: 'Art Room', time: '1:00 PM' }
    ],
    '2024-10-19': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: '9:00 AM - 2024-10-21' }
    ],
    '2024-10-20': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Continued from 2024-10-19' },
      { title: 'Parent-Teacher Conference', description: 'School Auditorium', time: '11:00 AM' }
    ],
    '2024-10-21': [
      { title: 'Field Trip', description: 'Museum Visit (Multi-day)', time: 'Ends today' }
    ],
  });

  // Multi-day events marked with a period
  const markedDates = () => {
    const dates = {
      '2024-10-15': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-17': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      '2024-10-18': { marked: true, dotColor: 'blue', selected: true, selectedColor: 'lightblue' },
      // Multi-day event marking
      '2024-10-19': { startingDay: true, color: 'green', textColor: 'white' },
      '2024-10-20': { color: 'green', textColor: 'white', marked: true, dotColor: 'blue' }, // Single-day event combined with multi-day event
      '2024-10-21': { endingDay: true, color: 'green', textColor: 'white' }
    };
    return dates;
  };

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = events[selectedDate] || [];

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ))
    ) : (
      <Text>No Events on this day</Text>
    );
  };

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates()}
        markingType={'period'} // Allows period marking for multi-day events
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default AcademicCalendar;

//  */









/*

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Holidays Data
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  // Events Data
  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "Red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "Green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "Green" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "Blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "Red" }
  ];

  // State to hold the marked dates
  const [markedDates, setMarkedDates] = useState({});

  // Combine holidays and events into markedDates
  useEffect(() => {
    const newMarkedDates = {};

    // Mark holidays (single day)
    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        marked: true,
        dotColor: 'blue',
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    // Mark events (single-day or multi-day)
    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        // Single-day event
        newMarkedDates[startDate] = {
          ...newMarkedDates[startDate], // Combine with existing marking if holiday/event is already present
          marked: true,
          dotColor: event.color,
        };
      } else {
        // Multi-day event
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          newMarkedDates[formattedDate] = {
            ...newMarkedDates[formattedDate], // Combine with existing marking if holiday/event is already present
            color: event.color,
            textColor: 'white',
            startingDay: currentDate.isSame(startDate),
            endingDay: currentDate.isSame(endDate),
          };
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = holidays.filter(h => h.date === selectedDate).concat(
      events.filter(e => moment(e.startDuration).isSameOrBefore(selectedDate) && moment(e.endDuration).isSameOrAfter(selectedDate))
    );

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.holidayName || event.title}</Text>
          <Text style={styles.eventDescription}>{event.type || 'Holiday'}</Text>
        </View>
      ))
    ) : (
      <Text>No Events or Holidays on this day</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'period'} // Allows period marking for multi-day events
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default AcademicCalendar;

//  */










/*

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Holidays Data
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  // Events Data
  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "Red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "Green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "Green" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "Blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "Red" }
  ];

  // State to hold the marked dates
  const [markedDates, setMarkedDates] = useState({});

  // Combine holidays and events into markedDates
  useEffect(() => {
    const newMarkedDates = {};

    // Mark holidays (single day)
    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        marked: true,
        dotColor: 'blue',
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    // Mark events (single-day or multi-day)
    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        // Single-day event
        newMarkedDates[startDate] = {
          ...newMarkedDates[startDate], // Combine with existing marking if holiday/event is already present
          marked: true,
          dotColor: event.color,
        };
      } else {
        // Multi-day event
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          newMarkedDates[formattedDate] = {
            ...newMarkedDates[formattedDate], // Combine with existing marking if holiday/event is already present
            color: event.color,
            textColor: 'white',
            startingDay: currentDate.isSame(startDate),
            endingDay: currentDate.isSame(endDate),
          };
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = holidays.filter(h => h.date === selectedDate).concat(
      events.filter(e => moment(e.startDuration).isSameOrBefore(selectedDate) && moment(e.endDuration).isSameOrAfter(selectedDate))
    );

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.holidayName || event.title}</Text>
          <Text style={styles.eventDescription}>{event.type || 'Holiday'}</Text>
        </View>
      ))
    ) : (
      <Text>No Events or Holidays on this day</Text>
    );
  };

  // Render a table of all holidays
  const renderHolidayTable = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.sectionTitle}>Holidays</Text>
      {holidays.map((holiday) => (
        <View key={holiday.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{holiday.holidayName}</Text>
          <Text style={styles.tableCell}>{holiday.date}</Text>
        </View>
      ))}
    </View>
  );

  // Render a table of all events
  const renderEventTable = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.sectionTitle}>Events</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{event.title}</Text>
          <Text style={styles.tableCell}>{event.startDuration}</Text>
          <Text style={styles.tableCell}>{event.endDuration}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'period'} // Allows period marking for multi-day events
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
        {renderHolidayTable()}
        {renderEventTable()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 14,
  },
});

export default AcademicCalendar;


//  */




// ok 👌

/*

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Holidays Data
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  // Events Data
  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "orange" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "red" }
  ];

  // State to hold the marked dates
  const [markedDates, setMarkedDates] = useState({});

  // Combine holidays and events into markedDates
  useEffect(() => {
    const newMarkedDates = {};

    // Mark holidays (single day)
    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    // Mark events (single-day or multi-day) with custom colors
    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        // Single-day event
        newMarkedDates[startDate] = {
          ...newMarkedDates[startDate], // Combine with existing marking if holiday/event is already present
          customStyles: {
            container: {
              backgroundColor: event.color,
            },
            text: {
              color: 'white',
            }
          }
        };
      } else {
        // Multi-day event
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          newMarkedDates[formattedDate] = {
            ...newMarkedDates[formattedDate], // Combine with existing marking if holiday/event is already present
            customStyles: {
              container: {
                backgroundColor: event.color,
              },
              text: {
                color: 'white',
              }
            }
          };
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = holidays.filter(h => h.date === selectedDate).concat(
      events.filter(e => moment(e.startDuration).isSameOrBefore(selectedDate) && moment(e.endDuration).isSameOrAfter(selectedDate))
    );

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.holidayName || event.title}</Text>
          <Text style={styles.eventDescription}>{event.type || 'Holiday'}</Text>
        </View>
      ))
    ) : (
      <Text>No Events or Holidays on this day</Text>
    );
  };

  // Render a table of all holidays
  const renderHolidayTable = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.sectionTitle}>Holidays</Text>
      {holidays.map((holiday) => (
        <View key={holiday.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{holiday.holidayName}</Text>
          <Text style={styles.tableCell}>{holiday.date}</Text>
        </View>
      ))}
    </View>
  );

  // Render a table of all events
  const renderEventTable = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.sectionTitle}>Events</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{event.title}</Text>
          <Text style={styles.tableCell}>{event.startDuration}</Text>
          <Text style={styles.tableCell}>{event.endDuration}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'custom'} // Using 'custom' to apply custom styles
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
        {renderHolidayTable()}
        {renderEventTable()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 14,
  },
});

export default AcademicCalendar;

//  */








/*

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  // Holidays Data
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  // Events Data
  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "orange" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "red" }
  ];

  const [markedDates, setMarkedDates] = useState({});

  // Combine holidays and events into markedDates
  useEffect(() => {
    const newMarkedDates = {};

    // Mark holidays (single day)
    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    // Mark events (single-day or multi-day) with custom colors
    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        // Single-day event
        if (newMarkedDates[startDate]) {
          // If there's already a marking (e.g., a holiday or another event), combine styles
          newMarkedDates[startDate] = {
            ...newMarkedDates[startDate],
            customStyles: {
              container: {
                backgroundColor: event.color, // Apply event color
                borderColor: 'yellow', // Optional border to differentiate multi-event
                borderWidth: 2,
              },
              text: {
                color: 'white',
              }
            }
          };
        } else {
          // If no previous marking, just set the event color
          newMarkedDates[startDate] = {
            customStyles: {
              container: {
                backgroundColor: event.color,
              },
              text: {
                color: 'white',
              }
            }
          };
        }
      } else {
        // Multi-day event
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');

          if (newMarkedDates[formattedDate]) {
            // Combine multi-day event with existing single-day marking
            newMarkedDates[formattedDate] = {
              ...newMarkedDates[formattedDate],
              customStyles: {
                container: {
                  backgroundColor: event.color,
                  borderColor: 'yellow', // Optional border for multi-event days
                  borderWidth: 2,
                },
                text: {
                  color: 'white',
                }
              }
            };
          } else {
            newMarkedDates[formattedDate] = {
              customStyles: {
                container: {
                  backgroundColor: event.color,
                },
                text: {
                  color: 'white',
                }
              }
            };
          }

          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  // Render events for the selected date
  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = holidays.filter(h => h.date === selectedDate).concat(
      events.filter(e => moment(e.startDuration).isSameOrBefore(selectedDate) && moment(e.endDuration).isSameOrAfter(selectedDate))
    );

    return dayEvents.length ? (
      dayEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.holidayName || event.title}</Text>
          <Text style={styles.eventDescription}>{event.type || 'Holiday'}</Text>
        </View>
      ))
    ) : (
      <Text>No Events or Holidays on this day</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'custom'} // Using 'custom' to apply custom styles
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  }
});

export default AcademicCalendar;

//  */







// /*

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "orange" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "red" },
  ];

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const newMarkedDates = {};

    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        if (newMarkedDates[startDate]) {
          newMarkedDates[startDate] = {
            ...newMarkedDates[startDate],
            customStyles: {
              container: {
                backgroundColor: event.color,
                borderColor: 'yellow',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              }
            }
          };
        } else {
          newMarkedDates[startDate] = {
            customStyles: {
              container: {
                backgroundColor: event.color,
              },
              text: {
                color: 'white',
              }
            }
          };
        }
      } else {
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          if (newMarkedDates[formattedDate]) {
            newMarkedDates[formattedDate] = {
              ...newMarkedDates[formattedDate],
              customStyles: {
                container: {
                  backgroundColor: event.color,
                  borderColor: 'yellow',
                  borderWidth: 2,
                },
                text: {
                  color: 'white',
                }
              }
            };
          } else {
            newMarkedDates[formattedDate] = {
              customStyles: {
                container: {
                  backgroundColor: event.color,
                },
                text: {
                  color: 'white',
                }
              }
            };
          }
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  const renderEvents = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const dayEvents = holidays.filter(h => h.date === selectedDate).concat(
      events.filter(e => moment(e.startDuration).isSameOrBefore(selectedDate) && moment(e.endDuration).isSameOrAfter(selectedDate))
    );

    return dayEvents.length ? (
      <View>
        <Text style={styles.sectionHeader}>Events and Holidays:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerText]}>Type</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Title</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Date</Text>
          </View>
          {dayEvents.map((event, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{event.holidayName ? 'Holiday' : event.type}</Text>
              <Text style={styles.tableCell}>{event.holidayName || event.title}</Text>
              <Text style={styles.tableCell}>{event.holidayName ? event.date : `${event.startDuration} to ${event.endDuration}`}</Text>
            </View>
          ))}
        </View>
      </View>
    ) : (
      <Text>No Events or Holidays on this day</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'custom'}
      />
      <ScrollView style={styles.eventList}>
        {renderEvents({ dateString: selectedDay })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default AcademicCalendar;

//  */




/*
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "orange" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "red" }
  ];

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const newMarkedDates = {};

    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        if (newMarkedDates[startDate]) {
          newMarkedDates[startDate] = {
            ...newMarkedDates[startDate],
            customStyles: {
              container: {
                backgroundColor: event.color,
                borderColor: 'yellow',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              }
            }
          };
        } else {
          newMarkedDates[startDate] = {
            customStyles: {
              container: {
                backgroundColor: event.color,
              },
              text: {
                color: 'white',
              }
            }
          };
        }
      } else {
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          if (newMarkedDates[formattedDate]) {
            newMarkedDates[formattedDate] = {
              ...newMarkedDates[formattedDate],
              customStyles: {
                container: {
                  backgroundColor: event.color,
                  borderColor: 'yellow',
                  borderWidth: 2,
                },
                text: {
                  color: 'white',
                }
              }
            };
          } else {
            newMarkedDates[formattedDate] = {
              customStyles: {
                container: {
                  backgroundColor: event.color,
                },
                text: {
                  color: 'white',
                }
              }
            };
          }
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'custom'}
      />
      <ScrollView style={styles.eventList}>
        <Text style={styles.sectionHeader}>All Events and Holidays:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerText]}>Type</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Title</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Date</Text>
          </View>

          {holidays.map((holiday) => (
            <View key={holiday.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>Holiday</Text>
              <Text style={styles.tableCell}>{holiday.holidayName}</Text>
              <Text style={styles.tableCell}>{holiday.date}</Text>
            </View>
          ))}

          {events.map((event) => (
            <View key={event.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{event.type}</Text>
              <Text style={styles.tableCell}>{event.title}</Text>
              <Text style={styles.tableCell}>
                {event.startDuration === event.endDuration
                  ? event.startDuration
                  : `${event.startDuration} to ${event.endDuration}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default AcademicCalendar;

//  */








/*
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AcademicCalendar = () => {
  const holidays = [
    { id: 1, holidayName: "Mahatma Gandhi Jayanti", date: "2024-10-02" },
    { id: 2, holidayName: "Karwachauth", date: "2024-10-16" },
    { id: 3, holidayName: "Deepawali", date: "2024-11-01" },
    { id: 4, holidayName: "Bhai Duj", date: "2024-11-03" },
    { id: 5, holidayName: "Christmas", date: "2024-12-25" },
    { id: 6, holidayName: "Diwali", date: "2024-10-23" },
    { id: 7, holidayName: "Test Oct Holiday", date: "2024-10-15" }
  ];

  const events = [
    { id: 14, title: "Meeting", type: "Meetings", startDuration: "2024-10-11", endDuration: "2024-10-11", color: "red" },
    { id: 15, title: "Sport day", type: "Events", startDuration: "2024-10-18", endDuration: "2024-10-18", color: "green" },
    { id: 16, title: "Annual function", type: "Events", startDuration: "2024-10-31", endDuration: "2024-10-31", color: "orange" },
    { id: 17, title: "Diwali holiday", type: "Holidays", startDuration: "2024-10-31", endDuration: "2024-11-03", color: "blue" },
    { id: 18, title: "PTM", type: "Meetings", startDuration: "2024-10-29", endDuration: "2024-10-31", color: "red" }
  ];

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const newMarkedDates = {};

    holidays.forEach((holiday) => {
      newMarkedDates[holiday.date] = {
        customStyles: {
          container: {
            backgroundColor: 'lightblue',
          },
          text: {
            color: 'white',
          }
        }
      };
    });

    events.forEach((event) => {
      const startDate = moment(event.startDuration).format('YYYY-MM-DD');
      const endDate = moment(event.endDuration).format('YYYY-MM-DD');

      if (startDate === endDate) {
        if (newMarkedDates[startDate]) {
          newMarkedDates[startDate] = {
            ...newMarkedDates[startDate],
            customStyles: {
              container: {
                backgroundColor: event.color,
                borderColor: 'yellow',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              }
            }
          };
        } else {
          newMarkedDates[startDate] = {
            customStyles: {
              container: {
                backgroundColor: event.color,
              },
              text: {
                color: 'white',
              }
            }
          };
        }
      } else {
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          if (newMarkedDates[formattedDate]) {
            newMarkedDates[formattedDate] = {
              ...newMarkedDates[formattedDate],
              customStyles: {
                container: {
                  backgroundColor: event.color,
                  borderColor: 'yellow',
                  borderWidth: 2,
                },
                text: {
                  color: 'white',
                }
              }
            };
          } else {
            newMarkedDates[formattedDate] = {
              customStyles: {
                container: {
                  backgroundColor: event.color,
                },
                text: {
                  color: 'white',
                }
              }
            };
          }
          currentDate = currentDate.add(1, 'days');
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={markedDates}
        markingType={'custom'}
      />
      <ScrollView style={styles.eventList}>
        <Text style={styles.sectionHeader}>Holidays:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerText]}>Holiday Name</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Date</Text>
          </View>
          {holidays.map((holiday) => (
            <View key={holiday.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{holiday.holidayName}</Text>
              <Text style={styles.tableCell}>{holiday.date}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Events:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerText]}>Type</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Title</Text>
            <Text style={[styles.tableCell, styles.headerText]}>Date</Text>
          </View>
          {events.map((event) => (
            <View key={event.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{event.type}</Text>
              <Text style={styles.tableCell}>{event.title}</Text>
              <Text style={styles.tableCell}>
                {event.startDuration === event.endDuration
                  ? event.startDuration
                  : `${event.startDuration} to ${event.endDuration}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default AcademicCalendar;
//  */