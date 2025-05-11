let titel = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// عشان اتاكد ان الكلام اللي فوق ده صح استدعيهم تاني في ال console
console.log(titel,price,taxes,ads,discount,total,count,category,submit)

// function get total
function gettotal()
{
   if( price.value !=''){
    let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = 'rgb(248, 204, 151)';

   }
   else{
    total.innerHTML = '';
    total.style.background = 'rgba(160, 169, 173, 0.77)';
   }
}
// creat product
let datapro;
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product)
}

else {
    datapro = [ ];
}
// هوالمكان اللي بنخزن فيه المنتجات بتاعتنا
// لازم نكتب في area عشان المنتجات كلها تتسجل وميتحذفش لما ازود منتج




submit.onclick = function(){
    let newpro = {
        title:titel.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if( mood === 'create'){

   

    if(newpro.count > 1){
        for(let i = 0; i< newpro.count;i++){
datapro.push(newpro);
        }
    } else{
        datapro.push(newpro);
    }
}
else{
    datapro[   tmp ]= newpro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display ='block';
}
    localStorage.setItem('product',    JSON.stringify(datapro))


  clearData()
  showData()
}
// clear inputs
function clearData(){
    titel.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}
// read
function showData(){
    gettotal()
 let table = '';
 for( let i =0; i < datapro.length;i++){
    table += `
    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category} </td>
                            <td> <button onclick="updateData(${i})" id="update">update</button></td>
                            <td> <button onclick=" deleteData(${i})" id="delet">delet</button></td>
                       
                      </tr>
    
    `;
   
 }
 document.getElementById('tbody').innerHTML = table;
 let btnDelete = document.getElementById('deleteAll')
 if( datapro.length > 0){
btnDelete.innerHTML = `
  <button onclick="deletAll()">Delete All</button>
`
 } else{
    btnDelete.innerHTML = '';
 }

}
showData()



// delete
function deleteData(i) 
{
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData()


}

function deletAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}

// update
function updateData(i){
console.log(i)
titel.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
gettotal()
count.style.display = 'none';
category.value = datapro[i].category;
submit.innerHTML = 'Update';
mood = 'update';
tmp = i;
scroll({
    top:0,
    behavior:'smooth',
})
}

// search
let searchMood = 'title';

function searchingMood(id){
 
    let search = document.getElementById('search');
    if( id =='searchtitle'){
        searchMood = 'title';
        search.placeholder = 'search by title';
    }
    else{
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
search.focus()
}

function searchData(value){
    let table = '';
if( searchMood == 'title'){

for( let i = 0;  i  <  datapro.length; i++){
    if( datapro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category} </td>
                                <td> <button onclick="updateData(${i})" id="update">update</button></td>
                                <td> <button onclick=" deleteData(${i})" id="delet">delet</button></td>
                           
                          </tr>
        
        `;
    }
}

} 

else{
    for( let i = 0;  i  <  datapro.length; i++){
        if( datapro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                                <td>${i}</td>
                                <td>${datapro[i].title}</td>
                                <td>${datapro[i].price}</td>
                                <td>${datapro[i].taxes}</td>
                                <td>${datapro[i].ads}</td>
                                <td>${datapro[i].discount}</td>
                                <td>${datapro[i].total}</td>
                                <td>${datapro[i].category} </td>
                                    <td> <button onclick="updateData(${i})" id="update">update</button></td>
                                    <td> <button onclick=" deleteData(${i})" id="delet">delet</button></td>
                               
                              </tr>
            
            `;
        }
    }
}
document.getElementById('tbody').innerHTML = table;
}
showData();