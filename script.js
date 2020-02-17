
//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});



fetch("https://kea-alt-del.dk/t5/api/categories")

    .then ( res =>res.json())
    .then(createCategories)

function createCategories(data){
    console.log(data)
    data.forEach(function(oneCat){
        console.log(oneCat, "one cat")

        // create links

//        const a = document.createElement("a");
//        a.setAttribute("href", `#${oneCat}`);
//        a.textContent = oneCat;
//
//        document.querySelector("header>nav>ul.topnav>li>a").appendChild(a);


         const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        a.textContent = oneCat;
        li.appendChild(a);
        document.querySelector("#menu").appendChild(li);






        // create section
        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;


        const top = document.createElement("a");
        top.setAttribute("href", `#top`);

        top.appendChild(h2)
        section.appendChild(top);

        console.log(section)
        document.querySelector("main").appendChild(section);
    })
    getProducts();
}

function getProducts(){
fetch("https://kea-alt-del.dk/t5/api/productlist")

    .then(function(response){
      return response.json()
      })
    .then(function(data){
        console.log(data)
    data.forEach(S)
})

}

function S(e){
    console.log(e)
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

//    clone.querySelector("h3").textContent = e.category;
    clone.querySelector("h1 span ").textContent = e.name;
    clone.querySelector("p").textContent = e.shortdescription;
    clone.querySelector(".pris span").textContent = e.price;
    clone.querySelector(".alcho span").textContent = e.alcohol;
    clone.querySelector(".disc span").textContent = e.discount;

    const imageName = e.image; // this would be dynamic
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";
    clone.querySelector("img").src = smallImg;


//    if(e.vegetarian==true){
//        clone.querySelector(".vegetarian-image").style.display = "block";
//    }

       if(e.vegetarian === true){
        clone.querySelector(".vegetarian-image").classList.remove("hidden");
    }
    else{
        clone.querySelector(".vegetarian-image").classList.add("hidden");
    }



    if(e.soldout === true){
        clone.querySelector(".SoldOut-image").classList.remove("hidden");
    }else{

         clone.querySelector(".SoldOut-image").classList.add("hidden")
                                                               }

//    if(e.discount > 0){
//        clone.querySelector(".disc").style.display = "block";
//    }

    if(e.alcohol > 0 ){
        clone.querySelector(".alcho").style.display = "block";
    }

    if(e.discount){
        clone.querySelector(".disc span").textContent = e.price;
        const newPrice = Math.round(e.price - e.price * e.discount / 100);


        clone.querySelector(".disc span").textContent = newPrice;
        clone.querySelector(".disc").classList.remove("hidden");
        clone.querySelector(".pris span").textContent = e.price;
    } else{
//        clone.querySelector ("")
        clone.querySelector(".pris span").textContent = e.price;
        clone.querySelector(".pris").classList.remove("lineThrough");
    }

      clone.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${e.id}`)
      .then(res => res.json())
      .then(showDetails);
  });

        let parent =  document.querySelector(`#${e.category}`);
        parent.appendChild(clone);

    }






//
////our cloning function
//function showDish(dish) {
//  //...
//  copy.querySelector("button").addEventListener("click", () => {
//    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
//      .then(res => res.json())
//      .then(showDetails);
//  });
//}

//once we have our data, ....
function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;


     if(data.discount){
        modal.querySelector(".disc span").textContent = data.price;
        const newPrice = Math.round(data.price - data.price * data.discount / 100);


        modal.querySelector(".disc span").textContent = newPrice;
        modal.querySelector(".disc").classList.remove("hidden");
         modal.querySelector(".pris").classList.add("lineThrough");
         modal.querySelector(".pris span").textContent = data.price;

    } else{

           modal.querySelector(".pris span").textContent = data.price;
        modal.querySelector(".pris").classList.remove("lineThrough");
        modal.querySelector(".disc").classList.add("hidden");
    }

     modal.querySelector("p").textContent = data.shortdescription;

    if(data.vegetarian==true){
        modal.querySelector(".vegetarian-image").classList.remove("hidden");
    }else{
        modal.querySelector(".vegetarian-image").classList.add("hidden");
    }


    if(data.soldout === true){
        modal.querySelector(".SoldOut-image").classList.remove("hidden");
    }else{
        modal.querySelector(".SoldOut-image").classList.add("hidden");
    }



  //...
  modal.classList.remove("hide");
}
