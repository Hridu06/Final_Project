// Your solution goes here
// API -> https://64b2e33138e74e386d55b072.mockapi.io/api/hanover

// Dynamically add food item 

const items = [
    {
      type: "burger",
      category: "Burger ",
      image:
      "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=612x612&w=0&k=20&c=lfsA0dHDMQdam2M1yvva0_RXfjAyp4gyLtx4YUJmXgg=",
      title: "Cheese Burger",
      description:
      "Cheeseburger with tomato and lettuce on wooden plank",
      CartButton: "Add To Cart",
      id: 1,
    },
  
    {
      type: "coffee",
      category: "Coffee",
      image:
      "https://www.acouplecooks.com/wp-content/uploads/2020/09/Latte-Art-066s.jpg",
      title: "Latte",
      description:
      "This latte comes out perfectly creamy and topped with frothy foam.",
      CartButton: "Add To Cart",
      id: 2,
    },
  
    {
      type: "burger",
      category: "Burger ",
      image:
      "https://t3.ftcdn.net/jpg/02/44/61/14/360_F_244611436_4WKrV3YAOBo0LKe9S7hoXv55aDmgwvwr.jpg",
      title:"Hamburger",
      description:
      "A perfect hamburger, perfectly proportioned and styled shot in a fast food.",
      CartButton: "Add To Cart",
      id: 3,
    },
    {
      type: "coffee",
      category: "Coffee ",
      image:
      "https://www.cookwithmanali.com/wp-content/uploads/2022/04/Cold-Coffee.jpg",
      title: "Cold Coffee",
      description:
      "This Cold Coffee is super refreshing on a hot summer day",
      CartButton: "Add To Cart",
      id: 4,
    },
    {
      type: "burger",
      category: "Burger ",
      image:
      "https://recipes.net/wp-content/uploads/2021/10/the-best-grilled-bbq-burger-recipe.jpg",
      title: "BBQ Burger",
      description:
      "This recipe for BBQ burger makes the juiciest and most flavorful burger patties.",
      CartButton: "Add To Cart",
      id: 5,
    }
  ];

  // function for showing food 
  
  function showFood(food) {
    return ` <div class="item col-md-6 col-lg-4 p-3" data-category="coffee">
    <div class="card">
      <div class="img-container">
        <img src="${food.image}" alt="Coffee" />
        <span class="category-pill">${food.category}</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${food.title}</h5>
        <p class="card-text">${food.description}</p>
    
    
        <button class="addToCartBtn btn w-100">${food.CartButton}</button>
      </div>
    </div>
    </div>
    `;
  }
  
  // All the required DOM elements

  var allitems = document.querySelector("#iits-items");
  var searchFrom = document.querySelector("#searchForm");
  var searchVal = document.querySelector("#iits-searchBox");
  var carttext = document.getElementById("iits-cart_counter");
  var minusbtn = document.getElementById("cart_dec");
  const allToggleBtn = document.getElementById("all_toggle");
  const coffeeToggleBtn = document.getElementById("coffee_toggle");
  const burgerToggleBtn = document.getElementById("burger_toggle");
  var adminBtn = document.getElementById("iits-adminBtn");
  var additemform = document.getElementById("iits-adminSection");
  var cancelBtn = document.getElementById("iits-cancelBtn");
  const addNewItemForm = document.getElementById("iits-addNewForm");
  const title = document.querySelector("#name");
  const image = document.querySelector("#pic");
  const description = document.querySelector("#desc");
  const type = document.querySelector("#typeItem");
  const developerName = document.getElementById('iits-developer');
  let searchValLocal = "";


  // Render all item for Dom and also use for Both search and filter 
  
  function renderitems(elements) {
    allitems.innerHTML = "";
    elements.map(function (food) {
      if (food.title.toLowerCase().includes(searchValLocal.toLowerCase())) {
        allitems.innerHTML += showFood(food);
      }
    });
    if (allitems.innerHTML == "")
      allitems.innerHTML = `<span class="bg-danger text-white py-2 rounded">Nothing Found</span>`;
    increment();
  }
  

  // Search functionality
  
  searchFrom.addEventListener("submit", function (e) {
    e.preventDefault();
    searchValLocal = searchVal.value;
    const updatedData = items.filter((item) =>
      item.title.toLowerCase().includes(searchValLocal)
    );
  
    renderitems(updatedData);
  });
  
  // initial rendering call
  renderitems(items);
  
  // Add click event listeners to the filter radio buttons
  allToggleBtn.addEventListener("click", handleCategoryToggle);
  coffeeToggleBtn.addEventListener("click", handleCategoryToggle);
  burgerToggleBtn.addEventListener("click", handleCategoryToggle);
  
  // Function to handle item filtering based on selected category

  function handleCategoryToggle(e) {
    const selectedCategory = e.target.value;
  
    console.log(selectedCategory);
  
    let filteredItems = [];
  
    if (selectedCategory === "all") {
      filteredItems = [...items];
    } else {
      filteredItems = items.filter(function (item) {
        return item.type === selectedCategory;
      });
    }
  
    renderitems(filteredItems);
  }
  
  //increment cart text after clicking "Add to cart" button 

  function increment() {
    let addToCart = document.querySelectorAll(".addToCartBtn");
    addToCart.forEach(function (btn) {
      btn.addEventListener("click", function () {
        carttext.textContent = parseInt(carttext.textContent) + 1;
      });
    });
  }

  // Decrement Cart Text when press Minius button
  
  minusbtn.addEventListener("click", function () {
    if (parseInt(carttext.textContent) > 0) {
      carttext.textContent = parseInt(carttext.textContent) - 1;
    }
  });
  


  // Initailly admin form will be hidden 
  hideForm();

  // Function for hiddig admin form

    function hideForm() {
    additemform.style.display = "none";
  }

