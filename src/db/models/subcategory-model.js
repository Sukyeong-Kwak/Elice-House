import { model } from "mongoose";
import { subcategorySchema } from "../schemas/subcategory-schema.js";

const Subcategory = model("subcategories", subcategorySchema);

class SubcategoryModel {
  // async findById(id) {
  //   const subcategory = await Subcategory.findById(id);
  //   return subcategory;
  // }
  async create(subcategoryName) {
    const createSubcat = await Subcategory.create({ subcategoryName });
    return createSubcat;
  }

  async findById(_id) {
    const subcategory = await Subcategory.findById({ _id });
    return subcategory;
  }

  async findAll() {
    const allsubcat = await Subcategory.find({});

    return allsubcat;
  }
  async update(subcatId, toUpdate) {
    const updateInfo = await Subcategory.findOneAndUpdate(
      { _id: subcatId },
      toUpdate,
      {
        returnOriginal: false,
      }
    );
    return updateInfo;
  }
}
const subcategoryModel = new SubcategoryModel();

export { subcategoryModel };
