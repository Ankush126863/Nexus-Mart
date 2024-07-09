import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//create category
export const createCategoryController = async(req,res)=> {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is Required'})
        }
        const exisitingCategory = await categoryModel.findOne({name});
        if(exisitingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exist'
            })
        }
        const category = await categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
}

//Update Category
export const updateCategoryController= async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug: slugify(name)},{new:true}
        );
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Updating Category'
        })
    }
}

//get all category
export const categoryController = async(req,res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While getting all Categories'
        })
    }
}

//single Category
export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category',
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting Single Category'
        })
    }
}

//delete category controller
export const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully',
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Deleting the Category"
        })
    }
}