/* global flatpickr */


import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';
import utils from '../utils.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    
    thisWidget.initPlugin();
  }
  
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);

    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

 
    
    flatpickr(thisWidget.dom.input,{
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      onReady: function (selectedDates, dateStr, instance) {
        thisWidget.dom.input.value = instance.formatDate(new Date(), 'Y-m-d');
      },
      disable: [
        function(date) {
          return (date.getDay() === 1);

        }
      ],
      locale: {
        firstDayOfWeek: 1 
      }

    });

  }
  
  parseValue(value){
    return value;
  }

  isValid(value){
    return isNaN(value);
  }

  renderValue(){

  }
}

export default DatePicker;