'use strict'

class Exchanger{
   constructor(wrapper){
      this.wrapper = document.querySelector(wrapper)
      this.temp = null
      this.amount = null
      this.buttonCalc = document.querySelector('.calculate')
      this.buttonReverse = document.querySelector('.reverse') 
      this.reversed = false
  }  

   getData(){
    let d = new Date().getDate()
     let m = new Date().getMonth() + 1
    let y = new Date().getFullYear()
    if(d < 10 ){
        d = '0' + d
    } 

    if(m < 10 ){
       m = '0' + m
    } 
       let data = `${d} ${m} ${y}`
       return data
   }  

   getDataForAPI(){
    let d = new Date().getDate()
     let m = new Date().getMonth() + 1
    let y = new Date().getFullYear()
     
    if(d < 10 ){
        d = '0' + d
    } 

    if(m < 10 ){
       m = '0' + m
    } 
       let data = `${y}${m}${d}`
       return data
   } 


  
   renderData(){
  

     this.wrapper.querySelector('.data > h6').innerText = ` ${this.getData()}`


    }  

    findValute(){ 
        this.temp = document.querySelector('.valute2').value
        
    }  

    findAmount(){
        this.amount = document.querySelector('.amount').value
    }  
   

    reverse(e){ 
        e.preventDefault()

        if(this.reversed === false ){
            this.reversed = true 
            let valute1 = document.querySelector('.valute1')
            let valute2 = document.querySelector('.valute2')
             document.querySelector('.output_val').insertAdjacentElement("beforeend" , valute1)
             document.querySelector('.inner_val').insertAdjacentElement("beforeend" , valute2)
        }   
              
        else {
            this.reversed = false 
            let valute1 = document.querySelector('.valute2')
            let valute2 = document.querySelector('.valute1')
             document.querySelector('.output_val').insertAdjacentElement("beforeend" , valute1)
             document.querySelector('.inner_val').insertAdjacentElement("beforeend" , valute2)

        }  
       

    }
     

     
  calculate(e){
    e.preventDefault() 
    document.querySelector('footer').innerHTML = ''
    if(this.reversed === false) {
    this.findAmount()
    this.findValute()
    
   fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${this.temp}&date=&${this.getDataForAPI()}&json `).
   then(response => response.json()).
   then(response => {
        let rez = this.amount / response[0].rate
        document.querySelector('.output').value = parseInt(rez)

        document.querySelector('footer').insertAdjacentHTML('beforeend' , ` По курсу ${response[0].rate}
          ГРН за ${response[0].txt}`)
   
   
   });
   }   

   if(this.reversed === true) {
    this.findAmount()
    this.findValute()
    
   fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${this.temp}&date=&${this.getDataForAPI()}&json `).
   then(response => response.json()).
   then(response => {
         let rez =  this.amount * response[0].rate
        document.querySelector('.output').value = parseInt(rez)
        
        document.querySelector('footer').insertAdjacentHTML('beforeend' , ` По курсу ${response[0].rate} 
         ГРН за ${response[0].txt}`)
   
   });
   }  
   


  }  

   
   init(){
       
       this.renderData()
       this.buttonReverse.addEventListener('click' , this.reverse.bind(this))
       this.buttonCalc.addEventListener('click' , this.calculate.bind(this))
     
   }
   

}

new Exchanger('.wrapper').init()