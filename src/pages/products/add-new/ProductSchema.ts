import * as Yup from "yup";

// Define validation schemas for each section
export const GeneralSchema = Yup.object({
  productName: Yup.string()
    .min(1, "Name is required")
    .required("Name is required"),
  mrp: Yup.number()
    .positive("MRP must be greater than 0")
    .required("MRP is required"),
  sku: Yup.string().min(1, "SKU is required").required("SKU is required"),
  barcode: Yup.string().optional(),
  brand: Yup.string().optional(),
  keywords: Yup.string().optional(),
  minQty: Yup.number()
    .min(1, "Minimum Qty must be at least 1")
    .required("Minimum Qty is required"),
  weight: Yup.number()
    .min(1, "Minimum Weight must be at least 1g")
    .required("Product Weight is required"),
  height: Yup.string().optional(),
  length: Yup.string().optional(),
  width: Yup.string().optional(),

  taxSlab: Yup.array().optional(),
  status: Yup.boolean().default(false),
//   todaysDeal: Yup.boolean().default(false),
//   featured: Yup.boolean().default(false),
  description: Yup.string().optional(),
  isCess: Yup.boolean().default(false),
//   cess: Yup.array().when("isCess", (isCess, schema) => {
//     return isCess ? schema.required("Cess is required") : schema.optional();
//   }),
cess: Yup.array()
  .of(
    Yup.object().shape({
      _id: Yup.string().required("Cess ID is required"),
      name: Yup.string().required("Cess name is required"),
    })
  )
  .when("isCess", {
    is: true,
    then: (schema) => schema.min(1, "At least one Cess must be selected").required("Cess is required"),
    otherwise: (schema) => schema.optional(),
  }),

});
// Combined schema


export const FilesSchema = Yup.object({
  galleryImages: Yup.array().min(1, "Must add Gallery Image").required("Gallery Images are required"),
  thumbnails: Yup.array()
    .min(1, "Must add thumbnail")
    .required("Must add thumbnail"),
  productImages: Yup.array().min(1, "Must add Product Image").required("Product Images are required"),
  sizeImages: Yup.array().min(1, "Must add Size Images").required("Size Images are required"),
})


export const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return GeneralSchema;
    case 2:
      return FilesSchema;
    // Add cases for other schemas when implementing PriceStockSectionPage and ShippingSectionPage
   
  }
};