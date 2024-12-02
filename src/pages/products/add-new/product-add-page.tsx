import { useModal } from "@/providers/context/context";
import ProductLayout, {
  ProductContent,
  ProductFooter,
  ProductHeader,
} from "./product-layout";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralSection from "./Page_Sections/GeneralSection-page";
import FilesMediaSectionPage from "./Page_Sections/FilesMeadiaSection-page";
import PriceStockSectionPage from "./Page_Sections/PriceStockSection-page";
import ShippingSectionPage from "./Page_Sections/ShippingSection-page";
import { Form, Formik } from "formik";
import { GeneralInitialValues } from "./initialValues";
import {  getValidationSchema } from "./ProductSchema";

import AddProductsNavbar from "@/components/products/Add_Products_TaskBar";

const pageToStep: any = {
  general: 1,
  "files-media": 2,
  "price-stock": 3,
  shipping: 4,
};

export default function ProductAddPage() {
  const { search, pathname } = useLocation(); // Access current URL
  const navigate = useNavigate(); // For navigation
  const { selectedPage, setSelectedPage } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  //   ====== formik =========================

  useEffect(() => {
    const currentPath = searchParams.get("q") || "general";
    setSelectedPage(currentPath);
    setCurrentStep(pageToStep[currentPath]);
  }, [searchParams, setSelectedPage]);

  //   ====== got to next step =================================
  const handleNextStep = () => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    if (currentStep === 4) {
      return;
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    const nextPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === nextStep
    );
    setSelectedPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`${pathname}?q=${nextPage}`);
  };

  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    const prevPage: any = Object.keys(pageToStep).find(
      (key) => pageToStep[key] === prevStep
    );
    setSelectedPage(prevPage);
    navigate(`${pathname}?q=${prevPage}`);
  };

  //   ==== switch pages =======
  const renderPageComponent = (
    setFieldValue: any,
    values: any,
    errors: any
  ) => {
    switch (selectedPage || "general") {
      case "general":
        return (
          <GeneralSection
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
          />
        );
      case "files-media":
        return (
          <FilesMediaSectionPage
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
          />
        );
      case "price-stock":
        return <PriceStockSectionPage 
        setFieldValue={setFieldValue}
        values={values}
        errors={errors}
        />;
      case "shipping":
        return <ShippingSectionPage />;
      default:
        return null;
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ProductLayout>
      <Formik
        initialValues={GeneralInitialValues}
        validationSchema={getValidationSchema(currentStep)}
        onSubmit={(values) => {
          console.log("submit", values);
          if (currentStep !== 4) {
            return handleNextStep();
          }
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <ProductHeader className="flex-col w-full items-start gap-5">
              <AddProductsNavbar />
              <div className="text-lg font-bold capitalize px-4">
                {currentStep === 1 && "Product Information"}
                {currentStep === 2 && "Product Files & Media"}
                {currentStep === 3 && "Product Price & Stock"}
                {currentStep === 4 && "Shipping Configuration"}
              </div>
            </ProductHeader>

            <ProductContent className="h-full px-4">
              {renderPageComponent(setFieldValue, values, errors)}
            </ProductContent>

            <ProductFooter>
              <Button
                className={cn("bg-gray-300 hover:bg-gray-400 text-black", {
                  "opacity-50 cursor-not-allowed": currentStep === 1,
                })}
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
              >
                Prev
              </Button>
              <Button
                type="submit"
                variant={"b2bStyle"}
                className={cn(" text-white w-40", {
                  " ": currentStep === 4,
                })}
              >
                {currentStep === 4 ? "save Product" : " Next"}
              </Button>
            </ProductFooter>
          </Form>
        )}
      </Formik>
    </ProductLayout>
  );
}
