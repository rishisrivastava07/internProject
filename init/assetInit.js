const mongoose = require("mongoose");
const Asset = require("../models/assets.js");

main()
  .then(() => {
    console.log("Database connection done successfully");
    return clearAndInitData();
  })
  .then(() => {
    console.log("Data initialized successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => {
    mongoose.disconnect();
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/internProject");
}

async function clearAndInitData() {
  // Clear existing data
  await Asset.deleteMany({});
  console.log("Existing data cleared successfully");

  // Initialize new data
  let allAssets = [
    {
      name: "Laptop",
      type: "Electronic",
      location: "Office",
      purchaseDate: new Date("2022-01-15"),
      initialCost: 1200.0,
      operationalStatus: "In Use",
    },
    {
      name: "Forklift",
      type: "Machinery",
      location: "Warehouse",
      purchaseDate: new Date("2021-05-20"),
      initialCost: 25000.0,
      operationalStatus: "Out of Service",
    },
    {
      name: "Conference Table",
      type: "Furniture",
      location: "Meeting Room",
      purchaseDate: new Date("2023-02-10"),
      initialCost: 1500.0,
      operationalStatus: "In Use",
    },
    {
      name: "Company Vehicle",
      type: "Vehicle",
      location: "Parking Lot",
      purchaseDate: new Date("2020-08-05"),
      initialCost: 30000.0,
      operationalStatus: "In Repair",
    },
    {
      name: "Printer",
      type: "Electronic",
      location: "Office",
      purchaseDate: new Date("2022-03-22"),
      initialCost: 800.0,
      operationalStatus: "In Use",
    },
    {
      name: "Generator",
      type: "Equipment",
      location: "Utility Room",
      purchaseDate: new Date("2021-11-18"),
      initialCost: 5000.0,
      operationalStatus: "Operational",
    },
    {
      name: "Office Chair",
      type: "Furniture",
      location: "Office",
      purchaseDate: new Date("2023-05-05"),
      initialCost: 200.0,
      operationalStatus: "In Use",
    },
    {
      name: "Server Rack",
      type: "IT Equipment",
      location: "Server Room",
      purchaseDate: new Date("2020-12-10"),
      initialCost: 3000.0,
      operationalStatus: "Operational",
    },
    {
      name: "Security Camera",
      type: "Surveillance",
      location: "Entrance",
      purchaseDate: new Date("2022-07-08"),
      initialCost: 1200.0,
      operationalStatus: "In Use",
    },
    {
      name: "Desk",
      type: "Furniture",
      location: "Office",
      purchaseDate: new Date("2021-02-28"),
      initialCost: 400.0,
      operationalStatus: "In Use",
    },
    {
      name: "Delivery Van",
      type: "Vehicle",
      location: "Parking Lot",
      purchaseDate: new Date("2023-04-14"),
      initialCost: 25000.0,
      operationalStatus: "Operational",
    },
    {
      name: "Air Conditioner",
      type: "HVAC",
      location: "Server Room",
      purchaseDate: new Date("2020-09-15"),
      initialCost: 1500.0,
      operationalStatus: "In Use",
    },
    {
      name: "Projector",
      type: "Electronic",
      location: "Meeting Room",
      purchaseDate: new Date("2022-06-07"),
      initialCost: 1000.0,
      operationalStatus: "In Use",
    },
    {
      name: "Pallet Jack",
      type: "Equipment",
      location: "Warehouse",
      purchaseDate: new Date("2021-08-30"),
      initialCost: 800.0,
      operationalStatus: "Out of Service",
    },
    {
      name: "Fire Extinguisher",
      type: "Safety",
      location: "Various",
      purchaseDate: new Date("2023-01-12"),
      initialCost: 50.0,
      operationalStatus: "Operational",
    },
    {
      name: "Water Cooler",
      type: "Appliance",
      location: "Break Room",
      purchaseDate: new Date("2020-07-25"),
      initialCost: 150.0,
      operationalStatus: "In Use",
    },
    {
      name: "Drill Press",
      type: "Machinery",
      location: "Workshop",
      purchaseDate: new Date("2022-04-19"),
      initialCost: 3500.0,
      operationalStatus: "Out of Service",
    },
    {
      name: "Whiteboard",
      type: "Office Supplies",
      location: "Office",
      purchaseDate: new Date("2021-10-05"),
      initialCost: 80.0,
      operationalStatus: "In Use",
    },
    {
      name: "Microwave",
      type: "Appliance",
      location: "Break Room",
      purchaseDate: new Date("2023-03-08"),
      initialCost: 100.0,
      operationalStatus: "In Use",
    },
    {
      name: "Desktop Computer",
      type: "IT Equipment",
      location: "Office",
      purchaseDate: new Date("2020-11-29"),
      initialCost: 1500.0,
      operationalStatus: "Operational",
    },
  ];
  await Asset.insertMany(allAssets);
}
