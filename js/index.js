/******************Declaration***********************/
var productName =document.getElementById("pname");
var productPrice =document.getElementById("pprice");
var productDescription =document.getElementById("pcategory");
var productCategory =document.getElementById("pdescription");
var alertName=document.getElementById("alertn");
var addBtn=document.getElementById("addBtn");
var currentindex=0;
var productSearch =document.getElementById("search");

/*******************************if data exist or not for LS*******************************************************/

if (localStorage.getItem("myData")==null)
{
    var productList =[] ;
}
else
{
   productList=JSON.parse(localStorage.getItem("myData")) ;

};
displayProduct ()

/*******************************ADD or  Update*******************************************************/

addBtn.addEventListener("click",function(){
    if(addBtn.innerHTML=="ADD")
    {
        addProduct();
    }
    else
    {
        saveUpdate();

    }
});

/***********************************ADD Product,,store,,display&&&clear data******************************/
function addProduct()
{

    if (validateProductName () == true)
    {
        var product =
        { 
            name:productName.value,
            price:productPrice.value,
            description:productDescription.value,
            category:productCategory.value,
        }
        
        productList.push(product);
        localStorage.setItem("myData",JSON.stringify (productList));
        displayProduct ();
        clr();
    }
    else
    {
    //    alert("please enter right data") 
    }

    

};





/***********************************display product******************************/
function displayProduct ()
{
    var container= "" ;
    for (var i=0; i<productList.length; i++)
    {
        container+=
        `<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].description}</td>
        <td>${productList[i].category}</td>
        <td><button type="button" class="btn btn-danger " onclick="updateProduct(${i});">update</button></td>
        <td><button type="button" class="btn  btn-warning" onclick="deleteProduct(${i});">delete</button></td>
        </tr>`

    }
    document.getElementById("table-display").innerHTML=container;
};





/***********************************clear  after Add product******************************/
function clr()
{
    productName.value ="";
    productPrice.value="";
    productDescription.value="";
    productCategory.value="";

};



/***********************************delete &display after delete&store**********************/
function deleteProduct(index)
{

    productList.splice(index,1);
    localStorage.setItem("myData",JSON.stringify (productList));
    displayProduct ();



};

/***********************************realtime search product******************************/
function searchProduct(term)
{

    var container= "" ;
        for (var i=0; i<productList.length; i++)
        {   
            if(productList[i].name.toLowerCase().includes(term.trim().toLowerCase()))

            {
                container+=
                `<tr>
                <td>${i}</td>
                <td>${productList[i].name.toLowerCase().replace(term,`<span style="background-color:red;"> ${term}</span>`)}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].description}</td>
                <td>${productList[i].category}</td>
                <td><button type="button" class="btn btn-danger" onclick="updateProduct(${i});">update</button></td>
                <td><button type="button" class="btn btn-warning" onclick="deleteProduct(${i});">delete</button></td>
                </tr>`
            }

        }
        document.getElementById("table-display").innerHTML=container;

};




/***********************************update product  then store after  updating in LS******************************/
function updateProduct(index)
{
    currentindex=index;
    productName.value=productList[index].name;
    productPrice.value=productList[index].price;
    productDescription.value=productList[index].description;
    productCategory.value=productList[index].category;
    addBtn.innerHTML="update"

   

}

/*********************************** save data fterupdate & turn  button back to add******************************/
function saveUpdate()
{
    var product =
    { 
        name:productName.value,
        price:productPrice.value,
        description:productDescription.value,
        category:productCategory.value,
    }
    productList[currentindex]=product;
    localStorage.setItem("myData",JSON.stringify (productList));
        displayProduct ();
        clr();
        addBtn.innerHTML="ADD"

}


/***********************************regular expression for name input******************************/
function  validateProductName(){

    var regex=/^[A-Z][a-zA-Z ]{3,15}$/
    var prname=productName.value;
    if(regex.test(prname)==true)
    {
        alertName.classList.add("d-none")
        productName.classList.add("is-valid")
        productName.classList.remove("is-invalid");
        addBtn.removeAttribute("disabled");
    
        return true;
    }
    else
    {
        alertName.classList.remove("d-none")
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid");
        addBtn.setAttribute("disabled","true")
    
        return false;
    }
    
    }
    
    productName.addEventListener("blur",validateProductName)







