const mongoose = require("mongoose");
const express = require("express");
const { manviData } = require("./src/model/model");
const database = require("./src/db/db");
const Data = database.database;
const aap = express();
aap.use(express.json());

aap.get("/", (req, res) => {
    res.send("i am in bsc 1st year")
});

aap.post("/add", async (req, res) => {
    try {
        const newdata = new manviData({
            firstName: req.body.firstName,
            middelName: req.body.middelName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNu: req.body.phoneNu,
            dateOfBarith: req.body.dateOfBarith
        });
        const result = await newdata.save();
        console.log("result=======================", result);
        if (!result) {
            throw "error data is not found"
        }
        res.status(200).json({
            msg: "seccuessfully data",
            result: result
        })
    } catch (error) {
        console.log("error message data connect");
        res.status(500).json({
            msg: "error data found",
            error: "error message"
        });
    }
});

aap.get("/getData", async (req, res) => {
    try {
        const response = await manviData.find();
        console.log("response=====================", response);
        if (!response) {
            throw "error data not found"
        }
        res.status(200).json({
            msg: "success",
            count: response.length,
            result: response
        })
    } catch (error) {
        console.log("error data connect ");
        res.status(500).json({
            msg: "error data found",
            error: "error message"
        });
    }
});
aap.put("/updateData/:id", async (req, res) => {
    const id = req.params.id; 
    try {
        const updatedData = {
            firstName: req.body.firstName,
            middelName: req.body.middelName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNu: req.body.phoneNu,
            dateOfBarith: req.body.dateOfBarith
        };

        const result = await manviData.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            throw "Data not found";
        }

        console.log("result===========================", result);
        res.status(200).json({
            msg: "Successfully updated",
            result: result
        });
    } catch (error) {
        console.log("Error updating data:", error);
        res.status(500).json({
            msg: "Error updating data",
            error: error.message 
        });
    }
});
aap.delete("/deleteData/:id", async (req, res) => {
    const id = req.params.id; 

    try {
        const deletedData = await manviData.findByIdAndRemove(id);

        if (!deletedData) {
            throw "Data not found";
        }

        console.log("Deleted data===========================", deletedData);
        res.status(200).json({
            msg: "Successfully deleted",
            result: deletedData
        });
    } catch (error) {
        console.log("Error deleting data:", error);
        res.status(500).json({
            msg: "Error deleting data",
            error: error.message || "Unknown error"
        });
    }
});
aap.get("/getById/:id", async (req, res) => {
    const id = req.params.id; 

    try {
        const data = await manviData.findById(id);

        if (!data) {
            throw "Data not found";
        }

        console.log("Retrieved data===========================", data);
        res.status(200).json({
            msg: "Successfully  data",
            result: data
        });
    } catch (error) {
        console.log("Error retrieving data:", error);
        res.status(500).json({
            msg: "Error retrieving data",
            error: error.message 
        });
    }
});
aap.delete("/deleteById/:id", async (req, res) => {
    const id = req.params.id; 

    try {
        const deletedData = await manviData.findByIdAndDelete(id);

        if (!deletedData) {
            throw "Data not found";
        }
        res.status(200).json({
            msg: "Successfully deleted",
            result: deletedData
        });
    } catch (error) {
        console.log("Error deleting data:");
        res.status(500).json({
            msg: "Error deleting data",
            error: error.message
        });
    }
});
aap.get("/getByEmail", async (req, res) => {
    try {
        
        const data = await manviData.findOne({ email:req.body.email,firstName:req.body.firstName,phoneNu:req.body.phoneNu })
        if (!data) {
            throw "Data not found";
        }
        res.status(200).json({
            msg: "Successfully data",
            result: data
        });
    } catch (error) {
        console.log("Error data:");
        res.status(500).json({
            msg: "Error retrieving data",
            error: error.message
        });
    }
});




aap.listen(9000, () => {
    console.log("saving data your port number 9000")
})