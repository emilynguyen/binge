import { faker } from "@faker-js/faker";
import { readData } from "@/utils/firebaseUtils";

function getFruit() {
    let fruit;
    const regex = /^[a-zA-Z]+$/; // Regular expression to check for alphabetic characters only
  
    do {
      fruit = faker.food.fruit();
    } while (!regex.test(fruit));
    return fruit;
  }

function getMeat() {
  let fruit;
  const regex = /^[a-zA-Z]+$/; // Regular expression to check for alphabetic characters only

  do {
    fruit = faker.food.meat();
  } while (!regex.test(fruit));
  return fruit;
}

function getVegetable() {
  let fruit;
  const regex = /^[a-zA-Z]+$/; // Regular expression to check for alphabetic characters only

  do {
    fruit = faker.food.vegetable();
  } while (!regex.test(fruit));
  return fruit;
}

  /*
   * Generate a unique random party ID that is a food adj + food
   */
function generatePartyID() {
    // Generate adj
    let partyID = faker.food.adjective();

    // Randomly pick a food category
    const categories = ['fruit', 'meat', 'vegetables'];
    const randomInt = Math.floor(Math.random() * (categories.length) );
    const food = categories[randomInt]

    // Concat
    switch(food) {
        case 'fruit':
          partyID += "-" + getFruit();
          break;
        case 'meat':
            partyID += "-" + getMeat();
          break;
        case 'vegetables':
            partyID += "-" + getVegetable();
        break;
    }

    // Clean
    partyID.replace(/\s+/g, "-").toLowerCase();

    return partyID;
}

async function generateUniquePartyID() {
  try {
    const db = await readData("/");
    let uniqueID = false;
          
    while (!uniqueID) {
        // Generate unique party ID
        const partyID = generatePartyID();
  
        // Use partyID if it isn't already in use or if db is empty
        if (!db || !db[partyID]) {
          uniqueID = true;
          return partyID;
        }
    }
  } catch {
    console.log('Error generating unique partyID');
  }
}


export default generateUniquePartyID;