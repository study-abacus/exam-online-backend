'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teachers = [
      { name: 'Monica Katyal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dolon Dey', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Madhuri Bindra', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monika Singhal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Poonam Arora', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Poonam Gupta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rajni Gagwari', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rohit Bindra', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Savitri Bisht', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Suman Jain', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vimmi Arora', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Anchal Juneja', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deepa Arora', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deepika Gupta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Disha Rughwani', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harshita', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Karishma Singhal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kavita Bisht', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kiran Jain', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monika Verma', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Neeraj Sharma', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Neha Senan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Priyanshu Saini', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rachna', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ritika Aggarwal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sheeba', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sonia Sachdeva', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sunita Khurana', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Anu Gupta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jyoti Venugopalan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nisha Chopra', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rajni Panwar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sheetal Gujral', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apoorva Khandelwal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hina Mehtani', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pooja Goel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Preeti Sharma', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rachna Arora', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shweta Yadav', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sonika Gupta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sushma Kotnala', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Anjali Pal', createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('teachers', teachers);
  },

  down: async (queryInterface, Sequelize) => {}
};
