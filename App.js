import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import {LocaleConfig} from 'react-native-calendars';
import dateutils from 'react-native-calendars/src/dateutils';

LocaleConfig.locales['en'] = {
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthNamesShort: ['Jan.','Feb.','Mar','Apr','May','Jun','Jul.','Aug','Sept.','Oct.','Nov.','Dec.'],
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.']
};

LocaleConfig.defaultLocale = 'en';
var currentDate = new Date()

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      markedDatesOfMonth : []
    }

    this.changeMonth = this.changeMonth.bind(this)
  }

  changeMonth(month) {
    this.getNumsOfDateInMonth(new Date(month.year, month.month, 0))
  }

  daysInMonth(month, year) {
      return new Date(year, month, 0).getDate()
  }

  getNumsOfDateInMonth(inputDate) {
    var getTot = this.daysInMonth(inputDate.getMonth(), inputDate.getFullYear()) //Get total days in a month
    var numsOfDays = []   //Declaring array for inserting Saturdays

    for(var i=1; i<= getTot; i++) {    //looping through days in month
        var newDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), i)
        if(inputDate.getMonth() == newDate.getMonth() && (newDate.getDay()==0 || newDate.getDay()==6)) {   //if Sunday ro Saturday
          numsOfDays.push(this.getISODateString(newDate));
        }
    }

    this.setState({markedDatesOfMonth: numsOfDays})
  }

  getISODateString(date) {
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year+'-' + month + '-'+dt;
  }

  componentDidMount() {
    this.getNumsOfDateInMonth(new Date());
  }

  render() {
    let renderDates = {};
    var isExistToday = false;
    for (let i = 0; i < this.state.markedDatesOfMonth.length; i++) {
      let tmpDate = new Date(this.state.markedDatesOfMonth[i]);
      if (dateutils.sameDate(tmpDate, currentDate)) {
        renderDates[ this.state.markedDatesOfMonth[i] ] = {
          "customStyles": {
            "container": { backgroundColor: 'red' },
            "text": {color: 'white', fontWeight: 'bold'}
          }
        }
        isExistToday = true;
      } else {
        renderDates[ this.state.markedDatesOfMonth[i] ] = {
          "customStyles": {
            "container": { backgroundColor: 'white' },
            "text": {color: 'red', fontWeight: 'normal'}
          }
        }
      }
    }
    if (!isExistToday) {
      renderDates[ this.getISODateString(new Date()) ] = {
          "customStyles": {
            "container": { backgroundColor: 'blue' },
            "text": {color: 'white', fontWeight: 'bold'}
          }
      }
    }
    return (
      <Calendar
          style={styles.container}
          onMonthChange={(month) => this.changeMonth(month)}
          markingType={'custom'}
          markedDates={renderDates}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25
    
  },
});

export default App;