// Add event to the admin button (username and password checking , if right then admin form will be shown )

  adminBtn.addEventListener("click", formhandling);
  
  function formhandling() {
    var enteredUsername = prompt("Please Enter Your Username : ");
    var enteredPassword = prompt("Please Enter Your Password : ");
  
    var correctUsername = "iits";
    var correctpassword = "23";
  
    if (
      enteredUsername == correctUsername &&
      enteredPassword == correctpassword
    ) {
      additemform.style.display = "block";
    } else {
      alert("You Entered wrong Information.Please Try again");
    }
  }
  cancelBtn.addEventListener("click", function () {
    additemform.style.display = "none";
  });
  
// Add event in the admin form submit button 
  addNewItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addNewItem();
  });

  // Function for add New Item
  function addNewItem ()
  {
    //checking whether the array is empty or not , if empty then last id will be 0 otherwise last id will be array's last id 
    let lastObj = items[items.length - 1];
    let lastId = 0;
    if (lastObj != undefined) {
      let lastId = lastObj.id;
    }
  // input value from the admin form will be store in this array 'newObj'
    let newObj = {
      type: type.value,
      category: type.value,
      image: image.value,
      title: title.value,
      description: description.value,
      id: lastId + 1,
      CartButton: "Add to Cart",
    };
  
    //Check Wheather every feilds is fill up or not , if not then it will be shown a alert 
  
    if (
      type.value === "" ||
      image.value === "" ||
      title.value === "" ||
      description.value === ""
    ) {
      alert(" Please Fill Up Every Feilds");
    }
  
    //If yes then item will be added and then clear the form and hide the form also

    else {
      items.push(newObj);
      renderitems(items);
      clearForm();
      hideForm();
      newObj = "";
    }
  }

//function for clear the admin form , used for after submiting

  function clearForm() {
    description.value = "";
    title.value = "";
    image.value = "";
    type.value = "";
  }

  // Adding Developer Name 

  developerName.textContent = 'Sabbir Hossain Hridoy';