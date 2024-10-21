import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { recipeForm } from "@/utils/forms/recipeForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import JoditEditor from "jodit-react";

interface Props {
  getAllRecipes: Function;
  isEditing: Boolean;
  contactData: any;
  setIsEditing: Function;
}

type IRecipeForm = yup.InferType<typeof recipeForm>;

const defaultValues: IRecipeForm = {
  title: "",
  description: "",
  cuisine: "",
};

const CreateOrEditingRecipe: React.FC<Props> = ({
  getAllRecipes,
  isEditing,
  contactData,
  setIsEditing,
}) => {
  const router = useRouter();
  const values = isEditing ? contactData[0] : defaultValues;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allCuisines, setAllCuisines] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IRecipeForm>({
    resolver: yupResolver(recipeForm),
    mode: "onChange",
    reValidateMode: "onChange",
    // @ts-ignore
    defaultValues: defaultValues,
    values: values,
  });

  const title = watch("title");
  const description = watch("description");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const editorConfig = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: description || "Start typings...",
  };

  const createRecipe = (data: IRecipeForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/recipe/", data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getAllRecipes();
        onClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editRecipe = (data: IRecipeForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .put(`http://localhost:5000/api/recipe/${data._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getAllRecipes();
        onClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (data: IRecipeForm) => {
    isEditing ? editRecipe(data) : createRecipe(data);
  };

  const getAllCuisines = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/cuisine/", {
        headers: {
          "auth-token": accessToken,
        },
      });
      setAllCuisines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrEditRecipe = () => {
    onOpen();
    getAllCuisines();
  };

  useEffect(() => {
    if (isEditing) {
      createOrEditRecipe();
    }
  }, [isEditing]);

  const onModalCloseHandler = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      <Button textAlign={"center"} type="submit" onClick={createOrEditRecipe}>
        Create a recipe
      </Button>
      <Modal onClose={onModalCloseHandler} size={"6xl"} isOpen={isOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent
          p="8"
          mx="auto"
          mt="10%"
          backgroundColor={"white"}
          borderRadius={"20px"}
          width="50%"
        >
          <Box display={"flex"} justifyContent={"space-between"} w="100%">
            <Text
              width="300px"
              display={"block"}
              fontSize={"24px"}
              fontWeight={700}
            >
              {isEditing ? "Edit" : "Create"} a Recipe
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="14px"
                  p="6"
                  placeholder="Title"
                  {...register("title")}
                />
              </FormControl>

              <Box mt="4">
                <FormLabel>Recipe</FormLabel>
                <JoditEditor
                  ref={editor}
                  value={getValues("description")}
                  config={editorConfig}
                  onChange={(newContent) =>
                    setValue("description", newContent, {
                      shouldValidate: true,
                    })
                  }
                />
              </Box>
              <FormControl mt={4}>
                <FormLabel>Tags:</FormLabel>
                <Select
                  placeholder="Select Cuisine"
                  value={getValues(`cuisine`)}
                  onChange={(e) => {
                    setValue("cuisine", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {allCuisines &&
                    allCuisines.length > 0 &&
                    allCuisines.map((cuisine: any) => (
                      <option
                        value={cuisine._id}
                        selected={
                          cuisine._id === getValues("cuisine") ? true : false
                        }
                      >
                        {cuisine.name.charAt(0).toUpperCase() +
                          cuisine.name.slice(1)}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <Button
                mt="4"
                backgroundColor="black"
                color="white"
                px="12"
                py="6"
                borderRadius="14px"
                type="submit"
                isDisabled={!isValid}
                _disabled={{ backgroundColor: "grey" }}
                _hover={{
                  bg: "black.500",
                  _disabled: {
                    backgroundColor: "grey",
                    cursor: "not-allowed",
                  },
                }}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrEditingRecipe;
