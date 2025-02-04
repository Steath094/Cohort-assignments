/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const res = [];
  for (let i = 0; i < transactions.length; i++) {
    const category = transactions[i].category;
    const price = transactions[i].price;
    const ind = res.findIndex(obj=>obj.category==category);
    if (ind>=0) {
      res[ind].totalSpent+=price;
    }else{
      res.push({
        category,
        totalSpent: price
      })
    }
  }
  return res;
}

module.exports = calculateTotalSpentByCategory;
