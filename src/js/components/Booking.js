import { select, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';


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

  }
  initWidgets(){
    const thisBooking = this;

    console.log(thisBooking.People);

    thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);

    console.log(thisBooking);



        
  }
}





export default Booking;