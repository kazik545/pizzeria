import { select, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';


class Booking{
  constructor(container){
    const thisBooking = this;
    thisBooking.getElements(container);
    thisBooking.render();
    thisBooking.initWidgets();

  }
  getElements(container){
    const thisBooking = this;
    thisBooking.dom = {};
    thisBooking.dom.container = container;

  }
  render(){
        
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
        
    thisBooking.dom.container.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.container.querySelector(select.booking.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.container.querySelector(select.booking.hoursAmount);

    thisBooking.dom.datePicker = thisBooking.dom.container.querySelector(select.widgets.datePicker.wrapper);

    thisBooking.dom.hourPicker = thisBooking.dom.container.querySelector(select.widgets.hourPicker.wrapper);

  }
  initWidgets(){
    const thisBooking = this;

    

    thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    



        
  }
}





export default Booking;