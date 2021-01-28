import CartProduct from './CartProduct';
import {settings, select, classNames, templates, } from '../settings';
import utils from '../utils';
class Cart{
  constructor(element){
    const thisCart = this;
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initActions();

  }
    
  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;

    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
      
    thisCart.dom.productList = document.querySelector(select.cart.productList);

    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];

    thisCart.dom.form = document.querySelector(select.cart.form);

    thisCart.dom.phone = document.querySelector(select.cart.phone);

    thisCart.dom.address = document.querySelector(select.cart.address);

    for(let key of thisCart.renderTotalsKeys){
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
  }
  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(event){
      event.preventDefault();
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event){
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });
  }
  add(menuProduct){
    const thisCart = this;

    console.log('adding product', menuProduct);

    const generatedHTML = templates.cartProduct(menuProduct);

    thisCart.element = utils.createDOMFromHTML(generatedHTML);

    thisCart.dom.productList.appendChild(thisCart.element);

    thisCart.products.push(new CartProduct(menuProduct, thisCart.element));
    console.log('thisCart.products', thisCart.products);
    thisCart.update();

  }
  update(){
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for(let product of thisCart.products){
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;


    for(let key of thisCart.renderTotalsKeys){
      for(let elem of thisCart.dom[key]){
        elem.innerHTML = thisCart[key];
      }
    }
  }
  remove(cartProduct){
    const thisCart = this;
    const index = thisCart.products.indexOf(cartProduct);
    thisCart.products[index].dom.wrapper.remove();
    thisCart.products.splice(index, 1);
    thisCart.update();
      
  }
  sendOrder(){
    const thisCart = this;
      
    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      phone: thisCart.dom.phone.value,
      address: thisCart.dom.address.value,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      totalPrice: thisCart.totalPrice,
      deliveryFee: thisCart.deliveryFee,
      products: thisCart.products.map(function(product){
        return {
          productId: product.id,
          productAmount: product.amount,
          productPrice: product.price,
          productPriceSingle: product.priceSingle,
          productParams: product.params,
        };
      })
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
}

export default Cart;